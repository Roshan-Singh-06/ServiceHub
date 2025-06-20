import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    enum: [
      'Plumbing Services',
      'Painting Services',
      'Cleaning Services',
      'Appliance Repair',
      "Women Salon & Spa",
      "Men's Salon & Spa",
      'AC Repair and Services',
      'Electrical Services',
    ],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Store image URL or path
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
