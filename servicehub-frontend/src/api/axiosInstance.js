// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Uses .env variable for backend URL
  withCredentials: true, // Important if you use cookies/session auth
});

export default axiosInstance;
