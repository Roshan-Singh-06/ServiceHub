import { SubService, subServiceCategory } from '../models/SubService.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

// Create a new subservice
export const createSubService = asyncHandler(async (req, res) => {
  const { service, category, image } = req.body;
  if (!service || !category || !image) {
    throw new ApiError(400, 'Service, category, and image are required');
  }
  // Validate category for service
  if (!subServiceCategory[service] || !subServiceCategory[service].includes(category)) {
    throw new ApiError(400, 'Invalid category for selected service');
  }
  const subService = new SubService({
    service,
    category,
    image,
  });
  await subService.save();
  res.status(201).json(new ApiResponse(201, subService, 'SubService created successfully'));
});

// Get all subservices for a service
export const getSubServicesByService = asyncHandler(async (req, res) => {
  const { service } = req.params;
  const subServices = await SubService.find({ service });
  res.json(new ApiResponse(200, subServices));
});

// Get all subservices (optionally filter by service or category)
export const getAllSubServices = asyncHandler(async (req, res) => {
  const { service, category } = req.query;
  const filter = {};
  if (service) filter.service = service;
  if (category) filter.category = category;
  const subServices = await SubService.find(filter);
  res.json(new ApiResponse(200, subServices));
});

// Update a subservice
export const updateSubService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { service, category, image } = req.body;
  const subService = await SubService.findByIdAndUpdate(
    id,
    { service, category, image },
    { new: true }
  );
  if (!subService) throw new ApiError(404, 'SubService not found');
  res.json(new ApiResponse(200, subService, 'SubService updated successfully'));
});

// Delete a subservice
export const deleteSubService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subService = await SubService.findByIdAndDelete(id);
  if (!subService) throw new ApiError(404, 'SubService not found');
  res.json(new ApiResponse(200, null, 'SubService deleted successfully'));
});
