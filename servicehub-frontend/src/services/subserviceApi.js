// src/services/subserviceApi.js
import api from "./api";

// Fetch subservices for any service (uses backend route)
export const getSubServicesByService = (servicename) =>
  api.get(`/subservice/service/${encodeURIComponent(servicename)}`);

// Example: getPlumbingSubServices is now just a wrapper
export const getPlumbingSubServices = () =>
  getSubServicesByService('Plumbing Services');
// ...add more as needed