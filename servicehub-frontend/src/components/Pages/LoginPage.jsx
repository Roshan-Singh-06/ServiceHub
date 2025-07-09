import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import Loader from '../Loader';

const brandAccent = '#5c7c89';
const brandAccentHover = '#4e6a78';

const initialForm = { username: '', name: '', email: '', password: '' };

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [otpSent, setOTPSent] = useState(false);
  const [otpLoading, setOTPLoading] = useState(false);
  const [otpVerified, setOTPVerified] = useState(false);
  
  // Registration OTP states
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtpVerified, setRegOtpVerified] = useState(false);
  const [regOtp, setRegOtp] = useState('');
  const [regOtpLoading, setRegOtpLoading] = useState(false);
  
  // Resend OTP timers
  const [regOtpTimer, setRegOtpTimer] = useState(0);
  const [loginOtpTimer, setLoginOtpTimer] = useState(0);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  // Timer effects for OTP resend
  useEffect(() => {
    let interval = null;
    if (regOtpTimer > 0) {
      interval = setInterval(() => {
        setRegOtpTimer(timer => timer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [regOtpTimer]);

  useEffect(() => {
    let interval = null;
    if (loginOtpTimer > 0) {
      interval = setInterval(() => {
        setLoginOtpTimer(timer => timer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loginOtpTimer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Login OTP functions
  const handleSendOTP = async () => {
    setOTPLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/auth/send-otp', { email: form.email });
      setOTPSent(true);
      setLoginOtpTimer(60); // Start 60 second timer
      setMessage('OTP sent to your email.');
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to send OTP. Please try again.'
      );
    } finally {
      setOTPLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setOTPLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/auth/verify-otp', { email: form.email, otp });
      setOTPVerified(true);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid OTP. Please try again.'
      );
    } finally {
      setOTPLoading(false);
    }
  };

  // Registration OTP functions
  const handleSendRegOTP = async () => {
    if (!form.email || !form.username || !form.name || !form.password) {
      setMessage('Please fill in all fields before verifying email.');
      return;
    }
    
    setRegOtpLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/auth/send-otp', { 
        email: form.email, 
        purpose: 'registration' 
      });
      setRegOtpSent(true);
      setRegOtpTimer(60); // Start 60 second timer
      setMessage('OTP sent to your email for verification.');
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to send OTP. Please try again.'
      );
    } finally {
      setRegOtpLoading(false);
    }
  };

  const handleVerifyRegOTP = async () => {
    setRegOtpLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/auth/verify-otp', { email: form.email, otp: regOtp });
      setRegOtpVerified(true);
      setRegOtpTimer(0); // Stop timer on verification
      setMessage('Email verified! You can now create your account.');
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid OTP. Please try again.'
      );
    } finally {
      setRegOtpLoading(false);
    }
  };

  // Resend OTP functions
  const handleResendRegOTP = async () => {
    if (regOtpTimer > 0) return; // Prevent resend if timer is active
    
    setRegOtpLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/auth/send-otp', { 
        email: form.email, 
        purpose: 'registration' 
      });
      setRegOtpTimer(60); // Restart 60 second timer
      setMessage('OTP resent to your email.');
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to resend OTP. Please try again.'
      );
    } finally {
      setRegOtpLoading(false);
    }
  };

  const handleResendLoginOTP = async () => {
    if (loginOtpTimer > 0) return; // Prevent resend if timer is active
    
    setOTPLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/auth/send-otp', { email: form.email });
      setLoginOtpTimer(60); // Restart 60 second timer
      setMessage('OTP resent to your email.');
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to resend OTP. Please try again.'
      );
    } finally {
      setOTPLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      if (isLogin) {
        // Login: use AuthContext login method
        const result = await login({
          email: form.email,
          password: form.password,
        });
        
        if (result.success) {
          setMessage('Login successful!');
          setTimeout(() => navigate('/'), 1000);
        } else {
          setMessage(result.message || 'Login failed. Please try again.');
        }
      } else {
        // Register: check if email is verified first
        if (!regOtpVerified) {
          setMessage('Please verify your email before creating account.');
          setLoading(false);
          return;
        }
        
        await axiosInstance.post('/auth/register', {
          username: form.username,
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setMessage('Account created successfully! Please log in.');
        setIsLogin(true);
        setForm(initialForm);
        // Reset registration OTP states
        setRegOtpSent(false);
        setRegOtpVerified(false);
        setRegOtp('');
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setMessage('');
    setForm(initialForm);
    // Reset all OTP states
    setShowOTP(false);
    setOTPSent(false);
    setOTPVerified(false);
    setOTP('');
    setRegOtpSent(false);
    setRegOtpVerified(false);
    setRegOtp('');
    // Reset timers
    setRegOtpTimer(0);
    setLoginOtpTimer(0);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f4959] via-[#5c7c89] to-[#1f4959] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1f4959]">
          {isLogin ? 'Login to ServiceHub' : 'Create an Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Registration fields */}
          {!isLogin && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5c7c89]"
                required
                minLength={3}
                maxLength={30}
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5c7c89]"
                required
                maxLength={50}
              />
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5c7c89] ${regOtpVerified ? 'bg-green-50 border-green-300' : ''}`}
                  required
                  disabled={regOtpVerified}
                />
                {regOtpVerified && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-bold">✓</span>
                )}
              </div>
              
              {/* Email verification section for registration */}
              {!regOtpSent && !regOtpVerified && (
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-[#5c7c89] to-[#1f4959] hover:from-[#1f4959] hover:to-[#5c7c89] text-white font-semibold py-2 rounded-md transition-all duration-300 shadow"
                  onClick={handleSendRegOTP}
                  disabled={regOtpLoading}
                >
                  {regOtpLoading ? 'Sending OTP...' : 'Verify Email'}
                </button>
              )}
              
              {regOtpSent && !regOtpVerified && (
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={regOtp}
                      onChange={e => setRegOtp(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5c7c89]"
                      maxLength={6}
                      required
                    />
                    <button
                      type="button"
                      className="bg-gradient-to-r from-[#5c7c89] to-[#1f4959] hover:from-[#1f4959] hover:to-[#5c7c89] text-white px-4 py-2 rounded-md font-semibold transition-all duration-300 shadow"
                      onClick={handleVerifyRegOTP}
                      disabled={regOtpLoading}
                    >
                      {regOtpLoading ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                  <div className="text-center">
                    {regOtpTimer > 0 ? (
                      <span className="text-gray-500 text-sm">
                        Resend OTP in {regOtpTimer}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="text-blue-500 hover:text-blue-600 text-sm font-semibold underline"
                        onClick={handleResendRegOTP}
                        disabled={regOtpLoading}
                      >
                        {regOtpLoading ? 'Sending...' : 'Resend OTP'}
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {regOtpVerified && (
                <div className="text-green-600 text-center font-semibold bg-green-50 py-2 rounded-md">
                  ✓ Email verified successfully!
                </div>
              )}

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5c7c89] pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </>
          )}
          
          {/* Login/OTP fields */}
          {isLogin && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5c7c89] bg-[#f9fbfc] text-lg shadow-sm"
                required
              />
            </>
          )}
          
          {/* Send OTP button after email input in OTP session */}
          {showOTP && !otpSent && (
            <button
              type="button"
              className="w-full bg-gradient-to-r from-[#5c7c89] to-[#1f4959] hover:from-[#1f4959] hover:to-[#5c7c89] text-white font-bold py-3 rounded-lg transition-all shadow mt-2"
              onClick={handleSendOTP}
              disabled={otpLoading}
            >
              {otpLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          )}
          
          {/* Password field for normal login */}
          {isLogin && !showOTP && (
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5c7c89] pr-10 bg-[#f9fbfc] text-lg shadow-sm"
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}
          
          {/* OTP input and verify button after OTP is sent */}
          {showOTP && otpSent && (
            <div className="space-y-2 mt-2">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOTP(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5c7c89] bg-[#f9fbfc] text-lg shadow-sm"
                  maxLength={6}
                  required
                  disabled={otpVerified}
                />
                <button
                  type="button"
                  className="bg-gradient-to-r from-[#5c7c89] to-[#1f4959] text-white px-5 py-3 rounded-lg font-bold shadow hover:from-[#1f4959] hover:to-[#5c7c89] transition-all"
                  onClick={handleVerifyOTP}
                  disabled={otpLoading || otpVerified}
                >
                  {otpLoading ? 'Verifying...' : otpVerified ? 'Verified' : 'Verify OTP'}
                </button>
              </div>
              <div className="text-center">
                {loginOtpTimer > 0 ? (
                  <span className="text-gray-500 text-sm">
                    Resend OTP in {loginOtpTimer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600 text-sm font-semibold underline"
                    onClick={handleResendLoginOTP}
                    disabled={otpLoading || otpVerified}
                  >
                    {otpLoading ? 'Sending...' : 'Resend OTP'}
                  </button>
                )}
              </div>
            </div>
          )}
          
          {showOTP && otpVerified && (
            <div className="text-green-600 text-center mt-2 font-semibold">OTP verified! You can now reset your password.</div>
          )}
          
          {/* Login/Register/Reset button */}
          {!showOTP && (
            <button
              type="submit"
              className={`w-full font-semibold py-2 rounded-md transition duration-300 shadow-md ${
                !isLogin && !regOtpVerified 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-[#5c7c89] hover:bg-[#4e6a78] text-white'
              }`}
              disabled={!isLogin && !regOtpVerified}
            >
              {loading ? <Loader size={20} color="white" /> : isLogin ? 'Login' : 'Create Account'}
            </button>
          )}
        </form>
        
        {/* Forgot password/OTP login link */}
        {isLogin && !showOTP && (
          <div className="mt-4 text-center">
            <button
              className="text-[#5c7c89] hover:underline font-semibold"
              onClick={() => { setShowOTP(true); setMessage(''); }}
            >
              Forgot password or Login with OTP?
            </button>
          </div>
        )}
        
        {message && (
          <div className={`mt-4 text-center font-medium ${message.includes('success') || message.includes('verified') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>
        )}
        
        <div className="mt-6 text-center">
          {isLogin ? (
            <>
              <span className="text-gray-700">Don't have an account? </span>
              <button
                className="text-[#5c7c89] hover:underline font-semibold"
                onClick={switchMode}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-700">Already have an account? </span>
              <button
                className="text-[#5c7c89] hover:underline font-semibold"
                onClick={switchMode}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}