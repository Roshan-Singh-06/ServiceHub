import express from 'express';
import {
  createNestedService,
  getNestedServices,
  getNestedServiceById,
  updateNestedService,
  deleteNestedService
} from '../controllers/nestedServiceController.js';
import { nestedServiceNamesEnum } from '../models/NestedService.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Create a new nested service (with image upload and debug log)
router.post('/', upload.single('image'), createNestedService);
// Update a nested service (with image upload and debug log)
router.put('/:id', upload.single('image'), updateNestedService);

// Get all nested services (optionally filter by subservice)
router.get('/', getNestedServices);

// Get nested service name enums (must be before :id route)
router.get('/names-enum', (req, res) => {
  res.json({ data: nestedServiceNamesEnum });
});

// Get a single nested service by ID
router.get('/:id', getNestedServiceById);
// Delete a nested service
router.delete('/:id', deleteNestedService);

export default router;