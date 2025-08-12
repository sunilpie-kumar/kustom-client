import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RouteList } from './components/pages/general/paths'
import Dashboard from './components/pages/Dashboard'
import ProviderDashboard from './components/pages/provider/ProviderDashboard'
import ProviderAuth from './components/pages/provider/ProviderAuth'
import B2B from './components/pages/business/B2B'
import Signup from './components/pages/Signup'
import Auth from './components/pages/Auth'
import Services from './components/pages/Services'
import ServiceDetails from './components/pages/ServiceDetails'
import { Toaster as ShadToaster } from './components/ui/toaster'
import { Toaster as SonnerToaster } from './components/ui/sonner'
import CombinedSection from './components/ui-sections/CombinedSection'
import { AuthProvider } from './components/pages/general/AuthContext'
import ProtectedRoute from './components/pages/general/ProtectedRoute'
import NotFound from './components/pages/NotFound'

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path={RouteList.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path={RouteList.PROVIDER_DASHBOARD} element={<ProtectedRoute><ProviderDashboard /></ProtectedRoute>} />
        <Route path={RouteList.B_TO_B} element={<ProtectedRoute allowedTypes={['provider']}><B2B /></ProtectedRoute>} />
        <Route path={RouteList.SIGNUP} element={<Signup />} />
        <Route path={RouteList.AUTH} element={<Auth />} />
        <Route path={RouteList.PROVIDER_AUTH} element={<ProviderAuth />} />
        <Route path={RouteList.SERVICES} element={<Services />} />
        <Route path={RouteList.SERVICE_DETAILS} element={<ServiceDetails />} />
        <Route path={RouteList.USER_PROFILE} element={<ProtectedRoute allowedTypes={['user']}><div /></ProtectedRoute>} />
        <Route path={RouteList.PROVIDER_PROFILE} element={<ProtectedRoute allowedTypes={['provider']}><div /></ProtectedRoute>} />
        <Route path={RouteList.BOOKINGS} element={<ProtectedRoute><div /></ProtectedRoute>} />
        <Route path={RouteList.USER_BOOKINGS} element={<ProtectedRoute allowedTypes={['user']}><div /></ProtectedRoute>} />
        <Route path={RouteList.PROVIDER_BOOKINGS} element={<ProtectedRoute allowedTypes={['provider']}><div /></ProtectedRoute>} />
        <Route path="/" element={<CombinedSection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
      <ShadToaster />
      <SonnerToaster />
    </Router>
  )
}

export default App