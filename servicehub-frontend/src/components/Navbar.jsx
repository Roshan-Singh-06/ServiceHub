import { FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import LocationModal from './Pages/LocationModal';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(() => localStorage.getItem('selectedState') || '');
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem('accessToken');

  useEffect(() => {
    const handleStorage = () => {
      setSelectedLocation(localStorage.getItem('selectedState') || '');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post('/auth/logout');
      localStorage.removeItem('accessToken');
      alert('Logout successful!');
      navigate('/login');
    } catch {
      alert('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-4 md:px-10 py-3 md:py-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl md:text-2xl font-bold text-black cursor-pointer" onClick={() => navigate('/')}>ServiceHub</h1>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-black mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-black mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        {/* Desktop menu */}
        <div className="hidden md:flex flex-row justify-between items-center w-full">
          {/* Middle links */}
          <div className="flex flex-row space-x-6 items-center mx-auto">
            <button type="button" onClick={() => scrollToSection('services')} className="text-[#242424] hover:text-black text-base md:text-lg bg-transparent focus:outline-none">Services</button>
            <button type="button" onClick={() => scrollToSection('how-it-works')} className="text-[#242424] hover:text-black text-base md:text-lg bg-transparent focus:outline-none">How It Works</button>
            <a href="/about" className="text-[#242424] hover:text-black text-base md:text-lg">About</a>
          </div>
          {/* Right options */}
          <div className="flex flex-row space-x-4 items-center">
            {/* Location selector */}
            <div className="flex items-center space-x-2 text-[#242424] hover:text-black cursor-pointer" onClick={() => setLocationModalOpen(true)}>
              <FaMapMarkerAlt className="text-lg" />
              <span className="text-sm md:text-base">
                {selectedLocation ? selectedLocation : 'Select Location'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[#242424] hover:text-black cursor-pointer" onClick={() => navigate('/cart')}>
              <FaShoppingCart className="text-lg" />
              <span className="text-sm md:text-base">Cart</span>
            </div>
            <div className="flex items-center space-x-2 text-[#242424] hover:text-black cursor-pointer" onClick={() => navigate('/booking')}>
              <FaBook className="text-lg" />
              <span className="text-sm md:text-base font-semibold">My Booking</span>
            </div>
            {isLoggedIn ? (
              <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-900 text-sm md:text-base" onClick={handleLogout} disabled={loading}>
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            ) : (
              <button className="bg-[#5c7c89] text-white px-4 py-1 rounded-md hover:bg-[#4e6a78] text-sm md:text-base" onClick={() => navigate('/login')}>Login</button>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center w-full mt-3 space-y-3 animate-fade-in">
          <button type="button" onClick={() => scrollToSection('services', setMenuOpen)} className="text-[#242424] hover:text-black text-base bg-transparent w-full text-left">Services</button>
          <button type="button" onClick={() => scrollToSection('how-it-works', setMenuOpen)} className="text-[#242424] hover:text-black text-base bg-transparent w-full text-left">How It Works</button>
          <a href="/about" className="text-[#242424] hover:text-black text-base">About</a>
          {/* Location selector for mobile */}
          <div className="flex items-center space-x-2 text-[#242424] hover:text-black cursor-pointer" onClick={() => { setMenuOpen(false); setLocationModalOpen(true); }}>
            <FaMapMarkerAlt className="text-lg" />
            <span className="text-sm">Select Location</span>
          </div>
          <div className="flex items-center space-x-2 text-[#242424] hover:text-black cursor-pointer" onClick={() => { setMenuOpen(false); navigate('/cart'); }}>
            <FaShoppingCart className="text-lg" />
            <span className="text-sm">Cart</span>
          </div>
          <button className="bg-[#5c7c89] text-white px-4 py-1 rounded-md hover:bg-[#4e6a78] text-sm w-full md:w-auto" onClick={() => { setMenuOpen(false); navigate('/login'); }}>Login</button>
          <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-900 text-sm w-full" onClick={handleLogout} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      )}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onLocationSaved={(stateName, goToServices) => {
          setSelectedLocation(stateName);
          if (goToServices) {
            window.location.hash = '#services';
          } else {
            window.location.hash = '';
          }
        }}
      />
    </nav>
  );
}
