import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RouteList } from './components/pages/general/paths'
import Dashboard from './components/pages/Dashboard'
import ProviderDashboard from './components/pages/provider/ProviderDashboard'
import B2B from './components/pages/business/B2B'
import Signup from './components/pages/Signup'
import Auth from './components/pages/Auth'
import Services from './components/pages/Services'
import ServiceDetails from './components/pages/ServiceDetails'
import { Toaster as ShadToaster } from './components/ui/toaster'
import { Toaster as SonnerToaster } from './components/ui/sonner'
import CombinedSection from './components/ui-sections/CombinedSection'
import NotFound from './components/pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={RouteList.DASHBOARD} element={<Dashboard />} />
        <Route path={RouteList.PROVIDER_DASHBOARD} element={<ProviderDashboard />} />
        <Route path={RouteList.B_TO_B} element={<B2B />} />
        <Route path={RouteList.SIGNUP} element={<Signup />} />
        <Route path={RouteList.AUTH} element={<Auth />} />
        <Route path={RouteList.SERVICES} element={<Services />} />
        <Route path={RouteList.SERVICE_DETAILS} element={<ServiceDetails />} />
        <Route path="/" element={<CombinedSection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ShadToaster />
      <SonnerToaster />
    </Router>
  )
}

export default App