import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/components/pages/general/AuthContext'
import { RouteList } from '@/components/pages/general/paths'

const ProtectedRoute = ({ children, allowedTypes }) => {
  const { isAuthenticated, loading, principal } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">Checking session…</div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={RouteList.AUTH} replace state={{ from: location.pathname }} />
  }

  if (Array.isArray(allowedTypes) && allowedTypes.length > 0) {
    const currentType = principal?.type
    if (!currentType || !allowedTypes.includes(currentType)) {
      // Not allowed -> send to home or auth
      return <Navigate to={RouteList.AUTH} replace state={{ from: location.pathname }} />
    }
  }
  return children
}

export default ProtectedRoute