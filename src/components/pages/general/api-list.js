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
  API_URL_FOR_GET_PROVIDER_PROFILE: "providers",
  API_URL_FOR_UPDATE_PROVIDER_PROFILE: "providers",
  
  // Services endpoints
  API_URL_FOR_GET_ALL_SERVICES: "services",
  API_URL_FOR_GET_SERVICES_BY_CATEGORY: "services/category",
  API_URL_FOR_GET_SERVICE_BY_ID: "services",
  API_URL_FOR_CREATE_SERVICE: "services",
  API_URL_FOR_UPDATE_SERVICE: "services",
  API_URL_FOR_DELETE_SERVICE: "services",
  
  // Bookings endpoints
  API_URL_FOR_CREATE_BOOKING: "bookings",
  API_URL_FOR_GET_USER_BOOKINGS: "bookings/user",
  API_URL_FOR_GET_PROVIDER_BOOKINGS: "bookings/provider",
  API_URL_FOR_UPDATE_BOOKING_STATUS: "bookings",
}

export default ApiList