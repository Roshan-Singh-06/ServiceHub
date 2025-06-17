import express from 'express';
import { registerUser, loginUser, updateUserLocation, logoutUser, sendEmailOTP, verifyEmailOTP } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
// import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

// Simple test route for debugging
router.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test route working');
});

router.post('/register', registerUser);
router.post('/login',authMiddleware,loginUser);
router.post('/logout', authMiddleware,logoutUser);
router.post('/location', updateUserLocation);
router.post('/send-otp', sendEmailOTP);
router.post('/verify-otp', verifyEmailOTP);

export default router;