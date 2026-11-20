import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarCheck, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isValidCnpj, maskCnpj, maskPhone, onlyDigits } from "@/lib/validators";

const todayIso = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const schema = z.object({
  company_name: z.string().trim().min(2, "Informe o nome da empresa").max(200),
  cnpj: z.string().refine(isValidCnpj, "CNPJ inválido"),
  responsible_name: z.string().trim().min(2, "Informe o nome do responsável").max(200),
  phone: z.string().refine((v) => [10, 11].includes(onlyDigits(v).length), "Telefone inválido (com DDD)"),
  email: z.string().trim().email("E-mail inválido").max(200),
  request_type: z.enum(["domingo", "feriado"], { required_error: "Selecione o tipo de solicitação" }),
  desired_date: z.string().min(1, "Informe a data pretendida").refine((v) => v >= todayIso(), "A data não pode ser anterior a hoje"),
  notes: z.string().max(1000, "Máximo de 1000 caracteres").optional(),
}).superRefine((v, ctx) => {
  if (v.request_type === "domingo" && v.desired_date) {
    const day = new Date(`${v.desired_date}T12:00:00`).getDay();
    if (day !== 0) ctx.addIssue({ code: "custom", path: ["desired_date"], message: "A data escolhida não é um domingo" });
  }
});

type Values = z.infer<typeof schema>;

const SolicitacaoDomingosFeriados = () => {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { company_name: "", cnpj: "", responsible_name: "", phone: "", email: "", desired_date: "", notes: "" },
  });

  const onSubmit = async (v: Values) => {
    setSubmitError(null);
    if (!isSupabaseConfigured) {
      setSubmitError("O envio de solicitações ainda não está disponível. Tente novamente mais tarde.");
      return;
    }
    const { error } = await supabase.from("holiday_requests").insert({
      company_name: v.company_name.trim(),
      cnpj: onlyDigits(v.cnpj),
      responsible_name: v.responsible_name.trim(),
      phone: onlyDigits(v.phone),
      email: v.email.trim(),
      request_type: v.request_type,
      desired_date: v.desired_date,
      notes: v.notes?.trim() || null,
    });
    // Só confirma sucesso se o registro foi realmente gravado.
    if (error) {
      setSubmitError("Não foi possível registrar sua solicitação. Verifique os dados e tente novamente.");
      return;
    }
    setSent(true);
    form.reset();
  };

  return (
    <PageLayout title="Solicitação de Domingos e Feriados" subtitle="Empresas do comércio: solicite autorização para funcionamento em domingos e feriados.">
      <section className="bg-background py-10 md:py-14">
        <div className="container max-w-3xl">
          <div className="flex items-start gap-3 border border-border bg-card p-4 shadow-card md:p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h2 className="font-display text-lg font-bold text-card-foreground">Sobre a solicitação</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Preencha o formulário abaixo com os dados da empresa e a data em que pretende funcionar. Sua solicitação será registrada e encaminhada ao Sindilojas Garanhuns para análise.
              </p>
            </div>
          </div>

          {sent ? (
            <div role="status" className="mt-8 border border-success/40 bg-success/10 p-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
              <h2 className="mt-3 font-display text-lg font-bold text-foreground">Solicitação registrada</h2>
              <p className="mt-1 text-sm text-muted-foreground">Recebemos os dados da sua empresa. Em breve entraremos em contato.</p>
              <Button className="mt-5" variant="outline" onClick={() => setSent(false)}>Fazer nova solicitação</Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="mt-8 space-y-8 border border-border bg-card p-5 shadow-card md:p-7">
                {!isSupabaseConfigured && (
                  <p role="alert" className="flex gap-2 border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                    <TriangleAlert className="h-4 w-4 shrink-0" /> O envio de solicitações ainda não está disponível.
                  </p>
                )}

                <fieldset className="space-y-4">
                  <legend className="font-display text-sm font-bold uppercase tracking-wider text-primary">Identificação da empresa</legend>
                  <FormField control={form.control} name="company_name" render={({ field }) => (
                    <FormItem><FormLabel>Nome da empresa *</FormLabel><FormControl><Input autoComplete="organization" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cnpj" render={({ field }) => (
                    <FormItem><FormLabel>CNPJ *</FormLabel><FormControl><Input inputMode="numeric" placeholder="00.000.000/0000-00" {...field} onChange={(e) => field.onChange(maskCnpj(e.target.value))} /></FormControl><FormMessage /></FormItem>
                  )} />
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="font-display text-sm font-bold uppercase tracking-wider text-primary">Responsável</legend>
                  <FormField control={form.control} name="responsible_name" render={({ field }) => (
                    <FormItem><FormLabel>Nome do responsável *</FormLabel><FormControl><Input autoComplete="name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Telefone *</FormLabel><FormControl><Input type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" {...field} onChange={(e) => field.onChange(maskPhone(e.target.value))} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>E-mail *</FormLabel><FormControl><Input type="email" autoComplete="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="font-display text-sm font-bold uppercase tracking-wider text-primary">Solicitação</legend>
                  <FormField control={form.control} name="request_type" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de solicitação *</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6">
                          <label className="flex cursor-pointer items-center gap-2 text-sm"><RadioGroupItem value="domingo" />Domingo</label>
                          <label className="flex cursor-pointer items-center gap-2 text-sm"><RadioGroupItem value="feriado" />Feriado</label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="desired_date" render={({ field }) => (
                    <FormItem><FormLabel>Data pretendida para funcionamento *</FormLabel><FormControl><Input type="date" min={todayIso()} className="sm:max-w-xs" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem><FormLabel>Observações</FormLabel><FormControl><Textarea rows={4} maxLength={1000} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </fieldset>

                {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
                <Button type="submit" size="lg" disabled={form.formState.isSubmitting || !isSupabaseConfigured}>
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  {form.formState.isSubmitting ? "Enviando…" : "Enviar solicitação"}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default SolicitacaoDomingosFeriados;
