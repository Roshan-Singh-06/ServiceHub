import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { name, phone, address, slot, payment, items, total } = req.body;
    if (!name || !phone || !address || !slot || !payment || !Array.isArray(items) || items.length === 0 || !total) {
      return res.status(400).json({ success: false, message: 'All booking fields are required.' });
    }
    const userId = req.user?._id; // If authenticated
    const booking = await Booking.create({
      user: userId,
      name,
      phone,
      address,
      slot,
      payment,
      items,
      total
    });
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all bookings for a user (optional, for user history)
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// (Optional) Admin: Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
