import axios from 'axios';
// import configFile from 'src/config.json';
import configFile from "../../config.json"

const apiURL = configFile.MODE === "LOCALHOST"
  ? `${configFile[`${configFile.MODE}_URL`]}/api`
  : `${configFile[`${configFile.MODE}_URL`]}/api/`;

const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // If needed, add auth headers here
    // Example: config.headers.Authorization = `Bearer ${token}`;
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