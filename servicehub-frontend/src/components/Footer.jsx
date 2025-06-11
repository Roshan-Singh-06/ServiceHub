import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2 text-white text-2xl font-bold mb-4">
            <FiHome />
            ServiceHub
          </div>
          <p className="text-sm mb-4">
            Your trusted platform for professional home and beauty services.
            Quality service providers, verified professionals, guaranteed satisfaction.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Beauty & Spa</li>
            <li>Home Repairs</li>
            <li>Cleaning</li>
            <li>Appliance Repair</li>
            <li>Painting</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>How It Works</li>
            <li>Become a Partner</li>
            <li>Support</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2024 ServiceHub. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
