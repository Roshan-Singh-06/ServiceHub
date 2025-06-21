import express from 'express';
import { registerUser, loginUser, updateUserLocation, logoutUser, sendEmailOTP, verifyEmailOTP } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';


const router = express.Router();

// Simple test route for debugging
router.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test route working');
});
router.get('/me', async (req, res) => {
  res.json({ user: req.user });
});
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',  logoutUser);
router.post('/location', updateUserLocation);
router.post('/send-otp', sendEmailOTP);
router.post('/verify-otp', verifyEmailOTP);

export default router;