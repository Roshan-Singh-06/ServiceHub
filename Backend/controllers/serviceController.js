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
    let videoUrl = req.body.video || '';

    // Handle multiple file uploads (image and video)
    if (req.files) {
      // Handle image upload
      if (req.files.image && req.files.image[0]) {
        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'servicehub/services' },
            (error, result) => {
              if (error) {
                console.error('Cloudinary image upload error:', error);
                reject(new ApiError(500, 'Image upload failed'));
              } else {
                imageUrl = result.secure_url;
                resolve();
              }
            }
          );
          stream.end(req.files.image[0].buffer);
        });
      }

      // Handle video upload
      if (req.files.video && req.files.video[0]) {
        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              resource_type: 'video', 
              folder: 'servicehub/services/videos',
              chunk_size: 6000000, // 6MB chunks for large video files
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary video upload error:', error);
                reject(new ApiError(500, 'Video upload failed'));
              } else {
                videoUrl = result.secure_url;
                resolve();
              }
            }
          );
          stream.end(req.files.video[0].buffer);
        });
      }
    }
    // Handle single file upload (backward compatibility)
    else if (req.file) {
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
      image: imageUrl,
      video: videoUrl,
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
  res.set('Cache-Control', 'no-store');
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
  // Support both form-data and JSON
  let serviceName, description, price;
  if (req.body && typeof req.body === 'object') {
    serviceName = req.body.serviceName?.trim() || req.body["serviceName"]?.trim() || "";
    description = req.body.description?.trim() || req.body["description"]?.trim() || "";
    // Ensure price is a number
    price = req.body.price !== undefined ? Number(req.body.price) : (req.body["price"] !== undefined ? Number(req.body["price"]) : "");
  }
  let imageUrl = req.body && typeof req.body === 'object' && 'image' in req.body ? req.body.image : undefined;
  let videoUrl = req.body && typeof req.body === 'object' && 'video' in req.body ? req.body.video : undefined;

  try {
    // Handle multiple file uploads (image and video)
    if (req.files) {
      // Handle image upload
      if (req.files.image && req.files.image[0]) {
        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'servicehub/services' },
            (error, result) => {
              if (error) {
                reject(new ApiError(500, 'Image upload failed'));
              } else {
                imageUrl = result.secure_url;
                resolve();
              }
            }
          );
          stream.end(req.files.image[0].buffer);
        });
      }

      // Handle video upload
      if (req.files.video && req.files.video[0]) {
        await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { 
              resource_type: 'video', 
              folder: 'servicehub/services/videos',
              chunk_size: 6000000, // 6MB chunks for large video files
            },
            (error, result) => {
              if (error) {
                reject(new ApiError(500, 'Video upload failed'));
              } else {
                videoUrl = result.secure_url;
                resolve();
              }
            }
          );
          stream.end(req.files.video[0].buffer);
        });
      }
    }
    // Handle single file upload (backward compatibility)
    else if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'servicehub/services' },
          (error, result) => {
            if (error) {
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

    // DEBUG: Log update fields and id
    console.log('Updating service:', req.params.id, {
      ...(serviceName && { serviceName }),
      ...(description && { description }),
      ...(price && { price }),
      ...(imageUrl && { image: imageUrl }),
      ...(videoUrl && { video: videoUrl })
    });

    // Always fetch the latest service after update
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        ...(serviceName && { serviceName }),
        ...(description && { description }),
        ...(price && { price }),
        ...(imageUrl && { image: imageUrl }),
        ...(videoUrl && { video: videoUrl })
      },
      { new: true, runValidators: true }
    );
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }
    // DEBUG: Log updated service
    console.log('Updated service result:', service);
    res.set('Cache-Control', 'no-store');
    res.json(new ApiResponse(200, service, 'Service updated successfully'));
  } catch (error) {
    console.error('Service update error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Delete a service
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');
  res.json(new ApiResponse(200, null, 'Service deleted successfully'));
});
