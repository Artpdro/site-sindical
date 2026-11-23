import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Brand from "@/components/Brand";
import { useAuth } from "@/admin/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";

const AdminLogin = () => {
  const { signIn, session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Acesso restrito | Sindilojas Garanhuns";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { meta.remove(); };
  }, []);

  if (!loading && session && isAdmin) return <Navigate to="/admin" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err = await signIn(email.trim(), password);
    setBusy(false);
    if (err) setError(err);
    else navigate("/admin", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm border border-border bg-card p-6 shadow-card md:p-8">
        <div className="flex justify-center"><Brand /></div>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
          <Lock className="h-4 w-4" /> Área administrativa
        </div>
        {!isSupabaseConfigured && (
          <p role="alert" className="mt-4 border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
            Supabase não configurado. Defina as variáveis do arquivo .env (veja .env.example).
          </p>
        )}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy || !isSupabaseConfigured}>{busy ? "Entrando…" : "Entrar"}</Button>
        </form>
        <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-primary">← Voltar ao site</Link>
      </div>
    </div>
  );
};

export default AdminLogin;
