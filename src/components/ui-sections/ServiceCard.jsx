import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, MessageCircle, Phone } from "lucide-react"

const ServiceCard = ({ provider, onChatClick, onCallClick, onOpenDetails }) => {
  

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <img
          src={provider.image}
          alt={provider.businessName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => onOpenDetails?.(provider)}
        />
        {provider.verified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            ✓ Verified
          </div>
        )}
        <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {provider.category}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onOpenDetails?.(provider)}>
            {provider.businessName}
          </h3>
          <p className="text-sm text-gray-600">by {provider.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{provider.rating}</span>
          </div>
          <span className="text-sm text-gray-500">
            ({provider.reviewCount} reviews)
          </span>
        </div>

        <div className="flex items-center gap-1 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{provider.location}</span>
        </div>

        <p className="text-sm text-gray-700 line-clamp-2">
          {provider.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-blue-600">
            {provider.price}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => onCallClick(provider)}
            >
              <Phone className="w-4 h-4" />
              Call
            </Button>
            <Button
              size="sm"
              className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600"
              onClick={() => onChatClick(provider)}
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceCard