import React, { useState } from 'react';
import Navbar from '../Navbar';

const services = [
  { name: 'Bath fittings', icon: '🚿' },
  { name: 'Basin & sink', icon: '🚰' },
  { name: 'Grouting', icon: '🧱' },
  { name: 'Water filter', icon: '💧' },
  { name: 'Drainage', icon: '🪠' },
  { name: 'Toilet', icon: '🚽' },
  { name: 'Tap & mixer', icon: '🔧' },
  { name: 'Water tank', icon: '🛢️' },
];

const serviceItems = {
  'Bath fittings': [
    {
      name: 'Towel Hanger Installation',
      price: 99,
      time: '20 mins',
      desc: 'Install towel hangers, soap holders, shelves, etc.'
    },
    {
      name: 'Shower Head Replacement',
      price: 149,
      time: '30 mins',
      desc: 'Replace or install new shower heads and arms.'
    },
    {
      name: 'Bathroom Shelf Fitting',
      price: 129,
      time: '25 mins',
      desc: 'Fit glass/metal shelves in bathroom.'
    }
  ],
  'Basin & sink': [
    {
      name: 'Basin Installation',
      price: 249,
      time: '45 mins',
      desc: 'Install new wash basin with all fittings.'
    },
    {
      name: 'Sink Unclogging',
      price: 119,
      time: '30 mins',
      desc: 'Unclog kitchen or bathroom sink.'
    },
    {
      name: 'Tap Leak Fix',
      price: 99,
      time: '20 mins',
      desc: 'Fix leaking taps in basin or sink.'
    }
  ],
  'Grouting': [
    {
      name: 'Tile Grouting (per 10 sq.ft.)',
      price: 199,
      time: '40 mins',
      desc: 'Re-grout tiles in bathroom or kitchen.'
    },
    {
      name: 'Crack Filling',
      price: 149,
      time: '30 mins',
      desc: 'Fill cracks in tile joints.'
    }
  ],
  'Water filter': [
    {
      name: 'Water Filter Installation',
      price: 299,
      time: '60 mins',
      desc: 'Install new water filter unit.'
    },
    {
      name: 'Water Filter Service',
      price: 149,
      time: '30 mins',
      desc: 'Service/clean existing water filter.'
    }
  ],
  'Drainage': [
    {
      name: 'Drain Unclogging',
      price: 179,
      time: '35 mins',
      desc: 'Unclog bathroom/kitchen drain pipes.'
    },
    {
      name: 'Drain Trap Replacement',
      price: 129,
      time: '25 mins',
      desc: 'Replace broken or leaking drain traps.'
    }
  ],
  'Toilet': [
    {
      name: 'Toilet Seat Installation',
      price: 199,
      time: '30 mins',
      desc: 'Install or replace toilet seat cover.'
    },
    {
      name: 'Flush Tank Repair',
      price: 149,
      time: '30 mins',
      desc: 'Repair leaking or non-working flush tank.'
    }
  ],
  'Tap & mixer': [
    {
      name: 'Tap Installation',
      price: 99,
      time: '20 mins',
      desc: 'Install new tap in kitchen or bathroom.'
    },
    {
      name: 'Mixer Repair',
      price: 129,
      time: '30 mins',
      desc: 'Repair leaking or jammed mixer.'
    }
  ],
  'Water tank': [
    {
      name: 'Water Tank Cleaning',
      price: 499,
      time: '90 mins',
      desc: 'Clean and disinfect water storage tank.'
    },
    {
      name: 'Tank Overflow Pipe Fix',
      price: 149,
      time: '30 mins',
      desc: 'Fix or replace overflow pipe in tank.'
    }
  ]
};

const items = [
  {
    name: 'Bath accessory installation',
    price: 148,
    time: '30 mins',
    desc: 'Small fittings such as towel hanger, shelves, soap dispenser, etc.',
  },
  {
    name: 'Shower installation',
    price: 189,
    time: '45 mins',
    desc: 'Wall-mounted & handheld shower installation.',
  },
];

export default function PlumberSection() {
  const [cart, setCart] = useState({});
  const [selectedService, setSelectedService] = useState(services[0].name);

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

  const getTotal = () => {
    return Object.entries(cart).reduce((total, [name, qty]) => {
      const item = items.find(i => i.name === name);
      return total + (item?.price || 0) * qty;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-2">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1f4959] mb-10 text-center md:text-left drop-shadow">Plumber Services</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="bg-white/90 rounded-2xl shadow-xl border-4 border-[#5c7c89] p-8 w-full max-w-xs flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#1f4959] mb-6">Select a Service</h2>
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
              {serviceItems[selectedService].map((item, i) => (
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
              ))}
            </div>
          </div>

          <div className="bg-[#5c7c89 rounded-2xl shadow-xl border-4 border-[#5c7c89] p-8 w-full max-w-xs">
            <h2 className="text-2xl font-bold  text-[#1f4959] mb-6 text-center">Cart</h2>
            {Object.keys(cart).length === 0 ? (
              <p className="text-center text-sm text-[#b0c4ce]">No items added</p>
            ) : (
              <div className="flex flex-col gap-4">
                {Object.entries(cart).map(([name, qty]) => {
                  // Find the item in all serviceItems
                  let item;
                  for (const arr of Object.values(serviceItems)) {
                    item = arr.find(i => i.name === name);
                    if (item) break;
                  }
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
                let item;
                for (const arr of Object.values(serviceItems)) {
                  item = arr.find(i => i.name === name);
                  if (item) break;
                }
                return total + (item?.price || 0) * qty;
              }, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}