import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

/** Só renderiza o painel para administradores verificados no banco. */
const ProtectedRoute = () => {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Verificando acesso…</div>;
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
};

export default ProtectedRoute;
