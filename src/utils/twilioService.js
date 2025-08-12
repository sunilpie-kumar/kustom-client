// Twilio service for client-side operations
// Note: In a real application, Twilio operations should be handled server-side
// This is for demonstration purposes and API calls to the server

import { postToServer, getFromServer } from "@/utils/axios"
import ApiList from "@/components/pages/general/api-list"

/**
 * Send SMS via server API
 * @param {string} to - Phone number to send SMS to
 * @param {string} message - Message content
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const sendSMS = async (to, message) => {
  return await postToServer(ApiList.API_URL_TWILIO_SMS, { to, message })
}

/**
 * Send verification code using Twilio Verify
 * @param {string} phoneNumber - Phone number to send verification to
 * @param {string} channel - Channel to send verification (sms, call, email)
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const sendVerificationCode = async (phoneNumber, channel = 'sms') => {
  return await postToServer(ApiList.API_URL_TWILIO_VERIFY_SEND, { phoneNumber, channel })
}

/**
 * Verify the code sent to phone number
 * @param {string} phoneNumber - Phone number to verify
 * @param {string} code - Verification code
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const verifyCode = async (phoneNumber, code) => {
  return await postToServer(ApiList.API_URL_TWILIO_VERIFY_CHECK, { phoneNumber, code })
}

/**
 * Send WhatsApp message
 * @param {string} to - WhatsApp number
 * @param {string} message - Message content
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const sendWhatsApp = async (to, message) => {
  return await postToServer(ApiList.API_URL_TWILIO_WHATSAPP, { to, message })
}

/**
 * Send bulk SMS
 * @param {Array<string>} recipients - Array of phone numbers
 * @param {string} message - Message content
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const sendBulkSMS = async (recipients, message) => {
  return await postToServer(ApiList.API_URL_TWILIO_BULK_SMS, { recipients, message })
}

/**
 * Get Twilio configuration status
 * @returns {Promise<Object>} - API response
 */
export const getTwilioStatus = async () => {
  return await getFromServer(ApiList.API_URL_TWILIO_STATUS)
}

/**
 * Send OTP via SMS/WhatsApp using the OTP endpoint
 * @param {string} phone - Phone number
 * @param {string} type - Type of OTP (email, phone, both)
 * @param {string} purpose - Purpose of OTP (verification, password_reset, login)
 * @param {string} channel - Channel (sms or whatsapp)
 * @returns {Promise<Object>} - API response
 */
export const sendOTP = async (phone, type = 'phone', purpose = 'verification', channel = 'whatsapp') => {
  return await postToServer(ApiList.API_URL_FOR_SEND_OTP, { phone, type, purpose, channel })
}

/**
 * Verify OTP
 * @param {string} phone - Phone number
 * @param {string} otp - OTP code
 * @param {string} type - Type of OTP (email, phone, both)
 * @param {string} purpose - Purpose of OTP (verification, password_reset, login)
 * @returns {Promise<Object>} - API response
 */
export const verifyOTP = async (phone, otp, type = 'phone', purpose = 'verification') => {
  return await postToServer(ApiList.API_URL_FOR_VERIFY_OTP, { phone, otp, type, purpose })
}