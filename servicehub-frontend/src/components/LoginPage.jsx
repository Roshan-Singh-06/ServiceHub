import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const brandAccent = '#5c7c89';
const brandAccentHover = '#4e6a78';

const initialForm = { username: '', name: '', email: '', password: '' };

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (isLogin) {
        // Login: only send email and password
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: form.email,
          password: form.password,
        });
        setMessage('Login successful!');
        localStorage.setItem('accessToken', res.data.data.accessToken);
        setTimeout(() => navigate('/'), 1000);
      } else {
        // Register: send all fields
        const res = await axios.post('http://localhost:5000/api/auth/register', {
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
    }
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setMessage('');
    setForm(initialForm);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f4959] via-[#5c7c89] to-[#1f4959] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1f4959]">
          {isLogin ? 'Login to ServiceHub' : 'Create an Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5c7c89]"
            required
          />
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
          <button
            type="submit"
            className="w-full bg-[#5c7c89] hover:bg-[#4e6a78] text-white font-semibold py-2 rounded-md transition duration-300 shadow-md"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 text-center font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>
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