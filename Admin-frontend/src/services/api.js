import axios from "axios";

// Use the environment variable for the API base URL
const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ...existing code...
export const login = (credentials) =>
  api.post("/auth/login", credentials, { withCredentials: true });
export const register = (userData) => api.post("/auth/register", userData, { withCredentials: true });
export const logout = () => api.post("/auth/logout", {}, { withCredentials: true });

export const getUsers = () => api.get("/users/all");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, userData) => api.patch(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const createService = (formData) =>
  api.post("/service", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getServices = () => api.get("/service");
export const getServiceById = (id) => api.get(`/service/${id}`);

export const updateService = (id, formData) =>
  api.put(`/service/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteService = (id) => api.delete(`/service/${id}`);
export const createSubService = (formData) =>
  api.post("/subservice", formData);

export const creatadmin = (adminData) => api.post("/users", adminData);
export const getsummary = (name, price, dimension, category) =>
  api.post("/gemini/createsummary", { name, price, dimension, category });

export default api;