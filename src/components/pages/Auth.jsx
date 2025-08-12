import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ArrowLeft, Phone, CheckCircle2, User, Building2 } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { postToServer } from "@/utils/axios"
import { RouteList } from "@/components/pages/general/paths"
import ApiList from "@/components/pages/general/api-list"

const Auth = () => {
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [userExists, setUserExists] = useState(null)
  const [userData, setUserData] = useState(null)
  const [otp, setOtp] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [userType, setUserType] = useState("b2c")
  
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    if (location.state?.type) {
      setUserType(location.state.type)
    }
  }, [location.state])

  const sanitizePhone = (input) => {
    return input.replace(/[^\d+]/g, '')
  }

  const checkUserExists = async () => {
    const trimmed = phone.trim()
    if (!trimmed) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive"
      })
      return
    }
    if (!trimmed.startsWith('+')) {
      toast({ title: "Format", description: "Use E.164 format like +919620548555", variant: "destructive" })
      return
    }
    
    const cleanPhone = sanitizePhone(trimmed)
    setIsLoading(true)
    
    try {
      const checkUrl = userType === 'b2b' ? ApiList.API_URL_FOR_CHECK_PROVIDER : ApiList.API_URL_FOR_CHECK_USER
      const response = await postToServer(checkUrl, { phone: cleanPhone })
      
      if (response?.success) {
        const data = response.data || response
        if (data.exists) {
          toast({ title: "Welcome back!", description: "Logging you in..." })
          if (data.token) localStorage.setItem('token', data.token)
          if (userType === 'b2b') {
            if (data.provider) localStorage.setItem('provider', JSON.stringify(data.provider))
            setTimeout(() => { navigate(RouteList.PROVIDER_DASHBOARD) }, 600)
          } else {
            if (data.user) localStorage.setItem('user', JSON.stringify(data.user))
            setTimeout(() => { navigate(RouteList.DASHBOARD) }, 600)
          }
          return
        }
        // New account -> OTP path
        setUserExists(false)
        setUserData({ phone: cleanPhone })
        setShowOTP(true)
        setOtpSent(false)
        toast({ title: "New Account", description: "Please verify your phone number to register" })
      } else {
        throw response
      }
    } catch (error) {
      console.error("Check user error:", error)
      const serverMessage = error?.message || error?.error || (Array.isArray(error?.error) ? error.error.join(', ') : null) || (typeof error === 'string' ? error : null)
      toast({ title: "Error", description: serverMessage || "Unable to verify phone number. Please try again.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const sendOTP = async () => {
    const phoneToSend = userData?.phone || phone
    if (!phoneToSend) return

    setOtpLoading(true)
    try {
      const response = await postToServer(ApiList.API_URL_FOR_SEND_OTP, { 
        phone: phoneToSend, 
        type: "phone",
        purpose: userExists ? "login" : "verification",
        channel: "whatsapp"
      })
      
      if (response.success) {
        toast({ title: "OTP Sent", description: "Check your phone for the verification code." })
        setOtpSent(true)
      } else {
        toast({ title: "OTP Error", description: response.message || "Failed to send OTP", variant: "destructive" })
      }
    } catch (error) {
      console.error("OTP send error:", error)
      toast({ title: "OTP Error", description: (error?.message || 'Failed to send OTP. Please try again.'), variant: "destructive" })
    } finally {
      setOtpLoading(false)
    }
  }

  const verifyOTP = async () => {
    const phoneToVerify = userData?.phone || phone
    if (!phoneToVerify || otp.length !== 6) return
    
    setOtpLoading(true)
    try {
      const response = await postToServer(ApiList.API_URL_FOR_VERIFY_OTP, { 
        phone: phoneToVerify, 
        otp: otp, 
        type: "phone",
        purpose: userExists ? "login" : "verification"
      })
      
      if (response.success) {
        if (userExists) {
          toast({ title: "Login Successful", description: "Welcome back! Redirecting to your dashboard..." })
          localStorage.setItem("user", JSON.stringify({ phone: phoneToVerify, authenticated: true, timestamp: Date.now() }))
          setTimeout(() => { navigate(RouteList.DASHBOARD) }, 1000)
        } else {
          toast({ title: "Phone Verified", description: "Redirecting to complete your profile..." })
          setTimeout(() => {
            if (userType === 'b2b') {
              navigate(RouteList.B_TO_B, { state: { type: userType, phone: phoneToVerify, verified: true } })
            } else {
              navigate(RouteList.SIGNUP, { state: { type: userType, phone: phoneToVerify, verified: true } })
            }
          }, 1000)
        }
      } else {
        toast({ title: "OTP Error", description: response.message || "Invalid OTP", variant: "destructive" })
      }
    } catch (error) {
      console.error("OTP verify error:", error)
      toast({ title: "OTP Error", description: (error?.message || 'Failed to verify OTP. Please try again.'), variant: "destructive" })
    } finally {
      setOtpLoading(false)
    }
  }

  const getTitle = () => {
    return userType === "b2b" ? "Provider Access" : "Customer Access"
  }

  const getDescription = () => {
    return userType === "b2b" 
      ? "Enter your phone number to access your provider dashboard"
      : "Enter your phone number to browse and book services"
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
          onClick={() => navigate("/")}
          className="mb-6 text-gray-600 hover:text-gray-800 hover:bg-white/50 backdrop-blur-sm transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
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
            {/* Phone Input Section - only show if userExists is null */}
            {userExists === null && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +919620548555"
                    value={phone}
                    onChange={e => setPhone(sanitizePhone(e.target.value))}
                    className="h-12 text-center text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                  />
                </div>
                <Button
                  onClick={checkUserExists}
                  disabled={isLoading}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Verifying...
                    </div>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            )}

            {/* User Status Messages */}
            {(userExists === true || userExists === false) && userData && (
              <div
                className={`space-y-4 p-4 rounded-lg border-2 shadow-lg ${
                  userExists
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800"
                    : "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-1 rounded-full ${
                      userExists
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-blue-100 dark:bg-blue-900"
                    }`}
                  >
                    {userExists ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Phone className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        userExists
                          ? "text-green-800 dark:text-green-200"
                          : "text-blue-800 dark:text-blue-200"
                      }`}
                    >
                      {userExists ? "Account Found" : "New Account"}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        userExists
                          ? "text-green-700 dark:text-green-300"
                          : "text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {userExists
                        ? `Welcome back! Please verify with OTP to login.`
                        : "No existing account found. Please verify your phone number to register."}
                    </p>
                  </div>
                </div>

                {!otpSent ? (
                  <Button
                    onClick={sendOTP}
                    disabled={otpLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {otpLoading ? "Sending..." : "Send OTP"}
                  </Button>
                ) : (
                  <div className="mt-4">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                      Enter OTP
                    </label>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <Button
                      onClick={verifyOTP}
                      disabled={otpLoading || otp.length !== 6}
                      className="mt-2 w-full"
                    >
                      {otpLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Security Notice */}
            <div className="text-center pt-4 border-t border-gradient-to-r from-blue-200 to-purple-200">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <p className="text-xs">
                  We'll send a verification code to confirm your identity
                </p>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Auth 