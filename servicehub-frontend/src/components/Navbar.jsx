import { FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
            <div className="flex items-center space-x-2 text-[#242424] hover:text-black cursor-pointer" onClick={() => navigate('/location')}>
              <FaMapMarkerAlt className="text-lg" />
              <span className="text-sm md:text-base">Select Location</span>
            </div>
            <div className="flex items-center space-x-2 text-[#242424] hover:text-black cursor-pointer">
              <FaShoppingCart className="text-lg" />
              <span className="text-sm md:text-base">Cart</span>
            </div>
            <button className="bg-[#5c7c89] text-white px-4 py-1 rounded-md hover:bg-[#4e6a78] text-sm md:text-base" onClick={() => navigate('/login')}>Login</button>
            <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-900 text-sm md:text-base">Sign Up</button>
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
          <div className="flex items-center space-x-2 text-[#242424] hover:text-black cursor-pointer" onClick={() => { setMenuOpen(false); navigate('/location'); }}>
            <FaMapMarkerAlt className="text-lg" />
            <span className="text-sm">Select Location</span>
          </div>
          <div className="flex items-center space-x-2 text-[#242424] hover:text-black cursor-pointer">
            <FaShoppingCart className="text-lg" />
            <span className="text-sm">Cart</span>
          </div>
          <button className="bg-[#5c7c89] text-white px-4 py-1 rounded-md hover:bg-[#4e6a78] text-sm w-full md:w-auto" onClick={() => { setMenuOpen(false); navigate('/login'); }}>Login</button>
          <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-900 text-sm w-full">Sign Up</button>
        </div>
      )}
    </nav>
  );
}
