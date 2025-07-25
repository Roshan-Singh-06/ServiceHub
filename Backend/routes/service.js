import express from 'express';
import { createService, getServices, getServiceById, updateService, deleteService } from '../controllers/serviceController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Create a new service (admin only, with image and video upload)
router.post('/', authenticate, authorizeAdmin, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), createService);

// Get all services
router.get('/', getServices);

// Get a single service by ID
router.get('/:id', getServiceById);

// Update a service (admin only)
router.put('/:id', authenticate, authorizeAdmin, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), updateService);

// Delete a service (admin only)
router.delete('/:id', authenticate, authorizeAdmin, deleteService);

export default router;
