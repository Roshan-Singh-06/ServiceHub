import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Uses .env variable for backend API base
  withCredentials: true, // if using cookies/sessions
});

export default axiosInstance;