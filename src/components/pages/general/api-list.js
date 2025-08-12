const ApiList = {
  // Existing endpoints
  API_URL_FOR_GET_PROVIDERS: "providers",
  
  // Authentication endpoints
  API_URL_FOR_CHECK_USER: "users/check",
  API_URL_FOR_CHECK_PROVIDER: "providers/check",
  API_URL_FOR_SEND_OTP: "otp/send",
  API_URL_FOR_VERIFY_OTP: "otp/verify",
  API_URL_FOR_USER_SIGNUP: "users/signup",
  API_URL_FOR_PROVIDER_SIGNUP: "providers/signup",
  API_URL_FOR_USER_LOGIN: "users/login",
  API_URL_FOR_PROVIDER_LOGIN: "providers/login",
  
  // User management endpoints
  API_URL_FOR_GET_USER_PROFILE: "users",
  API_URL_FOR_UPDATE_USER_PROFILE: "users",
  API_URL_FOR_USER_ME: "users/me",
  API_URL_FOR_GET_PROVIDER_PROFILE: "providers",
  API_URL_FOR_UPDATE_PROVIDER_PROFILE: "providers",
  API_URL_FOR_PROVIDER_ME: "providers/me",
  
  // Services endpoints
  API_URL_FOR_GET_ALL_SERVICES: "services",
  API_URL_FOR_GET_SERVICES_BY_CATEGORY: "services/category",
  API_URL_FOR_GET_SERVICE_BY_ID: "services",
  API_URL_FOR_CREATE_SERVICE: "services",
  API_URL_FOR_UPDATE_SERVICE: "services",
  API_URL_FOR_DELETE_SERVICE: "services",

  // Twilio endpoints
  API_URL_TWILIO_STATUS: "twilio/status",
  API_URL_TWILIO_SMS: "twilio/sms",
  API_URL_TWILIO_WHATSAPP: "twilio/whatsapp",
  API_URL_TWILIO_BULK_SMS: "twilio/bulk-sms",
  API_URL_TWILIO_VERIFY_SEND: "twilio/verify/send",
  API_URL_TWILIO_VERIFY_CHECK: "twilio/verify/check",

  // Chat endpoints
  API_URL_CHAT_CONVERSATIONS: "chat/conversations",
  API_URL_CHAT_ENSURE_CONVERSATION: "chat/conversations/ensure",
  API_URL_CHAT_MESSAGES: "chat/messages",
  API_URL_UPLOAD_CHAT: "upload/chat",
  
  // Bookings endpoints
  API_URL_FOR_CREATE_BOOKING: "bookings",
  API_URL_FOR_GET_USER_BOOKINGS: "bookings/user",
  API_URL_FOR_GET_PROVIDER_BOOKINGS: "bookings/provider",
  API_URL_FOR_UPDATE_BOOKING_STATUS: "bookings",
}

export default ApiList