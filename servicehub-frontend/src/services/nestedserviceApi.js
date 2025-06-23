import api from './api';

// Fetch all nested services, optionally filtered by subservice
export const getNestedServices = (params = {}) => {
  // params: { subservice: 'Bath fittings' } or {}
  return api.get('/nestedservice', { params });
};

// Fetch a single nested service by ID
export const getNestedServiceById = (id) => {
  return api.get(`/nestedservice/${id}`);
};

// Add a new nested service
export const addNestedService = (data) => {
  return api.post('/nestedservice', data);
};

// Update a nested service by ID
export const updateNestedService = (id, data) => {
  return api.put(`/nestedservice/${id}`, data);
};

// Delete a nested service by ID
export const deleteNestedService = (id) => {
  return api.delete(`/nestedservice/${id}`);
};

// Fetch nested service name enums
export const fetchNestedServiceNameEnums = () => {
  return api.get('/nestedservice/names-enum');
};
