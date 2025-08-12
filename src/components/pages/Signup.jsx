import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ArrowLeft, User, Building2, Mail, Phone, UserPlus } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { postToServer } from "@/utils/axios"
import { RouteList } from "@/components/pages/general/paths"
import ApiList from "@/components/pages/general/api-list"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    address: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("b2c")

  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    if (location.state?.type) {
      setUserType(location.state.type)
    }
    if (location.state?.phone) {
      setFormData(prev => ({ ...prev, phone: location.state.phone }))
    }
  }, [location.state])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name",
        variant: "destructive"
      })
      return false
    }

    if (!formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      })
      return false
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your WhatsApp number",
        variant: "destructive"
      })
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return false
    }

    // Phone validation
    const phoneRegex = /^\+[1-9]\d{1,14}$/
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid WhatsApp number with country code",
        variant: "destructive"
      })
      return false
    }

    // Additional validation for B2B users
    if (userType === "b2b") {
      if (!formData.businessName.trim()) {
        toast({
          title: "Business Name Required",
          description: "Please enter your business name",
          variant: "destructive"
        })
        return false
      }

      if (!formData.businessType.trim()) {
        toast({
          title: "Business Type Required",
          description: "Please enter your business type",
          variant: "destructive"
        })
        return false
      }
    }

    return true
  }

  const handleSignup = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        ...(userType === "b2b" && {
          businessName: formData.businessName,
          businessType: formData.businessType,
          address: formData.address
        })
      }

      const response = userType === "b2b"
        ? await postToServer(ApiList.API_URL_FOR_PROVIDER_SIGNUP, payload)
        : await postToServer(ApiList.API_URL_FOR_USER_SIGNUP, payload)

      if (response.success) {
        toast({
          title: "Account Created",
          description: "Your account has been created successfully! Redirecting to dashboard..."
        })

        const userKey = userType === "b2b" ? "provider" : "user"
        localStorage.setItem(userKey, JSON.stringify(response.user || response.provider))

        setTimeout(() => {
          navigate(userType === "b2b" ? RouteList.PROVIDER_DASHBOARD : RouteList.DASHBOARD)
        }, 1500)
      } else {
        throw new Error(response.message || "Failed to create account")
      }
    } catch (error) {
      console.error("Signup error:", error)
      toast({
        title: "Signup Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getTitle = () => {
    return userType === "b2b" ? "Provider Registration" : "Customer Registration"
  }

  const getDescription = () => {
    return userType === "b2b"
      ? "Complete your provider profile to start offering services"
      : "Complete your profile to start browsing and booking services"
  }

  const getIcon = () => {
    return userType === "b2b" ? Building2 : User
  }

  const IconComponent = getIcon()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 dark:from-blue-950 dark:via-purple-950 dark:to-orange-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(RouteList.AUTH, { state: { type: userType } })}
          className="mb-6 text-gray-600 hover:text-gray-800 hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Auth
        </Button>

        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl relative overflow-hidden">
          {/* Card Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-20 blur-sm"></div>
          <div className="absolute inset-[1px] bg-white dark:bg-gray-900 rounded-lg"></div>

          <CardHeader className="text-center space-y-4 relative z-10">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {getTitle()}
              </CardTitle>
              <CardDescription className="text-base mt-2 text-gray-600">
                {getDescription()}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 relative z-10">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  WhatsApp Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+919620548555"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                  disabled={location.state?.verified}
                />
              </div>

              {/* B2B Specific Fields */}
              {userType === "b2b" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      type="text"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
                      Business Type *
                    </Label>
                    <Input
                      id="businessType"
                      name="businessType"
                      type="text"
                      placeholder="e.g. Home Decor, Automobile, Fashion"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Business Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Enter your business address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </div>
                )}
              </Button>
            </div>

            {/* Terms Notice */}
            <div className="text-center pt-4 border-t border-gradient-to-r from-blue-200 to-purple-200">
              <p className="text-xs text-gray-600">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Signup 