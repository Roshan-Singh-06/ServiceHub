import { SubService, subServiceCategory } from '../models/SubService.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import cloudinary from '../utils/cloudinary.js';
// Create a new subservice with image upload
export const createSubService = asyncHandler(async (req, res) => {
  const { service, category, icon } = req.body;
  let imageUrl = req.body.image || '';
  // Debug logging for incoming data
  console.log('createSubService called with:', { service, category, icon, hasFile: !!req.file });
  if (!service || !category || !icon) {
    console.error('Missing required fields:', { service, category, icon });
    throw new ApiError(400, 'Service, category, and icon are required');
  }
  // Validate category for service
  if (!subServiceCategory[service] || !subServiceCategory[service].includes(category)) {
    console.error('Invalid category for service:', { service, category, subServiceCategory });
    throw new ApiError(400, 'Invalid category for selected service');
  }

  // If an image file is uploaded, upload to Cloudinary
  if (req.file) {
    const cloudinary = (await import('../utils/cloudinary.js')).default;
    await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'servicehub/subservices' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new ApiError(500, 'Cloudinary upload failed: ' + error.message));
          } else {
            imageUrl = result.secure_url;
            resolve();
          }
        }
      );
      stream.end(req.file.buffer);
    });
  }
  // Ensure imageUrl is always a string
  if (typeof imageUrl !== 'string') imageUrl = '';

  const subService = new SubService({
    service,
    category,
    icon,
    image: imageUrl,
  });
  await subService.save();
  res.status(201).json(new ApiResponse(201, subService, 'SubService created successfully'));
});

// Get all subservices for a service (case-insensitive)
export const getSubServicesByService = asyncHandler(async (req, res) => {
  let { service } = req.params;
  if (!service) return res.json(new ApiResponse(200, []));
  // Use case-insensitive regex for matching
  const subServices = await SubService.find({
    service: { $regex: new RegExp(`^${service}$`, 'i') }
  });
  res.json(new ApiResponse(200, subServices));
});

// Get all subservices (optionally filter by service or category, case-insensitive, with debug logs)
export const getAllSubServices = asyncHandler(async (req, res) => {
  const { service, category } = req.query;
  const filter = {};
  if (service) filter.service = { $regex: new RegExp(`^${service}$`, 'i') };
  if (category) filter.category = category;
  console.log('getAllSubServices filter:', filter); // Debug log
  const subServices = await SubService.find(filter);
  console.log('getAllSubServices found:', subServices.length, 'subservices'); // Debug log
  res.json(new ApiResponse(200, subServices));
});

// Update a subservice
export const updateSubService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { service, category, icon } = req.body;
  let imageUrl = req.body.image || '';

  // Only update provided fields
  const updateFields = {};
  if (service) updateFields.service = service;
  if (category) updateFields.category = category;
  if (icon) updateFields.icon = icon;

  // If a new image file is uploaded, upload to Cloudinary
  if (req.file) {
    const cloudinary = (await import('../utils/cloudinary.js')).default;
    await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'servicehub/subservices' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new ApiError(500, 'Cloudinary upload failed: ' + error.message));
          } else {
            imageUrl = result.secure_url;
            resolve();
          }
        }
      );
      stream.end(req.file.buffer);
    });
  }
  // Only update image if a new one is provided (either file or string URL)
  if (req.file || (typeof imageUrl === 'string' && imageUrl.trim() !== '')) {
    updateFields.image = imageUrl;
  }

  const subService = await SubService.findByIdAndUpdate(
    id,
    updateFields,
    { new: true, runValidators: true }
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
