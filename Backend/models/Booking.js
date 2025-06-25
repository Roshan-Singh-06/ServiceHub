import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // optional for guest checkout
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  slot: { type: String, required: true }, // ISO string
  payment: { type: String, enum: ['cod', 'upi', 'gpay'], required: true },
  items: [
    {
      itemId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      image: { type: String },
      time: { type: String },
      desc: { type: String },
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
