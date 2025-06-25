import express from 'express';
import { createBooking, getUserBookings, getAllBookings } from '../controllers/bookingController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new booking (user or guest)
router.post('/', authenticate, createBooking);

// Get all bookings for the authenticated user
router.get('/my', authenticate, getUserBookings);

// (Optional) Admin: Get all bookings
router.get('/all', authenticate, getAllBookings);

export default router;
