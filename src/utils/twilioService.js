// Twilio service for client-side operations
// Note: In a real application, Twilio operations should be handled server-side
// This is for demonstration purposes and API calls to the server

import configFile from "../../config.json"

const API_BASE_URL = `${configFile[`${configFile.MODE}_URL`]}/api`;

/**
 * Send SMS via server API
 * @param {string} to - Phone number to send SMS to
 * @param {string} message - Message content
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const sendSMS = async (to, message, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/twilio/sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ to, message })
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

/**
 * Send verification code using Twilio Verify
 * @param {string} phoneNumber - Phone number to send verification to
 * @param {string} channel - Channel to send verification (sms, call, email)
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const sendVerificationCode = async (phoneNumber, channel = 'sms', token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/twilio/verify/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ phoneNumber, channel })
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
};

/**
 * Verify the code sent to phone number
 * @param {string} phoneNumber - Phone number to verify
 * @param {string} code - Verification code
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const verifyCode = async (phoneNumber, code, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/twilio/verify/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ phoneNumber, code })
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  }
};

/**
 * Send WhatsApp message
 * @param {string} to - WhatsApp number
 * @param {string} message - Message content
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const sendWhatsApp = async (to, message, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/twilio/whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ to, message })
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};

/**
 * Send bulk SMS
 * @param {Array<string>} recipients - Array of phone numbers
 * @param {string} message - Message content
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - API response
 */
export const sendBulkSMS = async (recipients, message, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/twilio/bulk-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ recipients, message })
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error('Error sending bulk SMS:', error);
    throw error;
  }
};

/**
 * Get Twilio configuration status
 * @returns {Promise<Object>} - API response
 */
export const getTwilioStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/twilio/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error('Error getting Twilio status:', error);
    throw error;
  }
};

/**
 * Send OTP via SMS/WhatsApp using the OTP endpoint
 * @param {string} phone - Phone number
 * @param {string} type - Type of OTP (email, phone, both)
 * @param {string} purpose - Purpose of OTP (verification, password_reset, login)
 * @param {string} channel - Channel (sms or whatsapp)
 * @returns {Promise<Object>} - API response
 */
export const sendOTP = async (phone, type = 'phone', purpose = 'verification', channel = 'whatsapp') => {
  try {
    const response = await fetch(`${API_BASE_URL}/otp/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, type, purpose, channel })
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

/**
 * Verify OTP
 * @param {string} phone - Phone number
 * @param {string} otp - OTP code
 * @param {string} type - Type of OTP (email, phone, both)
 * @param {string} purpose - Purpose of OTP (verification, password_reset, login)
 * @returns {Promise<Object>} - API response
 */
export const verifyOTP = async (phone, otp, type = 'phone', purpose = 'verification') => {
  try {
    const response = await fetch(`${API_BASE_URL}/otp/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, otp, type, purpose })
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
}; 