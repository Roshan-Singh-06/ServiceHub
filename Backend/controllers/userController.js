import User from '../models/user.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js'
import { generateOTP, sendOTPEmail } from '../utils/emailUtils.js';

// Register a new user
export const registerUser = asyncHandler(async (req, res, next) => {
  try { 
    const { username, name, email, password, role } = req.body;

  if (!username || !name || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }
 const user = await User.create({
    username,
    name,
    email,
    password,
    role: role || 'user',
  });

  const userObj = user.toObject();
  delete userObj.password;

  if (user) {
      generateToken(res, user._id); // Set JWT as an HTTP-only cookie
     
  res.status(201).json(new ApiResponse(201, userObj, 'Account created successfully'));
   
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error creating user:", error.message); // Debugging line
    res.status(500).json({ message: "Server Error" });
  }

});

// Login user
export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.error('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    console.log('User found:', user);
    if (!user) {
      console.error('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.error('Password mismatch for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Extra debug: print user role and emailVerified
    console.log('User role:', user.role, 'Email verified:', user.emailVerified);

    generateToken(res, user._id); 
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server Error' });
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

// Logout user
export const logoutUser = asyncHandler(async (req, res, next) => {
  // Clear the JWT cookie
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'lax', // or 'strict' if you want more security
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json(new ApiResponse(200, null, 'Logged out successfully'));
});

// Send OTP for email verification
export const sendEmailOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, 'Email is required');
  }
  // Only allow OTP for existing users
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found. Please register first.');
  }
  // Generate OTP and expiry (10 min)
  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000;
  user.emailOTP = otp;
  user.emailOTPExpiry = otpExpiry;
  await user.save();
  await sendOTPEmail({ to: email, otp });
  res.status(200).json(new ApiResponse(200, null, 'OTP sent to email'));
});

// Verify OTP for email
export const verifyEmailOTP = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new ApiError(400, 'Email and OTP are required');
  }
  // Explicitly select OTP fields
  const user = await User.findOne({ email }).select('+emailOTP +emailOTPExpiry');
  console.log('OTP verification - user:', user);
  if (!user || !user.emailOTP || !user.emailOTPExpiry) {
    console.error('No OTP found for this email:', email, user);
    throw new ApiError(400, 'No OTP found for this email');
  }
  if (user.emailOTP !== otp) {
    console.error('Invalid OTP for email:', email, 'Expected:', user.emailOTP, 'Received:', otp);
    throw new ApiError(400, 'Invalid OTP');
  }
  if (user.emailOTPExpiry < Date.now()) {
    console.error('OTP expired for email:', email);
    throw new ApiError(400, 'OTP expired');
  }
  user.emailVerified = true;
  user.emailOTP = undefined;
  user.emailOTPExpiry = undefined;
  await user.save();
  res.status(200).json(new ApiResponse(200, null, 'Email verified successfully'));
});

// Get all users (admin only)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(new ApiResponse(200, users, 'All users fetched successfully'));
});

// Get a single user by ID (admin only)
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) throw new ApiError(404, 'User not found');
  res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
});

// Update a user by ID (admin only)
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!user) throw new ApiError(404, 'User not found');
  res.status(200).json(new ApiResponse(200, user, 'User updated successfully'));
});

// Delete a user by ID (admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  res.status(200).json(new ApiResponse(200, null, 'User deleted successfully'));
});
