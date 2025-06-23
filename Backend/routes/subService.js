import express from 'express';
import {
  createSubService,
  getSubServicesByService,
  getAllSubServices,
  updateSubService,
  deleteSubService
} from '../controllers/subServiceController.js';
import { subServiceCategory } from '../models/SubService.js';

const router = express.Router();

// Create a new subservice (icon is a string, no file upload)
router.post('/', createSubService);

// Get all subservices (optionally filter by service or category)
router.get('/', getAllSubServices);

// Get all subservices for a specific service
router.get('/service/:service', getSubServicesByService);

// Get all subservice categories for a specific service (inline, not separate route file)
router.get('/categories/:service', (req, res) => {
  let { service } = req.params;
  // Try to decode URI component in case it's encoded
  try { service = decodeURIComponent(service); } catch {}
  // Log the import for debugging
  console.log('subServiceCategory:', subServiceCategory);
  // Log the received service param and all available keys for debugging
  console.log('Requested service:', service);
  console.log('Available services:', Object.keys(subServiceCategory));
  if (!subServiceCategory[service]) {
    return res.status(404).json({ categories: [], message: `No categories found for service: ${service}` });
  }
  const categories = subServiceCategory[service];
  res.json({ categories });
});

// Get a single subservice by ID
router.get('/:id', async (req, res) => {
  try {
    const subservice = await (await import('../models/SubService.js')).SubService.findById(req.params.id);
    if (!subservice) return res.status(404).json({ message: 'Subservice not found' });
    res.json({ data: subservice });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subservice', error: err.message });
  }
});

// Update a subservice (PUT for full update, PATCH for partial)
router.put('/:id', updateSubService);

// Delete a subservice
router.delete('/:id', deleteSubService);

// Test route to verify router is active
router.get('/test', (req, res) => {
  res.json({ message: 'SubService router is working!' });
});

export default router;
