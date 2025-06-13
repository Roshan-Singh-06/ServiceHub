import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Helper functions to generate tokens
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET || 'servicehubsecret',
    { expiresIn: '15m' } // Access token valid for 15 minutes
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET || 'servicehubrefreshsecret',
    { expiresIn: '7d' } // Refresh token valid for 7 days
  );
};

// Register a new user
export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    name,
    email,
    password: hashedPassword,
  });

  const userObj = user.toObject();
  delete userObj.password;

  res.status(201).json(new ApiResponse(201, userObj, 'Account created successfully'));
});

// Login user
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Optionally, you can store refreshToken in DB or send as httpOnly cookie
  // For now, send both in response

  const userObj = user.toObject();
  delete userObj.password;

  res.status(200).json(
    new ApiResponse(200, { user: userObj, accessToken, refreshToken }, 'Login successful')
  );
});

// Refresh access token
export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new ApiError(400, 'Refresh token is required');
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'servicehubrefreshsecret'
    );
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }
    const accessToken = generateAccessToken(user);
    res.status(200).json(
      new ApiResponse(200, { accessToken }, 'Access token refreshed')
    );
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
});

// Update user location
export const updateUserLocation = asyncHandler(async (req, res, next) => {
  const { userId } = req.body; // or get from auth middleware
  const { state, district, city, pincode, building, area, landmark, lat, lng } = req.body;

  if (!userId || !state || !district || !city) {
    throw new ApiError(400, 'State, district, and city are required');
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        location: { state, district, city, pincode, building, area, landmark, lat, lng }
      }
    },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'Location updated successfully'));
});