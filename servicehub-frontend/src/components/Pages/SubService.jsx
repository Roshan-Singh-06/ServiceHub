import Navbar from '../Navbar';
import React, { useState, useEffect } from "react";
import { getNestedServices } from '../../services/nestedserviceApi';
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api';
import { saveCart, getCart, clearCart as clearCartApi } from '../../services/cartApi';

export default function SubService() {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [services, setServices] = useState([]); // subservices
  const [selectedService, setSelectedService] = useState('');
  const [nestedItems, setNestedItems] = useState([]);

  useEffect(() => {
    // Fetch subservices for the selected service name
    if (serviceName) {
      api.get(`/subservice?service=${encodeURIComponent(serviceName)}`)
        .then(res => {
          const subservices = res.data.data || [];
          setServices(subservices.map(s => ({
            name: s.category,
            icon: s.icon || "❓"
          })));
          if (subservices.length > 0) setSelectedService(subservices[0].category);
        });
    }
  }, [serviceName]);

  useEffect(() => {
    if (selectedService) {
      getNestedServices({ subservice: selectedService }).then(res => {
        setNestedItems(res.data.data || []);
      });
    }
  }, [selectedService]);

  // Load cart from backend on mount
  useEffect(() => {
    getCart().then(res => {
      if (res.data && res.data.cart && res.data.cart.items) {
        const obj = {};
        res.data.cart.items.forEach(item => {
          const key = item.itemId || item._id || item.id || item.name;
          obj[key] = { ...item };
        });
        setCart(obj);
      }
    });
  }, []);

  // Save cart to backend on change
  useEffect(() => {
    const items = Object.values(cart).map(item => ({
      itemId: item._id || item.id || item.itemId || item.name,
      name: item.name,
      price: item.price,
      qty: item.qty,
      image: item.image,
      time: item.time,
      desc: item.desc
    }));
    if (items.length > 0) saveCart(items);
  }, [cart]);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("servicehub_cart", JSON.stringify(cart));
  }, [cart]);

  // Cart functions: store full item object with qty
  const addToCart = (item) => {
    const key = item._id || item.id || item.name;
    setCart(prev => {
      const existing = prev[key];
      const updated = {
        ...prev,
        [key]: existing
          ? { ...existing, qty: existing.qty + 1 }
          : { ...item, qty: 1 }
      };
      return updated;
    });
  };

  // Remove item from cart and backend
  const removeFromCart = async (item) => {
    const key = item.itemId || item._id || item.id || item.name;
    try {
      await import('../../services/cartApi').then(({ removeCartItem }) => removeCartItem(key));
      setCart(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } catch {
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  // Calculate total
  const total = Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Helper to check login
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <div className="min-h-screen bg-gray-50 py-2">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1f4959] mb-10 text-center md:text-left drop-shadow">
          {serviceName ? `${serviceName} Services` : 'Services'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="bg-white/90 rounded-2xl shadow-xl border-4 border-[#5c7c89] p-8 w-full max-w-xs flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#1f4959] mb-6">Select a SubService</h2>
            <div className="grid grid-cols-2 gap-4">
              {services.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center bg-[#e6f2f1] border-2 border-[#5c7c89] p-4 rounded-xl hover:bg-[#5c7c89] hover:text-white transition-all cursor-pointer ${selectedService === s.name ? 'ring-4 ring-[#5c7c89] ring-opacity-50' : ''}`}
                  onClick={() => setSelectedService(s.name)}
                >
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-sm font-medium mt-2">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nested Items Section with Add to Cart */}
          <div className="bg-white/90 rounded-2xl shadow-xl border-4 border-[#5c7c89] p-8 flex-1 overflow-y-auto max-h-[600px]">
            <h2 className="text-2xl font-bold text-[#1f4959] mb-6">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nestedItems.length === 0 ? (
                <div className="text-gray-500 text-lg">No services available.</div>
              ) : (
                nestedItems.map((item, i) => {
                  const key = item._id || item.id || item.name;
                  return (
                    <div key={key} className="flex items-start bg-[#e6f2f1] border-2 border-[#5c7c89] p-4 rounded-lg transition-all hover:bg-[#5c7c89] group hover:text-white">
                      <img src={item.image || '/images/plumber.jpg'} alt={item.name} className="w-20 h-20 object-cover rounded-md border-2 border-[#5c7c89]" />
                      <div className="ml-4 w-full">
                        <h3 className="font-semibold text-[#1f4959] group-hover:text-white">{item.name}</h3>
                        <p className="text-sm text-[#5c7c89] group-hover:text-[#e6f2f1]">{item.desc}</p>
                        <p className="text-sm text-[#5c7c89] font-medium mt-1 group-hover:text-[#e6f2f1]">₹{item.price} • {item.time}</p>
                        <div className="flex items-center mt-2 gap-2">
                          <button
                            className="bg-[#5c7c89] text-white px-4 py-2 rounded hover:bg-[#1f4959] font-semibold"
                            onClick={() => addToCart(item)}
                          >
                            {cart[key] ? 'Add Again' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="bg-white/90 rounded-2xl shadow-xl border-4 border-[#5c7c89] p-8 w-full max-w-xs">
            <h2 className="text-2xl font-bold text-[#1f4959] mb-6 text-center">Cart</h2>
            {Object.keys(cart).length === 0 ? (
              <p className="text-center text-sm text-[#b0c4ce]">No items added</p>
            ) : (
              <div className="flex flex-col gap-4">
                {Object.values(cart).map((item) => (
                  <div key={item.itemId || item._id || item.id || item.name} className="bg-[#e6f2f1] p-3 rounded border-2 border-[#5c7c89] mb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[#1f4959] font-medium">{item.name}</span>
                        <span className="block text-xs text-[#5c7c89]">₹{item.price} × {item.qty}</span>
                        <span className="block text-xs text-[#5c7c89]">{item.time}</span>
                        <span className="block text-xs text-[#5c7c89]">{item.desc}</span>
                      </div>
                      <img src={item.image || '/images/plumber.jpg'} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    </div>
                    <div className="flex gap-2 items-center mt-2">
                      <span>Qty: {item.qty}</span>
                      <button
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded font-semibold hover:bg-red-700 text-xs"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="text-right mt-4">
                  <p className="text-[#1f4959] font-bold">Total: ₹{total}</p>
                  <button
                    className="mt-3 px-4 py-2 bg-[#5c7c89] text-white rounded w-full font-semibold hover:bg-[#1f4959]"
                    onClick={() => {
                      if (!isLoggedIn) {
                        navigate('/login');
                      } else {
                        navigate('/checkout');
                      }
                    }}
                  >
                    Go to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}