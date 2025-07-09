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

    // Check for existing user
    const existingUser = await User.findOne({ email }).select('+isTemporary +emailVerified');
    
    // Clean up any expired temporary users for this email
    await User.deleteMany({ 
      email, 
      isTemporary: true, 
      emailOTPExpiry: { $lt: Date.now() } 
    });
    
    if (existingUser && !existingUser.isTemporary) {
      throw new ApiError(409, 'Email already registered');
    }
    
    if (existingUser && existingUser.isTemporary) {
      // This is a temporary user from email verification
      if (!existingUser.emailVerified) {
        throw new ApiError(400, 'Please verify your email first before completing registration');
      }
      
      // Update the temporary user with registration details
      existingUser.username = username;
      existingUser.name = name;
      existingUser.password = password;
      existingUser.role = role || 'user';
      existingUser.isTemporary = false;
      
      await existingUser.save();
      
      const userObj = existingUser.toObject();
      delete userObj.password;
      delete userObj.isTemporary;
      
      generateToken(res, existingUser._id); // Set JWT as an HTTP-only cookie
      res.status(201).json(new ApiResponse(201, userObj, 'Account created successfully'));
    } else {
      // Create new user
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
  console.log('sendEmailOTP called with:', req.body);
  const { email, purpose = 'login' } = req.body; // purpose can be 'login' or 'registration'
  if (!email) {
    throw new ApiError(400, 'Email is required');
  }
  
  let user = await User.findOne({ email });
  console.log('Existing user found:', user);
  
  if (purpose === 'registration') {
    console.log('Processing registration OTP request');
    
    // Clean up any expired temporary users for this email
    await User.deleteMany({ 
      email, 
      isTemporary: true, 
      emailOTPExpiry: { $lt: Date.now() } 
    });
    
    // Check if user exists (after cleanup)
    user = await User.findOne({ email });
    
    // For registration, user should not exist yet (except temporary users)
    if (user && !user.isTemporary) {
      throw new ApiError(400, 'Email already registered. Please log in instead.');
    }
    
    // Create a temporary user record to store OTP for registration
    const otp = generateOTP();
    const otpExpiry = Date.now() + 1 * 60 * 1000; // 1 minute expiry
    console.log('Generated OTP:', otp);
    
    try {
      // Store OTP in a temporary way (using a map or database temporary storage)
      // For now, we'll create a temporary user record that we'll clean up later
      user = new User({
        email,
        username: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate unique temp username
        name: 'Temporary User', // Temporary name
        password: 'temp_password_' + Math.random().toString(36), // Temporary password
        emailOTP: otp,
        emailOTPExpiry: otpExpiry,
        isTemporary: true // Mark as temporary for registration
      });
      console.log('About to save temporary user');
      await user.save();
      console.log('Temporary user saved');
      
      console.log('About to send OTP email');
      await sendOTPEmail({ to: email, otp });
      console.log('OTP email sent successfully');
      
      res.status(200).json(new ApiResponse(200, null, 'OTP sent to email for verification'));
    } catch (error) {
      console.error('Error in registration OTP flow:', error);
      throw new ApiError(500, 'Failed to send OTP: ' + error.message);
    }
  } else {
    // For login/password reset, user must exist
    if (!user) {
      throw new ApiError(404, 'User not found. Please register first.');
    }
    
    // Generate OTP and expiry (1 min)
    const otp = generateOTP();
    const otpExpiry = Date.now() + 1 * 60 * 1000; // 1 minute expiry
    user.emailOTP = otp;
    user.emailOTPExpiry = otpExpiry;
    await user.save();
    
    await sendOTPEmail({ to: email, otp });
    res.status(200).json(new ApiResponse(200, null, 'OTP sent to email'));
  }
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
  
  // Check if this is a temporary user for registration
  if (user.isTemporary) {
    // For registration: just mark OTP as verified, don't complete registration yet
    user.emailVerified = true;
    user.emailOTP = undefined;
    user.emailOTPExpiry = undefined;
    await user.save();
    
    res.status(200).json(new ApiResponse(200, null, 'Email verified successfully. You can now complete registration.'));
  } else {
    // For login: complete the login process
    user.emailVerified = true;
    user.emailOTP = undefined;
    user.emailOTPExpiry = undefined;
    await user.save();
    
    // Generate access token for login
    generateToken(res, user._id);
    res.status(200).json(new ApiResponse(200, { 
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email
      }
    }, 'OTP login successful'));
  }
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
