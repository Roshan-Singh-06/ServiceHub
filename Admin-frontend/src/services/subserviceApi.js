import api from "./api";

export const getSubServiceCategories = (serviceName) =>
  api.get(`/subservice/categories/${encodeURIComponent(serviceName)}`);
