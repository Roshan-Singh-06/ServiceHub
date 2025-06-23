import api from "./api";

// Generic CRUD helper for nested services
const NESTED_SERVICE_URL = "/nestedservice";

export const getNestedServices = (params = {}) =>
  api.get(NESTED_SERVICE_URL, { params });

export const getNestedServiceById = (id) =>
  api.get(`${NESTED_SERVICE_URL}/${id}`);

export const createNestedService = (data) => {
  if (data instanceof FormData) {
    return api.post(NESTED_SERVICE_URL, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.post(NESTED_SERVICE_URL, data);
};

export const updateNestedService = (id, data) => {
  if (data instanceof FormData) {
    return api.put(`${NESTED_SERVICE_URL}/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.put(`${NESTED_SERVICE_URL}/${id}`, data);
};

export const deleteNestedService = (id) =>
  api.delete(`${NESTED_SERVICE_URL}/${id}`);
