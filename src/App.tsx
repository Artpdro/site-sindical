import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/admin/AuthContext";
import ProtectedRoute from "@/admin/ProtectedRoute";
import Index from "./pages/Index.tsx";
import QuemSomos from "./pages/QuemSomos.tsx";
import Servicos from "./pages/Servicos.tsx";
import ConvencaoColetiva from "./pages/ConvencaoColetiva.tsx";
import SolicitacaoDomingosFeriados from "./pages/SolicitacaoDomingosFeriados.tsx";
import Feriados from "./pages/Feriados.tsx";
import Noticias from "./pages/Noticias.tsx";
import NoticiaDetalhe from "./pages/NoticiaDetalhe.tsx";
import Convenios from "./pages/Convenios.tsx";
import Diretoria from "./pages/Diretoria.tsx";
import Contato from "./pages/Contato.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminNewsForm from "./pages/AdminNewsForm.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } });

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/convencoes-coletivas" element={<ConvencaoColetiva />} />
            <Route path="/solicitacao-domingos-feriados" element={<SolicitacaoDomingosFeriados />} />
            <Route path="/feriados" element={<Feriados />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:slug" element={<NoticiaDetalhe />} />
            <Route path="/parceiros" element={<Convenios />} />
            <Route path="/diretoria" element={<Diretoria />} />
            <Route path="/contato" element={<Contato />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/noticias/nova" element={<AdminNewsForm />} />
              <Route path="/admin/noticias/:id" element={<AdminNewsForm />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
