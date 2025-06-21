import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Auth APIs
export const login = (credentials) =>
  api.post("/auth/login", credentials, { withCredentials: true });
export const register = (userData) => api.post("/auth/register", userData, { withCredentials: true });
export const logout = () => api.post("/auth/logout", {}, { withCredentials: true });

// User APIs
export const getUsers = () => api.get("/users/all");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, userData) => api.patch(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Service APIs
export const createService = (formData) =>
  api.post("/service", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getServices = () => api.get("/service");
export const getServiceById = (id) => api.get(`/service/${id}`);

export const updateService = (id, formData) =>
  api.patch(`/service/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteService = (id) => api.delete(`/service/${id}`);
export const createSubService = (formData) =>
  api.post("/subservice", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
// Order APIs
export const getOrders = () => api.get("/orders");
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}/status`, { status });
export const updateOrderToDelivered = (id) => api.put(`/orders/${id}/deliver`);

// Message APIs
export const getMessages = () => api.get("/messages");
export const getMessageById = (id) => api.get(`/messages/${id}`);
export const createMessage = (messageData) => {
  const formData = new FormData();
  Object.keys(messageData).forEach((key) => {
    if (key === "attachments") {
      messageData[key].forEach((file) => {
        formData.append("attachments", file);
      });
    } else {
      formData.append(key, messageData[key]);
    }
  });
  return api.post("/messages", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateMessage = (id, messageData) =>
  api.put(`/messages/${id}`, messageData);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);
export const getUnreadCount = () => api.get("/messages/unread/count");

export const creatadmin = (adminData) => api.post("/users", adminData);
export const getsummary = (name, price, dimension, category) => api.post("/gemini/createsummary",{name, price, dimension, category})

export default api;
