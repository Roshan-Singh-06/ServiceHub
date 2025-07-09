import express from 'express';
import { registerUser, loginUser, updateUserLocation, logoutUser, sendEmailOTP, verifyEmailOTP } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import User from '../models/user.js';


const router = express.Router();

// Simple test route for debugging
router.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test route working');
});
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',  logoutUser);
router.post('/location', updateUserLocation);
router.post('/send-otp', (req, res, next) => {
  console.log('Auth route /send-otp hit with body:', req.body);
  sendEmailOTP(req, res, next);
});
router.post('/verify-otp', (req, res, next) => {
  console.log('Auth route /verify-otp hit with body:', req.body);
  verifyEmailOTP(req, res, next);
});

export default router;