import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { ApiError } from './utils/ApiError.js';
import { ApiResponse } from './utils/ApiResponse.js'; // If you're using it somewhere else
import authRoutes from './routes/auth.js';
import locationRoutes from './routes/location.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);

// 404 Route Not Found handler
app.use((req, res, next) => {
  next(new ApiError(404, 'Route not found'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res
    .status(statusCode)
    .json(new ApiError(statusCode, err.message || 'Internal Server Error', err.errors || []));
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

export default app;
