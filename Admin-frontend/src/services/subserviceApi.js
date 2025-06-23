import api from "./api";

export const getSubServiceCategories = (serviceName) =>
  api.get(`/subservice/categories/${encodeURIComponent(serviceName)}`);

// Add updateSubService for instant update in subservice list
export const updateSubService = (id, formData) =>
  api.put(`/subservice/${id}`, formData,);
