import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, MapPin, Star, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import ChatModal from "../ui-sections/ChatModal"
import BookingModal from "../ui-sections/BookingModal"
import { RouteList } from "@/components/pages/general/paths"
import { getFromServer } from "@/utils/axios"
import ApiList from "@/components/pages/general/api-list"

function ServiceDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { toast } = useToast()

  const [service, setService] = useState(() => location.state?.provider || null)
  const [loading, setLoading] = useState(!location.state?.provider)
  const [error, setError] = useState(null)

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') setIsAuthenticated(true)
  }, [])

  useEffect(() => {
    let isMounted = true
    async function loadService() {
      if (service) return
      setLoading(true)
      setError(null)
      try {
        const response = await getFromServer(`${ApiList.API_URL_FOR_GET_SERVICE_BY_ID}/${id}`)
        if (!isMounted) return
        const normalized = response?.data || response
        setService(normalized)
      } catch (err) {
        if (!isMounted) return
        const message = err?.message || (typeof err === 'string' ? err : null) || 'Something went wrong'
        setError(message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadService()
    return () => { isMounted = false }
  }, [id, service])

  const requireAuth = (next) => {
    if (!isAuthenticated) {
      navigate(RouteList.AUTH)
      toast({ title: 'Sign in required', description: 'Please sign in to continue.' })
      return false
    }
    return true
  }

  const handleChatClick = () => {
    if (!requireAuth('chat')) return
    setShowChatModal(true)
  }

  const handleCallClick = () => {
    if (!requireAuth('call')) return
    setShowBookingModal(true)
  }

  const ratingText = useMemo(() => {
    if (!service) return ''
    const rating = service.rating ?? service.averageRating
    const count = service.reviewCount ?? service.reviewsCount ?? service.totalReviews
    if (rating == null) return ''
    return `${rating}${count ? ` (${count} reviews)` : ''}`
  }, [service])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Details</h1>
            <p className="text-gray-600">Explore provider information and connect instantly</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-6">
        {loading && (<div className="text-gray-600">Loading service...</div>)}
        {!loading && error && (<div className="text-red-600">{error}</div>)}
        {!loading && !error && service && (
          <Card className="overflow-hidden">
            <div className="relative">
              {service.image && (
                <img src={service.image} alt={service.businessName || service.name} className="w-full h-64 object-cover" />
              )}
              {service.verified && (
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">✓ Verified</div>
              )}
              {service.category && (
                <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">{service.category}</div>
              )}
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{service.businessName || service.title}</h2>
                  {service.name && (<p className="text-sm text-gray-600">by {service.name}</p>)}
                </div>
                {service.price && (<span className="text-2xl font-bold text-blue-600">{service.price}</span>)}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-gray-700">
                {ratingText && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{ratingText}</span>
                  </div>
                )}
                {service.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{service.location}</span>
                  </div>
                )}
              </div>

              {service.description && (<p className="text-gray-800 leading-relaxed">{service.description}</p>)}

              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleCallClick}>
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button size="sm" className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600" onClick={handleChatClick}>
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <ChatModal isOpen={showChatModal} onClose={() => setShowChatModal(false)} provider={service} />
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} provider={service} />
    </div>
  )
}

export default ServiceDetails