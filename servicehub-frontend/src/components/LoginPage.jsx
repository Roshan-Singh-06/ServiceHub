import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';
import Loader from './Loader';

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    setOTPLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/auth/send-otp', { email: form.email });
      setOTPSent(true);
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
      setTimeout(() => navigate('/'), 1200); // Redirect after 1.2s
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      if (isLogin) {
        // Login: only send email and password
        const res = await axiosInstance.post('/auth/login', {
          email: form.email,
          password: form.password,
        });
        setMessage('Login successful!');
        localStorage.setItem('accessToken', res.data.data?.accessToken);
        setTimeout(() => navigate('/'), 1000);
      } else {
        // Register: send all fields
        const res = await axiosInstance.post('/auth/register', {
          username: form.username,
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setMessage('Account created successfully! Please log in.');
        setIsLogin(true);
        setForm(initialForm);
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
            </>
          )}
          {/* Login/OTP fields */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5c7c89] bg-[#f9fbfc] text-lg shadow-sm"
            required
          />
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
            <div className="flex gap-2 items-center mt-2">
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
          )}
          {showOTP && otpVerified && (
            <div className="text-green-600 text-center mt-2 font-semibold">OTP verified! You can now reset your password.</div>
          )}
          {/* Login/Register/Reset button */}
          {!showOTP && (
            <button
              type="submit"
              className="w-full bg-[#5c7c89] hover:bg-[#4e6a78] text-white font-semibold py-2 rounded-md transition duration-300 shadow-md"
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