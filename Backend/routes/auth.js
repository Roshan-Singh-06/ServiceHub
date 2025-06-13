import express from 'express';
import { registerUser, loginUser, updateUserLocation } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/location', updateUserLocation);

export default router;