import express from 'express';
import {
  createSubService,
  getSubServicesByService,
  getAllSubServices,
  updateSubService,
  deleteSubService
} from '../controllers/subServiceController.js';
import { subServiceCategory } from '../models/SubService.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Create a new subservice with image upload
router.post('/', upload.single('image'), createSubService);

// Get all subservices (optionally filter by service or category)
router.get('/', getAllSubServices);

// Get all subservices for a specific service
router.get('/service/:service', getSubServicesByService);

// Get all subservice categories for a specific service (inline, not separate route file)
router.get('/categories/:service', (req, res) => {
  let { service } = req.params;
  // Try to decode URI component in case it's encoded
  try { service = decodeURIComponent(service); } catch {}
  
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

router.put('/:id', upload.single('image'), updateSubService);
router.patch('/:id', upload.single('image'), updateSubService);

// Delete a subservice
router.delete('/:id', deleteSubService);

// Test route to verify router is active
router.get('/test', (req, res) => {
  res.json({ message: 'SubService router is working!' });
});

export default router;
