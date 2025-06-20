import express from 'express';
import { createService, getServices, getServiceById, updateService, deleteService } from '../controllers/serviceController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Create a new service (admin only, with image upload)
router.post('/', authenticate, authorizeAdmin, upload.single('image'), createService);

// Get all services
router.get('/', getServices);

// Get a single service by ID
router.get('/:id', getServiceById);

// Update a service (admin only)
router.put('/:id', authenticate, authorizeAdmin, updateService);

// Delete a service (admin only)
router.delete('/:id', authenticate, authorizeAdmin, deleteService);

export default router;
