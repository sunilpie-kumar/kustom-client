import axios from 'axios';
// import configFile from 'src/config.json';
import configFile from "../../config.json"

const base = configFile[`${configFile.MODE}_URL`].replace(/\/$/, '');
const apiURL = `${base}/api/`; // always ensure trailing slash

const axiosInstance = axios.create({
  baseURL: apiURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    if (!config.headers || !config.headers['Content-Type']) {
      config.headers = { ...(config.headers || {}), 'Content-Type': 'application/json' }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Intercept response to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response.data, // Return response data directly
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error?.response?.data || 'Something went wrong');
  }
);

export default axiosInstance;

export const postToServer = async (url, data, method = '') => {
  try {
    const response = await axiosInstance.post(url, data);
    if (method === 'VIEW') return response;
    return Array.isArray(response) ? response[0] : response;
  } catch (error) {
    console.error('postToServer Error:', error);
    throw error;
  }
};

// Add this GET method
export const getFromServer = async (url, params = {}, method = '') => {
  try {
    const response = await axiosInstance.get(url, { params });
    if (method === 'VIEW') return response;
    return Array.isArray(response) ? response[0] : response;
  } catch (error) {
    console.error('getFromServer Error:', error);
    throw error;
  }
};

export const swrHookPost = async ([url, data]) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('swrHookPost Error:', error);
    throw error;
  }
};

export const post_resetPassword = async (url, requestData) => {
  try {
    const response = await axiosInstance.post(url, requestData);
    return Array.isArray(response) ? response[0] : response;
  } catch (error) {
    console.error('post_resetPassword Error:', error);
    throw error;
  }
};

// Multipart helper to support file uploads
export const postMultipart = async (url, formData, method = '') => {
  try {
    const response = await axiosInstance.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (method === 'VIEW') return response;
    return Array.isArray(response) ? response[0] : response;
  } catch (error) {
    console.error('postMultipart Error:', error);
    throw error;
  }
};