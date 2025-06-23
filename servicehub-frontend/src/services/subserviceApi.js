// src/services/subserviceApi.js
import api from "./api";
export const getPlumbingSubServices = () =>
  api.get("/subservice/service/Plumbing%20Services");