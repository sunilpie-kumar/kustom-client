import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CombinedSection from './components/ui-sections/CombinedSection';
import B2B from './components/pages/business/B2B';
import Services from './components/pages/Services';
import Dashboard from './components/pages/Dashboard';
import ProviderAuth from './components/pages/provider/ProviderAuth';
import ProviderSignup from './components/pages/provider/ProviderSignUp';
import ProviderDashboard from './components/pages/provider/ProviderDashboard';
import NotFound from './components/pages/NotFound';
import { RouteList } from './components/pages/general/paths';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

{/* <Toaster />
<Sonner /> */}
const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CombinedSection />} />
        <Route path={RouteList.B_TO_B} element={<B2B />} />
        <Route path={RouteList.SERVICES} element={<Services />} />
        <Route path={RouteList.DASHBOARD} element={<Dashboard />} />
        <Route path={RouteList.PROVIDER_AUTH} element={<ProviderAuth />} />
        <Route path={RouteList.PROVIDER_SIGN_UP} element={<ProviderSignup />} />
        <Route path={RouteList.PROVIDER_DASHBOARD} element={<ProviderDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;