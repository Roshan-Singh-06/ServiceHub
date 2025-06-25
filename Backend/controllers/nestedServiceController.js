import { NestedService, nestedServiceNamesEnum } from '../models/NestedService.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import cloudinary from '../utils/cloudinary.js';

// Create a new nested service
export const createNestedService = asyncHandler(async (req, res) => {
  const { subservice, name, price, time, desc } = req.body;
  let imageUrl = req.body.image || '';

  // If an image file is uploaded, upload to Cloudinary
  if (req.file) {
    await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'servicehub/nestedservices' },
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
  if (typeof imageUrl !== 'string') {
    imageUrl = '';
  }

  if (!subservice || !name || !price || !time || !desc || !imageUrl) {
    throw new ApiError(400, 'All fields are required');
  }
  // Validate name against enum
  if (!nestedServiceNamesEnum[subservice] || !nestedServiceNamesEnum[subservice].includes(name)) {
    throw new ApiError(400, 'Invalid nested service name for selected subservice');
  }

  const nestedService = new NestedService({
    subservice,
    name,
    price,
    time,
    desc,
    image: imageUrl, // Always a string
  });
  await nestedService.save();
  res.status(201).json(new ApiResponse(201, nestedService, 'Nested service created successfully'));
});

// Get all nested services (optionally filter by subservice)
export const getNestedServices = asyncHandler(async (req, res) => {
  const { subservice } = req.query;
  let filter = {};
  if (subservice) filter.subservice = subservice;
  const nestedServices = await NestedService.find(filter);
  res.json(new ApiResponse(200, nestedServices));
});

// Get a single nested service by ID
export const getNestedServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const nestedService = await NestedService.findById(id);
  if (!nestedService) throw new ApiError(404, 'Nested service not found');
  res.json(new ApiResponse(200, nestedService));
});

// Update a nested service
export const updateNestedService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { subservice, name, price, time, desc } = req.body;
  let imageUrl = req.body.image || '';

  try {
    // If a new image file is uploaded, upload to Cloudinary
    if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'servicehub/nestedservices' },
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
  } catch (err) {
    console.error('Cloudinary upload failed:', err);
    return res.status(500).json({ message: 'Cloudinary upload failed', error: err.message });
  }

  // Optionally validate name against enum if subservice or name is updated
  if (subservice && name) {
    if (!nestedServiceNamesEnum[subservice] || !nestedServiceNamesEnum[subservice].includes(name)) {
      throw new ApiError(400, 'Invalid nested service name for selected subservice');
    }
  }

  const updateFields = { subservice, name, price, time, desc };
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== '') updateFields.image = imageUrl;

  const updated = await NestedService.findByIdAndUpdate(
    id,
    updateFields,
    { new: true, runValidators: true }
  );
  if (!updated) throw new ApiError(404, 'Nested service not found');
  res.json(new ApiResponse(200, updated, 'Nested service updated successfully'));
});

// Delete a nested service
export const deleteNestedService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await NestedService.findByIdAndDelete(id);
  if (!deleted) throw new ApiError(404, 'Nested service not found');
  res.json(new ApiResponse(200, null, 'Nested service deleted successfully'));
});