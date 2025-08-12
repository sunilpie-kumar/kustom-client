import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getFromServer } from '@/utils/axios'
import ApiList from '@/components/pages/general/api-list'

const AuthContext = createContext({ isAuthenticated: false, principal: null, loading: true, refreshAuth: () => {}, logout: () => {} })

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [principal, setPrincipal] = useState(null)
  const [loading, setLoading] = useState(true)

  const bootstrap = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsAuthenticated(false)
        setPrincipal(null)
        setLoading(false)
        return
      }
      try {
        // Try user me, fallback to provider me
        let me = await getFromServer(ApiList.API_URL_FOR_USER_ME)
        if (!me?.success) throw new Error('not user')
        setIsAuthenticated(true)
        setPrincipal({ type: 'user', ...(me.data?.principal || {}) })
      } catch (_) {
        try {
          const mep = await getFromServer(ApiList.API_URL_FOR_PROVIDER_ME)
          setIsAuthenticated(true)
          setPrincipal({ type: 'provider', ...(mep.data?.principal || {}) })
        } catch (e) {
          setIsAuthenticated(false)
          setPrincipal(null)
        }
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    bootstrap()
    const onAuthUpdated = () => {
      setLoading(true)
      bootstrap()
    }
    const onStorage = (e) => {
      if (e.key === 'token') onAuthUpdated()
    }
    window.addEventListener('auth:updated', onAuthUpdated)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('auth:updated', onAuthUpdated)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('provider')
    setIsAuthenticated(false)
    setPrincipal(null)
  }

  const refreshAuth = async () => {
    setLoading(true)
    await bootstrap()
  }

  const value = useMemo(() => ({ isAuthenticated, principal, loading, refreshAuth, logout }), [isAuthenticated, principal, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)