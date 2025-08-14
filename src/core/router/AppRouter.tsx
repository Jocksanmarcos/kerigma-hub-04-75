import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BaseLayout } from "@/core/layout/BaseLayout";
import PublicSiteLayout from "@/components/layout/PublicSiteLayout";
import { PageLoader } from "@/components/performance/PageLoader";

// Lazy load pages for better performance
const Index = React.lazy(() => import("@/pages/Index"));
const DashboardPage = React.lazy(() => import("@/pages/dashboard/DashboardPage"));
const PessoasPage = React.lazy(() => import("@/pages/dashboard/PessoasPage"));
const FinanceiroPage = React.lazy(() => import("@/pages/dashboard/FinanceiroPage"));
const AgendaPage = React.lazy(() => import("@/pages/dashboard/AgendaPage"));
const EventosPage = React.lazy(() => import("@/pages/dashboard/EventosPage"));
const PatrimonioPage = React.lazy(() => import("@/pages/dashboard/PatrimonioPage"));
const MinisteriosPage = React.lazy(() => import("@/pages/dashboard/MinisteriosPage"));
const EscalasPage = React.lazy(() => import("@/pages/dashboard/EscalasPage"));
const CultosStudioPage = React.lazy(() => import("@/pages/dashboard/CultosStudioPage"));
const LouvorAmbienteStudioPage = React.lazy(() => import("@/pages/dashboard/LouvorAmbienteStudioPage"));

const CentroEnsinoPage = React.lazy(() => import("@/pages/ensino/CentroEnsinoPage"));
const BibliaPage = React.lazy(() => import("@/pages/ensino/BibliaPage"));

const AnalyticsPage = React.lazy(() => import("@/pages/admin/AnalyticsPage"));
const CelulasPage = React.lazy(() => import("@/pages/admin/CelulasPage"));
const ConfiguracoesPage = React.lazy(() => import("@/pages/admin/ConfiguracoesPage"));
const GovernancePage = React.lazy(() => import("@/pages/admin/GovernancePage"));
const AconselhamentoPastoralPage = React.lazy(() => import("@/pages/admin/AconselhamentoPastoralPage"));
const IAPastoralPage = React.lazy(() => import("@/pages/admin/IAPastoralPage"));

const PublicHomePage = React.lazy(() => import("@/pages/public/StablePublicHomePage"));
const PublicSobrePage = React.lazy(() => import("@/pages/public/PublicSobrePage"));
const PublicEventoPage = React.lazy(() => import("@/pages/public/PublicEventoPage"));

const AuthPage = React.lazy(() => import("@/pages/auth/AuthPage"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

const MinimalLoader = () => <PageLoader type="minimal" />;

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<MinimalLoader />}>
      <Routes>
        {/* Main Public Homepage */}
        <Route path="/" element={<PublicHomePage />} />
        
        {/* Other Public Routes */}
        <Route path="/public" element={<PublicSiteLayout><div /></PublicSiteLayout>}>
          <Route index element={<PublicHomePage />} />
          <Route path="sobre" element={<PublicSobrePage />} />
          <Route path="evento/:id" element={<PublicEventoPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/admin" element={<Index />} />
        <Route path="/dashboard" element={<BaseLayout><DashboardPage /></BaseLayout>} />
        
        <Route path="/dashboard/pessoas" element={<BaseLayout><PessoasPage /></BaseLayout>} />
        <Route path="/dashboard/financeiro" element={<BaseLayout><FinanceiroPage /></BaseLayout>} />
        <Route path="/dashboard/agenda" element={<BaseLayout><AgendaPage /></BaseLayout>} />
        <Route path="/dashboard/eventos" element={<BaseLayout><EventosPage /></BaseLayout>} />
        <Route path="/dashboard/patrimonio" element={<BaseLayout><PatrimonioPage /></BaseLayout>} />
        <Route path="/dashboard/ministerios" element={<BaseLayout><MinisteriosPage /></BaseLayout>} />
        <Route path="/dashboard/escalas" element={<BaseLayout><EscalasPage /></BaseLayout>} />
        <Route path="/dashboard/cultos" element={<BaseLayout><CultosStudioPage /></BaseLayout>} />
        <Route path="/dashboard/louvor" element={<BaseLayout><LouvorAmbienteStudioPage /></BaseLayout>} />

        {/* Ensino Routes */}
        <Route path="/ensino" element={<BaseLayout><CentroEnsinoPage /></BaseLayout>} />
        <Route path="/ensino/biblia" element={<BaseLayout><BibliaPage /></BaseLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/analytics" element={<BaseLayout><AnalyticsPage /></BaseLayout>} />
        <Route path="/admin/celulas" element={<BaseLayout><CelulasPage /></BaseLayout>} />
        <Route path="/admin/configuracoes" element={<BaseLayout><ConfiguracoesPage /></BaseLayout>} />
        <Route path="/admin/governanca" element={<BaseLayout><GovernancePage /></BaseLayout>} />
        <Route path="/admin/aconselhamento" element={<BaseLayout><AconselhamentoPastoralPage /></BaseLayout>} />
        <Route path="/admin/ia-pastoral" element={<BaseLayout><IAPastoralPage /></BaseLayout>} />

        {/* Fallback Routes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};