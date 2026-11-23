// Edge Function: registra a solicitação de domingos/feriados e envia por e-mail.
// Deploy: supabase functions deploy holiday-request --no-verify-jwt
// Secrets: supabase secrets set RESEND_API_KEY=... NOTIFY_EMAIL=arthurplima17@gmail.com [MAIL_FROM="Sindilojas <onboarding@resend.dev>"]
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function validCnpj(value: string) {
  const c = value.replace(/\D/g, "");
  if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
  const calc = (len: number) => {
    let sum = 0, pos = len - 7;
    for (let i = len; i >= 1; i--) { sum += Number(c[len - i]) * pos--; if (pos < 2) pos = 9; }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === Number(c[12]) && calc(13) === Number(c[13]);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json({ ok: false, error: "invalid_json" }, 400); }

  // Honeypot anti-spam: robôs preenchem este campo oculto.
  if (str(b.website, 50)) return json({ ok: true });

  const d = {
    company_name: str(b.company_name, 200),
    cnpj: str(b.cnpj, 30).replace(/\D/g, ""),
    responsible_name: str(b.responsible_name, 200),
    phone: str(b.phone, 30).replace(/\D/g, ""),
    email: str(b.email, 200),
    request_type: str(b.request_type, 10),
    desired_date: str(b.desired_date, 10),
    notes: str(b.notes, 1000),
  };
  const invalid =
    d.company_name.length < 2 || !validCnpj(d.cnpj) || d.responsible_name.length < 2 ||
    ![10, 11].includes(d.phone.length) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email) ||
    !["domingo", "feriado"].includes(d.request_type) || !/^\d{4}-\d{2}-\d{2}$/.test(d.desired_date);
  if (invalid) return json({ ok: false, error: "invalid_data" }, 400);

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { error: dbError } = await supabase.from("holiday_requests").insert({ ...d, notes: d.notes || null });
  if (dbError) { console.error("db", dbError.message); return json({ ok: false, error: "db_error" }, 500); }

  // Envio do e-mail (a solicitação já está salva mesmo que o e-mail falhe).
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("NOTIFY_EMAIL") ?? "arthurplima17@gmail.com";
  const from = Deno.env.get("MAIL_FROM") ?? "Sindilojas Garanhuns <onboarding@resend.dev>";
  let emailSent = false;
  if (apiKey) {
    const [y, m, day] = d.desired_date.split("-");
    const tipo = d.request_type === "domingo" ? "Domingo" : "Feriado";
    const row = (k: string, v: string) => `<tr><td style="padding:6px 12px;font-weight:bold">${k}</td><td style="padding:6px 12px">${esc(v)}</td></tr>`;
    const html = `<h2>Nova solicitação de ${tipo.toLowerCase()}</h2><table style="border-collapse:collapse">` +
      row("Empresa", d.company_name) + row("CNPJ", d.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")) +
      row("Responsável", d.responsible_name) + row("Telefone", d.phone) + row("E-mail", d.email) +
      row("Tipo", tipo) + row("Data pretendida", `${day}/${m}/${y}`) + row("Observações", d.notes || "—") + "</table>";
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: d.email, subject: `Solicitação de ${tipo.toLowerCase()} – ${d.company_name}`, html }),
      });
      emailSent = r.ok;
      if (!r.ok) console.error("resend", r.status, await r.text());
    } catch (e) { console.error("resend", e); }
  } else console.error("RESEND_API_KEY não configurada");

  return json({ ok: true, emailSent });
});
