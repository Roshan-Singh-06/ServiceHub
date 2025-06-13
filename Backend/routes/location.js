// location.js
import express from 'express';
import locationController from '../controllers/locationController.js';
const router = express.Router();

router.get('/states', locationController.getStates);
router.get('/districts', locationController.getDistricts);
router.get('/cities', locationController.getCities);

export default router;
