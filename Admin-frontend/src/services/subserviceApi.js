import api from "./api";

export const getSubServiceCategories = (serviceName) =>
  api.get(`/subservice/categories/${encodeURIComponent(serviceName)}`);

// Add updateSubService for instant update in subservice list
export const updateSubService = (id, formData, isMultipart = false) =>
  api.put(
    `/subservice/${id}`,
    formData,
    isMultipart
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined
  );

export const createSubService = (formData, isMultipart = false) =>
  api.post(
    `/subservice`,
    formData,
    isMultipart
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined
  );
