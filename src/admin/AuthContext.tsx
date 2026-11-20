import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AuthState {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

/** Verifica no banco (RLS) se o usuário autenticado consta na tabela admins. */
async function checkAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase.from("admins").select("user_id").eq("user_id", userId).maybeSingle();
  return !error && !!data;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    const apply = async (s: Session | null) => {
      const admin = s ? await checkAdmin(s.user.id) : false;
      if (!active) return;
      setSession(s);
      setIsAdmin(admin);
      setLoading(false);
    };
    supabase.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      // evita chamadas ao Supabase dentro do callback (deadlock); adia para o próximo tick
      setTimeout(() => apply(s), 0);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) return "Autenticação não configurada.";
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return "E-mail ou senha inválidos.";
    if (!(await checkAdmin(data.user.id))) {
      await supabase.auth.signOut();
      return "Este usuário não tem permissão de administrador.";
    }
    return null;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }, []);

  return <Ctx.Provider value={{ session, isAdmin, loading, signIn, signOut }}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth fora do AuthProvider");
  return c;
};
