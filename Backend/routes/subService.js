import express from 'express';
import {
  createSubService,
  getSubServicesByService,
  getAllSubServices,
  updateSubService,
  deleteSubService
} from '../controllers/subServiceController.js';

const router = express.Router();

// Create a new subservice
router.post('/', createSubService);

// Get all subservices (optionally filter by service or category)
router.get('/', getAllSubServices);

// Get all subservices for a specific service
router.get('/service/:service', getSubServicesByService);

// Get all subservice categories for a specific service (inline, not separate route file)
router.get('/categories/:service', (req, res) => {
  const { service } = req.params;
  // Import subServiceCategory here to avoid circular dependency
  const { subServiceCategory } = require('../models/SubService.js');
  const categories = subServiceCategory[service] || [];
  res.json({ categories });
});

// Update a subservice
router.patch('/:id', updateSubService);

// Delete a subservice
router.delete('/:id', deleteSubService);

// Test route to verify router is active
router.get('/test', (req, res) => {
  res.json({ message: 'SubService router is working!' });
});

export default router;
