/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ArrowLeft, Phone, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
// import apiService from "@/services/apiService"

const ProviderAuth = () => {
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [userExists, setUserExists] = useState(null)
  const [providerData, setProviderData] = useState(null)
  const [otp, setOtp] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  // Remove countryCode state
  const navigate = useNavigate()
  const { toast } = useToast()

  // Remove phone number sanitization since users will send with country code
  const sanitizePhone = input => {
    return input // Just return the input as-is
  }

  const checkProviderExists = async () => {
    if (!phone.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive"
      })
      return
    }
    const cleanPhone = sanitizePhone(phone)

    setIsLoading(true)
    try {
      // Check if provider exists by phone
      // const data = await apiService.providers.checkPhone(cleanPhone)
      const data = await null;
      console.log("data", data)
      if (data.success) {
        if (data.exists) {
          setUserExists(true)
          setProviderData(data.provider)
          setShowOTP(true)
          setOtpSent(false) // Reset OTP sent state
          // Don't automatically send OTP - let user click button
        } else {
          // Provider doesn't exist, but we can still send OTP for registration
          setUserExists(false)
          setProviderData({ phone: cleanPhone }) // Create a basic provider object
          setShowOTP(true)
          setOtpSent(false)
          // Don't automatically send OTP - let user click button
        }
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to verify phone number. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // DRY WhatsApp OTP send logic (accepts phone param for auto-send)
  const sendOTP = async phoneOverride => {
    const phoneToSend = phoneOverride || phone // Use the input phone instead of providerData.phone
    if (!phoneToSend) return

    // Debug: Log the phone number being sent
    console.log("Sending OTP to phone:", phoneToSend)
    console.log("Phone input value:", phone)
    console.log("Provider data phone:", providerData?.phone)

    setOtpLoading(true)
    try {
      const res = await null;
      // const res = await apiService.otp.send(phoneToSend)
      if (res.success) {
        toast({
          title: "OTP Sent",
          description: "Check WhatsApp for your code."
        })
        setOtpSent(true)
      } else {
        toast({
          title: "OTP Error",
          description: res.message,
          variant: "destructive"
        })
      }
    } catch (err) {
      console.error("OTP send error:", err)
      toast({
        title: "OTP Error",
        description: "Failed to send OTP",
        variant: "destructive"
      })
    } finally {
      setOtpLoading(false)
    }
  }

  // DRY WhatsApp OTP verify logic
  const verifyOTP = async () => {
    const phoneToVerify = providerData?.phone || phone
    if (!phoneToVerify || otp.length !== 6) return
    setOtpLoading(true)
    try {
      // const res = await apiService.otp.verify(phoneToVerify, otp)
      const res = null;
      if (res.success) {
        if (userExists) {
          // Existing provider - login
          toast({
            title: "Login Successful",
            description: "Welcome back! Redirecting to your dashboard..."
          })
          localStorage.setItem("provider", JSON.stringify(providerData))
          setTimeout(() => {
            navigate("/b2b", { state: { tab: "dashboard" } })
          }, 1000)
        } else {
          // New provider - redirect to registration
          toast({
            title: "OTP Verified",
            description: "Redirecting to registration..."
          })
          setTimeout(() => {
            navigate("/b2b", {
              state: { tab: "register", phone: phoneToVerify }
            })
          }, 1000)
        }
      } else {
        toast({
          title: "OTP Error",
          description: res.message || "Invalid OTP",
          variant: "destructive"
        })
      }
    } catch (err) {
      toast({
        title: "OTP Error",
        description: "Failed to verify OTP",
        variant: "destructive"
      })
    } finally {
      setOtpLoading(false)
    }
  }

  // const startSignUp = () => {
  //   // Redirect to B2B registration tab with phone pre-filled
  //   navigate('/b2b', { state: { tab: 'register', phone } });
  // };

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
              <Phone className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Provider Access
              </CardTitle>
              <CardDescription className="text-base mt-2 text-gray-600">
                Enter your phone number to continue
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
                  onClick={checkProviderExists}
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
            {/* {userExists === false && (
              <div className="space-y-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border-2 border-amber-200 dark:border-amber-800 shadow-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-amber-100 dark:bg-amber-900 rounded-full">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">
                      Account not found
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      No provider account exists with this phone number.
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={startSignUp}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Create New Provider Account
                </Button>
              </div>
            )} */}

            {(userExists === true || userExists === false) && providerData && (
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
                      {userExists ? "Account Found" : "New Provider"}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        userExists
                          ? "text-green-700 dark:text-green-300"
                          : "text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {userExists
                        ? `Welcome back, ${providerData.name}! Please verify with OTP.`
                        : "No existing account found. Please verify your phone number to continue."}
                    </p>
                  </div>
                </div>

                {!otpSent ? (
                  <Button
                    onClick={() => sendOTP(sanitizePhone(phone))}
                    disabled={otpLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {otpLoading ? "Sending..." : "Send OTP"}
                  </Button>
                ) : (
                  <div className="mt-4">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter OTP
                    </label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="h-12 text-center text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    />
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

export default ProviderAuth