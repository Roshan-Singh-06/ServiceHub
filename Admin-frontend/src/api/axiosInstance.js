import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend API base
  withCredentials: true, // if using cookies/sessions
});

export default axiosInstance;
