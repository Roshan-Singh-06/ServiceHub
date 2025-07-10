import Navbar from '../Navbar';
import React, { useState, useEffect } from "react";
import { getNestedServices } from '../../services/nestedserviceApi';
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api';
import { saveCart, getCart, clearCart as clearCartApi } from '../../services/cartApi';

const brandColor = '#1fc295';

export default function InnerService() {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [services, setServices] = useState([]); // subservices
  const [selectedService, setSelectedService] = useState('');
  const [nestedItems, setNestedItems] = useState([]);
  const [serviceData, setServiceData] = useState(null); // Store the main service data with video

  // Fetch subservices for the selected service name
  useEffect(() => {
    if (serviceName) {
      api.get(`/subservice?service=${encodeURIComponent(serviceName)}`)
        .then(res => {
          const subservices = res.data.data || [];
          setServices(subservices.map(s => ({
            name: s.category,
            image: s.image || "❓"
          })));
          if (subservices.length > 0) setSelectedService(subservices[0].category);
        });
    }
  }, [serviceName]);

  // Fetch main service data (including video) based on serviceName
  useEffect(() => {
    if (serviceName) {
      api.get('/service')
        .then(res => {
          const allServices = res.data.data || [];
          const currentService = allServices.find(service => 
            service.serviceName === serviceName
          );
          setServiceData(currentService || null);
        })
        .catch(err => {
          console.error('Error fetching service data:', err);
          setServiceData(null);
        });
    }
  }, [serviceName]);

  // Fetch nested packages for selected subservice
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

  // Save cart to localStorage on change (use the same key as CheckoutPage)
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
      // localStorage sync handled by useEffect
      return updated;
    });
  };

  const removeFromCart = (itemOrId) => {
    const key = typeof itemOrId === 'object' ? (itemOrId._id || itemOrId.id || itemOrId.name) : itemOrId;
    setCart(prev => {
      const existing = prev[key];
      if (!existing) return prev;
      let updated;
      if (existing.qty <= 1) {
        updated = { ...prev };
        delete updated[key];
      } else {
        updated = {
          ...prev,
          [key]: { ...existing, qty: existing.qty - 1 }
        };
      }
      // localStorage sync handled by useEffect
      return updated;
    });
  };

  const clearCart = () => {
    setCart({});
    clearCartApi();
    localStorage.removeItem("servicehub_cart");
  };

  // Calculate total
  const total = Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Helper to check login
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e6f2f1] via-[#5c7c89] to-[#1f4959] font-sans pb-16">
      <Navbar />
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#1f4959] mb-6 text-center mt-20">
        {serviceName ? `${serviceName} Services` : 'Services'}
      </h1>
      <div className="flex gap-6 px-4 lg:px-10">
        {/* Sticky Left Sidebar: Select a Service */}
        <div className="hidden md:block w-1/4 sticky top-24 self-start border-2 border-[#5c7c89] rounded-xl p-4 shadow-sm bg-[#e6f2f1] h-fit">
        
          <div className="bg-white/90 rounded-2xl shadow-xl border-4 border-[#5c7c89] p-8 w-full max-w-xs flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#1f4959] mb-6">Select a SubService</h2>
            <div className="grid grid-cols-2 gap-4">
              {services.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center bg-[#e6f2f1] border-1 border-[#5c7c89] p-4 rounded-xl hover:bg-[#5c7c89] hover:text-white transition-all cursor-pointer ${selectedService === s.name ? 'ring-4 ring-[#5c7c89] ring-opacity-50' : ''}`}
                  onClick={() => setSelectedService(s.name)}
                >
                  <img
                    src={s.image}
                   alt={s.name}
               
                   onError={e => { e.target.src = '/images/default-service.png'; }} // fallback image
                 />
                  <span className="text-sm font-medium mt-2">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="w-full md:w-3/4 space-y-10">
          {/* Video Section */}
          <div className="rounded-xl overflow-hidden shadow-md bg-[#e6f2f1] p-4 border-2 border-[#5c7c89]">
            {serviceData && serviceData.video ? (
              <video className="w-full rounded-xl" controls poster={serviceData.image || "/images/video-poster.png"}>
                <source src={serviceData.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : serviceData && serviceData.image ? (
              <div className="relative">
                <img 
                  src={serviceData.image} 
                  alt={serviceName}
                  className="w-full rounded-xl object-cover h-64"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-xl">
                  <p className="text-white text-lg font-semibold">No demo video available</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading service content...</p>
              </div>
            )}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-[#1f4959] mb-1">
                ServiceHub Company | {selectedService || serviceName}
              </h3>
              <p
                className="inline-block mt-2 px-4 py-2 text-white rounded-full text-sm"
                style={{ backgroundColor: brandColor }}
              >
                {serviceData ? `Starting @ ₹${serviceData.price} only` : 'Starting @ ₹399 only'}
              </p>
            </div>
          </div>
          {/* Packages & Cart */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Packages */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-xl font-bold text-[#1f4959] mb-4">Packages</h2>
              {nestedItems.length === 0 ? (
                <p className="text-[#5c7c89]">No packages available for this service.</p>
              ) : (
                nestedItems.map((item) => {
                  const key = item._id || item.id || item.name;
                  return (
                    <div
                      key={key}
                      className="bg-white rounded-xl p-4 mb-6 shadow border border-[#5c7c89] flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-[#1f4959] mb-1">{item.name}</h3>
                        <p className="text-sm font-semibold">
                          <span className="text-black">₹{item.price}</span>{' '}
                          <span className="line-through text-gray-400 text-sm">{item.original ? `₹${item.original}` : ''}</span> • {item.time}
                        </p>
                        <ul className="list-disc pl-5 mt-2 text-sm text-[#333]">
                          {Array.isArray(item.details) && item.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                        <div className="mt-3 flex gap-2 items-center">
                          <button
                            className="px-4 py-2 bg-[#5c7c89] text-white rounded-lg hover:bg-[#1f4959]"
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart
                          </button>
                          {cart[key] && (
                            <span className="ml-2 text-[#1f4959] font-semibold">Qty: {cart[key].qty}</span>
                          )}
                        </div>
                      </div>
                      <img src={item.image} alt={item.name} className="w-28 h-28 rounded-lg object-cover" />
                    </div>
                  );
                }))
              }
            </div>
            {/* Cart */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24 bg-white rounded-xl p-4 border-2 border-[#5c7c89] shadow">
                <h2 className="text-lg font-bold text-[#1f4959] mb-4">Cart</h2>
                {Object.keys(cart).length === 0 ? (
                  <p className="text-[#5c7c89] text-center">No items added yet.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {Object.values(cart).map((item) => (
                      <div key={item._id || item.id || item.name} className="mb-2 bg-[#e6f2f1] rounded p-3 text-[#1f4959]">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-[#5c7c89] mb-1">₹{item.price} × {item.qty}</p>
                            <p className="text-xs text-[#5c7c89]">{item.time}</p>
                            <p className="text-xs text-[#5c7c89]">{item.desc}</p>
                          </div>
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                          <button onClick={() => removeFromCart(item._id || item.id || item.name)} className="px-2 py-1 border border-[#5c7c89] rounded hover:bg-[#5c7c89] hover:text-white">-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => addToCart(item)} className="px-2 py-1 border border-[#5c7c89] rounded hover:bg-[#5c7c89] hover:text-white">+</button>
                          <button
  onClick={async () => {
    // Always use item.itemId if present, else fallback
    const itemId = item.itemId || item._id || item.id || item.name;
    try {
      await import('../../services/cartApi').then(({ removeCartItem }) => removeCartItem(itemId));
      setCart(prev => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    } catch {
      alert('Failed to remove item from cart. Please try again.');
    }
  }}
  className="ml-2 px-3 py-1 bg-red-500 text-white rounded font-semibold hover:bg-red-700 text-xs"
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
      </div>
    </div>
  );
}