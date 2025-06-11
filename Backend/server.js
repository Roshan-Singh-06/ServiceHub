import express from 'express';
import cors from 'cors';
import  connectDB from './config/db.js';
import { ApiError } from './utils/ApiError.js';
import { ApiResponse } from './utils/ApiResponse.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Example route



app.use('/api/auth', authRoutes);
// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, 'Route not found'));
});



// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json(new ApiError(statusCode, err.message, err.errors || []));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;