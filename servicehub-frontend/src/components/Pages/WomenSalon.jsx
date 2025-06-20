import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const brandColor = '#1fc295';

const services = [
  { name: 'Packages', image: '/images/Package.jpg' },
  { name: 'Blow-dry & style', image: '/images/Blow-dry.jpg' },
  { name: 'Cut & style', image: '/images/Cut.jpg' },
  { name: 'Trim & style', image: '/images/Trim.jpg' },
  { name: 'Hair care', image: '/images/Hair.jpg' },
  { name: 'Keratin & botox', image: '/images/Keratin.jpg' },
  { name: 'Hair extensions', image: '/images/Extension.jpg' },
  { name: 'Fashion color', image: '/images/Fashion.jpg' },
 
];

// Packages for each service (at least 10 per service)
const allPackages = {
  'Packages': [
    {
      id: 'pkg1',
      title: 'Haircut & Spa',
      rating: '4.83 (115K reviews)',
      price: 1648,
      original: 1848,
      time: '1 hr 45 mins',
      details: ['L’Oreal hair spa', 'Haircut'],
      image: '/images/Hair.jpg',
    },
    {
      id: 'pkg2',
      title: 'Hair Spa & Style',
      rating: '4.84 (104K reviews)',
      price: 1498,
      original: 1698,
      time: '1 hr 45 mins',
      details: ['L’Oreal hair spa', 'Blow-dry: In-curl/out-curl'],
      image: '/images/Hair2.jpg',
    },
    {
      id: 'pkg3',
      title: 'Premium Haircut',
      rating: '4.90 (90K reviews)',
      price: 899,
      original: 1099,
      time: '1 hr',
      details: ['Advanced haircut', 'Styling'],
      image: '/images/Hair3.jpg',
    },
    {
      id: 'pkg4',
      title: 'Express Spa',
      rating: '4.75 (80K reviews)',
      price: 799,
      original: 999,
      time: '45 mins',
      details: ['Quick hair spa', 'Head massage'],
      image: '/images/Hair4.jpg',
    },
    {
      id: 'pkg5',
      title: 'Classic Haircut',
      rating: '4.80 (70K reviews)',
      price: 499,
      original: 699,
      time: '30 mins',
      details: ['Basic haircut', 'Blow-dry'],
      image: '/images/Hair6.jpg',
    },
    {
      id: 'pkg6',
      title: 'Luxury Spa Combo',
      rating: '4.95 (60K reviews)',
      price: 1999,
      original: 2299,
      time: '2 hr',
      details: ['L’Oreal spa', 'Hair mask', 'Styling'],
      image: '/images/Hair5.jpg',
    },
    {
      id: 'pkg7',
      title: 'Keratin Smooth',
      rating: '4.88 (50K reviews)',
      price: 2499,
      original: 2799,
      time: '2 hr 30 mins',
      details: ['Keratin treatment', 'Haircut'],
      image: '/images/Keratin.jpg',
    },
    {
      id: 'pkg8',
      title: 'Botox Shine',
      rating: '4.85 (40K reviews)',
      price: 2699,
      original: 2999,
      time: '2 hr 30 mins',
      details: ['Botox hair treatment', 'Styling'],
      image: '/images/Hair7.jpg',
    },
    {
      id: 'pkg9',
      title: 'Color & Spa',
      rating: '4.82 (30K reviews)',
      price: 1899,
      original: 2199,
      time: '2 hr',
      details: ['Global color', 'Hair spa'],
      image: '/images/haircolor.png',
    },
    {
      id: 'pkg10',
      title: 'Ultimate Makeover',
      rating: '4.99 (20K reviews)',
      price: 2999,
      original: 3499,
      time: '3 hr',
      details: ['Cut', 'Color', 'Spa', 'Styling'],
      image: '/images/Hair3.jpg',
    },
  ],
  'Blow-dry & style': [
    {
      id: 'bd1',
      title: 'Classic Blow-dry',
      rating: '4.80 (60K reviews)',
      price: 399,
      original: 499,
      time: '30 mins',
      details: ['Straight & smooth finish'],
      image: '/images/Hair6.jpg',
    },
    {
      id: 'bd2',
      title: 'Curls Blow-dry',
      rating: '4.85 (55K reviews)',
      price: 499,
      original: 599,
      time: '40 mins',
      details: ['In-curl/out-curl finish'],
      image: '/images/Hair7.jpg',
    },
    {
      id: 'bd3',
      title: 'Volume Blow-dry',
      rating: '4.78 (50K reviews)',
      price: 449,
      original: 549,
      time: '35 mins',
      details: ['Volume boost', 'Root lift'],
      image: '/images/Hair4.jpg',
    },
    {
      id: 'bd4',
      title: 'Express Blow-dry',
      rating: '4.70 (45K reviews)',
      price: 299,
      original: 399,
      time: '20 mins',
      details: ['Quick styling'],
      image: '/images/Hair5.jpg',
    },
    {
      id: 'bd5',
      title: 'Party Blow-dry',
      rating: '4.90 (40K reviews)',
      price: 599,
      original: 699,
      time: '50 mins',
      details: ['Party look', 'Long-lasting hold'],
      image: '/images/blowdry.png',
    },
    {
      id: 'bd6',
      title: 'Bridal Blow-dry',
      rating: '4.95 (35K reviews)',
      price: 799,
      original: 899,
      time: '1 hr',
      details: ['Bridal styling'],
      image: '/images/blowdry.png',
    },
    {
      id: 'bd7',
      title: 'Keratin Blow-dry',
      rating: '4.88 (30K reviews)',
      price: 699,
      original: 799,
      time: '1 hr',
      details: ['Keratin finish'],
      image: '/images/blowdry.png',
    },
    {
      id: 'bd8',
      title: 'Botox Blow-dry',
      rating: '4.85 (25K reviews)',
      price: 749,
      original: 849,
      time: '1 hr',
      details: ['Botox finish'],
      image: '/images/blowdry.png',
    },
    {
      id: 'bd9',
      title: 'Color Blow-dry',
      rating: '4.82 (20K reviews)',
      price: 649,
      original: 749,
      time: '1 hr',
      details: ['Color protection', 'Styling'],
      image: '/images/blowdry.png',
    },
    {
      id: 'bd10',
      title: 'Ultimate Blow-dry',
      rating: '4.99 (15K reviews)',
      price: 899,
      original: 999,
      time: '1 hr 15 mins',
      details: ['All-in-one finish'],
      image: '/images/blowdry.png',
    },
  ],
  // ...repeat for all other services with at least 10 packages each...
  // For brevity, only two are shown fully. You would add similar arrays for the rest.
};

export default function WomenSalon() {
  const [selectedService, setSelectedService] = useState(services[0].name);
  const [cart, setCart] = useState({}); // { [packageId]: { ...pkg, qty } }
  const navigate = useNavigate();

  // Get packages for selected service
  const packages = allPackages[selectedService] || [];

  // Add to cart and sync with localStorage
  const addToCart = (pkg) => {
    setCart((prev) => {
      const prevQty = prev[pkg.id]?.qty || 0;
      const newCart = {
        ...prev,
        [pkg.id]: { ...pkg, qty: prevQty + 1 },
      };
      localStorage.setItem('servicehub_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Remove from cart and sync with localStorage
  const removeFromCart = (pkgId) => {
    setCart((prev) => {
      if (!prev[pkgId]) return prev;
      const newQty = prev[pkgId].qty - 1;
      let newCart;
      if (newQty <= 0) {
        const { [pkgId]: _removed, ...rest } = prev;
        newCart = rest;
      } else {
        newCart = {
          ...prev,
          [pkgId]: { ...prev[pkgId], qty: newQty },
        };
      }
      localStorage.setItem('servicehub_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Calculate total
  const total = Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e6f2f1] via-[#5c7c89] to-[#1f4959] font-sans pb-16">
      <Navbar />
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#1f4959] mb-6 text-center mt-20">
        Hair Studio for Women
      </h1>
      <div className="flex gap-6 px-4 lg:px-10">
        {/* Sticky Left Sidebar: Select a Service */}
        <div className="hidden md:block w-1/4 sticky top-24 self-start border-2 border-[#5c7c89] rounded-xl p-4 shadow-sm bg-[#e6f2f1] h-fit">
          <h2 className="text-md font-semibold mb-4 text-[#1f4959]">Select a service</h2>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition rounded-lg p-2 border-2 border-[#5c7c89] bg-white hover:bg-[#5c7c89] hover:text-white ${selectedService === service.name ? 'ring-4 ring-[#5c7c89] ring-opacity-50' : ''}`}
                onClick={() => setSelectedService(service.name)}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-14 h-14 object-cover rounded mb-2 border border-[#5c7c89]"
                />
                <p className="text-xs font-medium">{service.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="w-full md:w-3/4 space-y-10">
          {/* Video Section */}
          <div className="rounded-xl overflow-hidden shadow-md bg-[#e6f2f1] p-4 border-2 border-[#5c7c89]">
            <video className="w-full rounded-xl" controls poster="/images/video-poster.png">
              <source src="/video/women-salon.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-[#1f4959] mb-1">
                SeviceHUb Company | Hair Studio at Home
              </h3>
              <p
                className="inline-block mt-2 px-4 py-2 text-white rounded-full text-sm"
                style={{ backgroundColor: brandColor }}
              >
                Starting @ ₹399 only
              </p>
            </div>
          </div>
          {/* Packages & Cart */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Packages */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-xl font-bold text-[#1f4959] mb-4">Packages</h2>
              {packages.length === 0 ? (
                <p className="text-[#5c7c89]">No packages available for this service.</p>
              ) : (
                packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-xl p-4 mb-6 shadow border border-[#5c7c89] flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-[#1f4959] mb-1">{pkg.title}</h3>
                      <p className="text-sm text-[#5c7c89] mb-1">⭐ {pkg.rating}</p>
                      <p className="text-sm font-semibold">
                        <span className="text-black">₹{pkg.price}</span>{' '}
                        <span className="line-through text-gray-400 text-sm">₹{pkg.original}</span> • {pkg.time}
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-[#333]">
                        {pkg.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                      <div className="mt-3 flex gap-2 items-center">
                        <button
                          className="px-4 py-2 bg-[#5c7c89] text-white rounded-lg hover:bg-[#1f4959]"
                          onClick={() => addToCart(pkg)}
                        >
                          Add to Cart
                        </button>
                        {cart[pkg.id] && (
                          <span className="ml-2 text-[#1f4959] font-semibold">Qty: {cart[pkg.id].qty}</span>
                        )}
                      </div>
                    </div>
                    <img src={pkg.image} alt={pkg.title} className="w-28 h-28 rounded-lg object-cover" />
                  </div>
                ))
              )}
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
                      <div key={item.id} className="mb-2 bg-[#e6f2f1] rounded p-3 text-[#1f4959]">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-[#5c7c89] mb-1">₹{item.price} × {item.qty}</p>
                          </div>
                          <img src={item.image} alt={item.title} className="w-12 h-12 rounded object-cover" />
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                          <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 border border-[#5c7c89] rounded hover:bg-[#5c7c89] hover:text-white">-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => addToCart(item)} className="px-2 py-1 border border-[#5c7c89] rounded hover:bg-[#5c7c89] hover:text-white">+</button>
                        </div>
                      </div>
                    ))}
                    <div className="text-right mt-4">
                      <p className="text-[#1f4959] font-bold">Total: ₹{total}</p>
                      <button 
                        className="mt-3 px-4 py-2 bg-[#5c7c89] text-white rounded w-full font-semibold hover:bg-[#1f4959]"
                        onClick={() => navigate('/Checkout')}
                      >
                        View Cart
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
