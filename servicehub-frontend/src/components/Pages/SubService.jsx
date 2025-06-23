import Navbar from '../Navbar';
import React, { useState, useEffect } from "react";
import { getPlumbingSubServices } from '../../services/subserviceApi';
import { getNestedServices } from '../../services/nestedserviceApi';
import { useParams } from "react-router-dom";
import api from '../../services/api';

export default function PlumberSection() {
  const { serviceName } = useParams();
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

  const addToCart = (name) => {
    setCart(prev => ({
      ...prev,
      [name]: (prev[name] || 0) + 1
    }));
  };

  const removeFromCart = (name) => {
    setCart(prev => {
      if (!prev[name]) return prev;
      const updated = { ...prev, [name]: prev[name] - 1 };
      if (updated[name] <= 0) delete updated[name];
      return updated;
    });
  };

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

          <div className="bg-white/90 rounded-2xl shadow-xl border-4 border-[#5c7c89] p-8 flex-1 overflow-y-auto max-h-[600px]">
            <h2 className="text-2xl font-bold text-[#1f4959] mb-6">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nestedItems.length === 0 ? (
                <div className="text-gray-500 text-lg">No services available.</div>
              ) : (
                nestedItems.map((item, i) => (
                  <div key={i} className="flex items-start bg-[#e6f2f1] border-2 border-[#5c7c89] p-4 rounded-lg transition-all hover:bg-[#5c7c89] group hover:text-white">
                    <img src={item.image || '/images/plumber.jpg'} alt={item.name} className="w-20 h-20 object-cover rounded-md border-2 border-[#5c7c89]" />
                    <div className="ml-4 w-full">
                      <h3 className="font-semibold text-[#1f4959] group-hover:text-white">{item.name}</h3>
                      <p className="text-sm text-[#5c7c89] group-hover:text-[#e6f2f1]">{item.desc}</p>
                      <p className="text-sm text-[#5c7c89] font-medium mt-1 group-hover:text-[#e6f2f1]">₹{item.price} • {item.time}</p>
                      <div className="flex items-center mt-2 gap-2">
                        <button onClick={() => removeFromCart(item.name)} className="text-[#5c7c89] border-2 border-[#5c7c89] px-2 rounded hover:bg-[#1f4959] hover:text-white">−</button>
                        <span className="group-hover:text-white">{cart[item.name] || 0}</span>
                        <button onClick={() => addToCart(item.name)} className="bg-[#5c7c89] text-white px-2 rounded hover:bg-[#1f4959]">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#5c7c89 rounded-2xl shadow-xl border-4 border-[#5c7c89] p-8 w-full max-w-xs">
            <h2 className="text-2xl font-bold  text-[#1f4959] mb-6 text-center">Cart</h2>
            {Object.keys(cart).length === 0 ? (
              <p className="text-center text-sm text-[#b0c4ce]">No items added</p>
            ) : (
              <div className="flex flex-col gap-4">
                {Object.entries(cart).map(([name, qty]) => {
                  const item = nestedItems.find(i => i.name === name);
                  if (!item) return null;
                  return (
                    <div key={name} className="bg-white/90 p-3 rounded border-2 border-[#5c7c89]">
                      <div className="flex justify-between">
                        <span className="text-[#1f4959] font-medium">{name}</span>
                        <span className="text-[#5c7c89]">₹{item.price * qty}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => removeFromCart(name)} className="text-[#5c7c89] border-2 border-[#5c7c89] px-2 rounded hover:bg-[#5c7c89] hover:text-white">−</button>
                        <span>{qty}</span>
                        <button onClick={() => addToCart(name)} className="bg-[#5c7c89] text-white px-2 rounded hover:bg-[#1f4959]">+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <hr className="my-4 border-[#5c7c89]/40" />
            <div className="flex justify-between font-semibold text-[#5c7c89]">
              <span>Total</span>
              <span>₹{Object.entries(cart).reduce((total, [name, qty]) => {
                const item = nestedItems.find(i => i.name === name);
                return total + (item?.price || 0) * qty;
              }, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}