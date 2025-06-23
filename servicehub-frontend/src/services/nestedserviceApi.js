import api from "./api";

// Get all nested services (optionally with params)
export const getNestedServices = (params = {}) =>
  api.get("/nestedservice", { params });

// Get a single nested service by ID
export const getNestedServiceById = (id) =>
  api.get(`/nestedservice/${id}`);

// Create a new nested service (supports FormData for file upload)
export const createNestedService = (data) => {
  if (data instanceof FormData) {
    return api.post("/nestedservice", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.post("/nestedservice", data);
};

// Update a nested service (supports FormData for file upload)
export const updateNestedService = (id, data) => {
  if (data instanceof FormData) {
    return api.put(`/nestedservice/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.put(`/nestedservice/${id}`, data);
};

// Delete a nested service
export const deleteNestedService = (id) =>
  api.delete(`/nestedservice/${id}`);
