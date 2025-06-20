import Service from '../models/service.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import cloudinary from '../utils/cloudinary.js';

// Create a new service
export const createService = asyncHandler(async (req, res) => {
  try {
    const { serviceName, description, price } = req.body;
    let imageUrl = req.body.image || '';

    // If an image file is uploaded, upload to Cloudinary
    if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'servicehub/services' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(new ApiError(500, 'Cloudinary upload failed'));
            } else {
              imageUrl = result.secure_url;
              resolve();
            }
          }
        );
        stream.end(req.file.buffer);
      });
    }

    if (!serviceName || !description || !price) {
      throw new ApiError(400, 'All required fields must be provided');
    }
    const service = new Service({
      serviceName,
      description,
      price,
      image: imageUrl, // This should be a URL or path if using file upload
    });
    await service.save();
    res.status(201).json(new ApiResponse(201, service, 'Service created successfully'));
  } catch (error) {
    console.error('Service creation error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Get all services
export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  res.json(new ApiResponse(200, services));
});

// Get a single service by ID
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');
  res.json(new ApiResponse(200, service));
});

// Update a service
export const updateService = asyncHandler(async (req, res) => {
  const { serviceName, description, price, image } = req.body;
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    { serviceName, description, price, image },
    { new: true }
  );
  if (!service) throw new ApiError(404, 'Service not found');
  res.json(new ApiResponse(200, service, 'Service updated successfully'));
});

// Delete a service
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');
  res.json(new ApiResponse(200, null, 'Service deleted successfully'));
});
