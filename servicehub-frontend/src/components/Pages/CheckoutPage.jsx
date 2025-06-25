import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaPhone, FaTag } from 'react-icons/fa';
import Navbar from '../Navbar';
import { createBooking } from '../../services/bookingApi';

// Helper to get cart from localStorage (set in WomenSalon page)
function getCartFromStorage() {
  try {
    const cart = JSON.parse(localStorage.getItem('servicehub_cart'));
    return cart && typeof cart === 'object' ? cart : {};
  } catch {
    return {};
  }
}

export default function CheckoutPage() {
  const location = useLocation();
  const checkoutItem = location.state?.checkoutItem;

  // Cart state (from localStorage)
  const [cart, setCart] = useState(getCartFromStorage());

  // Always sync cart state with localStorage on mount (for multi-item checkout)
  useEffect(() => {
    setCart(getCartFromStorage());
  }, []);

  // Booking details state
  const [userDetails, setUserDetails] = useState({ name: '', phone: '', });
  const [address, setAddress] = useState('');
  const [slot, setSlot] = useState('');
  const [payment, setPayment] = useState('cod');

  // Handle input changes
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Handle address and slot
  const handleAddress = (e) => setAddress(e.target.value);
  const handleSlot = (e) => setSlot(e.target.value);

  // Handle payment
  const handlePayment = (e) => setPayment(e.target.value);

  // Cart items as array
  let cartItems;
  let total;
  if (checkoutItem) {
    cartItems = [{ ...checkoutItem }];
    total = checkoutItem.price * (checkoutItem.qty || 1);
  } else {
    cartItems = Object.values(cart);
    total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  // Fallback: If no cartItems and no checkoutItem, try to get last single item from localStorage
  if ((!cartItems || cartItems.length === 0) && !checkoutItem) {
    const lastSingle = JSON.parse(localStorage.getItem('servicehub_last_checkout_item'));
    if (lastSingle) {
      cartItems = [lastSingle];
      total = lastSingle.price * (lastSingle.qty || 1);
    }
  }

  // Quantity controls
  const updateQty = (id, delta) => {
    if (checkoutItem) return; // Disable for single-item checkout
    setCart((prev) => {
      const newCart = { ...prev };
      if (!newCart[id]) return prev;
      newCart[id].qty += delta;
      if (newCart[id].qty <= 0) delete newCart[id];
      localStorage.setItem('servicehub_cart', JSON.stringify(newCart));
      return { ...newCart };
    });
  };

  // Confirm booking (save to backend)
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!userDetails.name || !userDetails.phone || !address || !slot || cartItems.length === 0) {
      alert('Please fill all details and add at least one item to cart.');
      return;
    }
    try {
      const bookingData = {
        name: userDetails.name,
        phone: userDetails.phone,
        address,
        slot,
        payment,
        items: cartItems.map(item => ({
          itemId: item.itemId || item._id || item.id || item.name,
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.image,
          time: item.time,
          desc: item.desc
        })),
        total
      };
      await createBooking(bookingData);
      alert('Booking confirmed and saved!');
      // Optionally clear cart
      if (!checkoutItem) {
        localStorage.removeItem('servicehub_cart');
        setCart({});
      }
    } catch {
      alert('Failed to save booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f2f1] via-[#5c7c89] to-[#1f4959] font-sans text-[#1f4959] pb-10">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center  text-black drop-shadow-lg tracking-tight uppercase">Checkout</h1>
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-12" onSubmit={handleBooking}>
          {/* Left - Booking Info */}
          <div className="bg-white/95 rounded-3xl p-10 shadow-2xl border-2 border-[#5c7c89] flex flex-col gap-8">
            <div>
              <label className="block font-bold mb-1">Your Name</label>
              <input name="name" value={userDetails.name} onChange={handleChange} required className="w-full border rounded px-3 py-2 mb-4" placeholder="Enter your name" />
              <label className="block font-bold mb-1">Phone Number</label>
              <input name="phone" value={userDetails.phone} onChange={handleChange} required className="w-full border rounded px-3 py-2 mb-4" placeholder="Enter your phone" />
              <label className="block font-bold mb-1">Address</label>
              <textarea value={address} onChange={handleAddress} required className="w-full border rounded px-3 py-2 mb-4" placeholder="Enter your address" />
              <label className="block font-bold mb-1">Preferred Slot (Date & Time)</label>
              <input type="datetime-local" value={slot} onChange={handleSlot} required className="w-full border rounded px-3 py-2 mb-4" />
            </div>
            <div>
              <label className="block font-bold mb-1">Payment Method</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={handlePayment} /> Cash on Delivery
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" value="upi" checked={payment === 'upi'} onChange={handlePayment} /> UPI
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="payment" value="gpay" checked={payment === 'gpay'} onChange={handlePayment} /> GPay
                </label>
              </div>
            </div>
            <div className="opacity-80">
              <h2 className="text-lg font-bold mb-1">Cancellation Policy</h2>
              <p className="text-sm text-gray-700">
                Free cancellations if done more than 12 hrs before the service or if a professional isn’t assigned.
                A fee will be charged otherwise.{' '}
                <a href="#" className="text-blue-600 underline">Read full policy</a>
              </p>
            </div>
          </div>
          {/* Right - Order Summary */}
          <div className="bg-white/95 rounded-3xl p-10 shadow-2xl border-2 border-[#1f4959] sticky top-10 flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-[#1f4959] mb-4 text-center tracking-tight uppercase">Order Summary</h2>
            {cartItems.length === 0 ? (
              <div className="text-center text-[#5c7c89] font-semibold">No items in cart.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id || item.itemId || item.id} className="mb-4 bg-[#e6f2f1] rounded-xl p-5 shadow flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image && item.image.trim() !== '' ? item.image : '/images/default-service.png'}
                        alt={item.name || item.title}
                        className="w-16 h-16 rounded object-cover border"
                        onError={e => { e.target.onerror = null; e.target.src = "/images/default-service.png"; }}
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{item.name || item.title}</h3>
                        {/* Only show details list if not single-item checkout */}
                        {!checkoutItem && item.details && (
                          <ul className="text-sm text-gray-700 list-disc pl-5">
                            {item.details.map((d, i) => <li key={i}>{d} x{item.qty}</li>)}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" className="bg-purple-100 px-2 rounded hover:bg-[#d1c4e9]" onClick={() => updateQty(item._id || item.itemId || item.id, -1)} disabled={!!checkoutItem}>-</button>
                        <span className="font-semibold">{item.qty}</span>
                        <button type="button" className="bg-purple-100 px-2 rounded hover:bg-[#d1c4e9]" onClick={() => updateQty(item._id || item.itemId || item.id, 1)} disabled={!!checkoutItem}>+</button>
                      </div>
                      <p className="mt-1 text-base font-bold text-[#1f4959]">₹{item.price * item.qty} {item.original && <span className="line-through text-gray-400 text-sm">₹{item.original * item.qty}</span>}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="border-t pt-4">
              <h3 className="text-xl font-bold text-[#1f4959] mb-2">Payment Summary</h3>
              <div className="flex justify-between text-base mt-2">
                <p>Amount to pay</p>
                <p className="font-bold">₹{total}</p>
              </div>
              <button type="submit" className="mt-6 w-full bg-[#1f4959] text-white font-bold py-3 rounded-xl text-lg shadow-lg hover:bg-[#179f7e] transition-all duration-200">
                Confirm Booking
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
