import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import ApiError from './utils/ApiError.js';
import ApiResponse from './utils/ApiResponse.js';
import authRoutes from './routes/auth.js';
import locationRoutes from './routes/location.js';
import serviceRoutes from './routes/service.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import subServiceRoutes from './routes/subService.js'; // Import subServiceRoutes
import nestedServiceRoutes from './routes/nestedService.js';
import path from 'path';

// Load environment variables
dotenv.config();
// Initialize Express app
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://admin-panel-1-rele.onrender.com"
        : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);


app.use(cookieParser());

// Helper: Log static file serving for debug
console.log('Serving static files from:', path.resolve('uploads'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subService', subServiceRoutes); // Register subService routes
app.use('/api/nestedservice', nestedServiceRoutes);


app.use((req, res, next) => {
  console.log('404 Debug:', req.method, req.originalUrl);
  next(new ApiError(404, 'Route not found'));
});

// 404 Route Not Found handler
app.use((req, res, next) => {
  next(new ApiError(404, 'Route not found'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err); // Add this line for debugging
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
