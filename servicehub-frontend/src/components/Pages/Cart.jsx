import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { saveCart, getCart, clearCart as clearCartApi, removeCartItem } from '../../services/cartApi';


const borderColor = "#5c7c89";
const bgColor = "#e6f2f1";
const textColor = "#1f4959";

// Always use backend _id or itemId as the canonical key
const getItemKey = (item) => item._id || item.itemId;

export default function Cart() {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  // Load cart from backend on mount
  useEffect(() => {
    getCart().then(res => {
      if (res.data && res.data.cart && res.data.cart.items) {
        // Convert array to object for local state, always use backend id
        const obj = {};
        res.data.cart.items.forEach(item => {
          const key = item._id || item.itemId;
          if (key) obj[key] = { ...item, _id: item._id || item.itemId, itemId: item._id || item.itemId };
        });
        setCart(obj);
      }
    });
  }, []);

  // Save cart to localStorage on change (use the same key as CheckoutPage)
  useEffect(() => {
    localStorage.setItem("servicehub_cart", JSON.stringify(cart));
  }, [cart]);

  // Save cart to backend on change
  useEffect(() => {
    const items = Object.values(cart).map(item => ({
      itemId: item._id || item.itemId, // always send backend id
      name: item.name,
      price: item.price,
      qty: item.qty,
      image: item.image,
      time: item.time,
      desc: item.desc
    }));
    if (items.length > 0) saveCart(items);
  }, [cart]);

  // Add/Remove logic
  const addToCart = (item) => {
    const key = item._id || item.itemId;
    if (!key) {
      alert('Cannot add item without backend id.');
      return;
    }
    setCart((prev) => {
      const existing = prev[key];
      return {
        ...prev,
        [key]: existing
          ? { ...existing, qty: existing.qty + 1 }
          : { ...item, qty: 1, _id: key, itemId: key },
      };
    });
  };

  const removeFromCart = (item) => {
    const key = item._id || item.itemId;
    setCart((prev) => {
      const existing = prev[key];
      if (!existing) return prev;
      if (existing.qty <= 1) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }
      return {
        ...prev,
        [key]: { ...existing, qty: existing.qty - 1 },
      };
    });
  };

  const clearCart = () => {
    setCart({});
    clearCartApi();
    localStorage.removeItem("servicehub_cart");
  };

  const removeItemCompletely = async (item) => {
    const key = item._id || item.itemId;
    const itemId = item._id || item.itemId;
    // Remove from backend first, then update local state if successful
    if (itemId) {
      try {
        const res = await removeCartItem(itemId);
        if (res.data && res.data.success) {
          setCart((prev) => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
          });
        } else {
          alert('Failed to remove item from cart.');
        }
      } catch (err) {
        alert('Error removing item from cart.');
      }
    } else {
      console.warn('No itemId found for item removal:', item);
    }
  };

  const total = Object.values(cart).reduce(
    (sum, item) => sum + (item.price * item.qty),
    0
  );

  // Helper to check login
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <div className="min-h-screen pb-16" style={{ background: `linear-gradient(to right, ${bgColor}, ${borderColor}, ${textColor})` }}>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-24 bg-white rounded-xl shadow-lg border-2" style={{ borderColor, color: textColor }}>
        <h1 className="text-3xl font-extrabold text-center py-6" style={{ color: textColor }}>
          Your Cart
        </h1>
        {Object.keys(cart).length === 0 ? (
          <p className="text-center text-lg text-[#5c7c89] py-10">No items in your cart.</p>
        ) : (
          <div className="p-6">
            <div className="flex flex-col gap-6">
              {Object.values(cart).map((item) => (
                <div
                  key={getItemKey(item)}
                  className="flex items-center justify-between bg-[#e6f2f1] rounded-lg p-4 border border-[#5c7c89] shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image && item.image.trim() !== '' ? item.image : '/images/default-service.png'}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover border"
                      onError={e => { e.target.src = "/images/default-service.png"; }}
                    />
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm text-[#5c7c89] mb-1">₹{item.price} × {item.qty}</p>
                      <p className="text-xs text-[#5c7c89]">{item.time}</p>
                      <p className="text-xs text-[#5c7c89]">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="px-2 py-1 border border-[#5c7c89] rounded hover:bg-[#5c7c89] hover:text-white"
                      >-</button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="px-2 py-1 border border-[#5c7c89] rounded hover:bg-[#5c7c89] hover:text-white"
                      >+</button>
                    </div>
                    <button
                      onClick={() => removeItemCompletely(item)}
                      className="mt-1 px-3 py-1 bg-red-500 text-white rounded font-semibold hover:bg-red-700 text-xs"
                    >Remove</button>
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          navigate('/login');
                        } else {
                          localStorage.setItem('servicehub_last_checkout_item', JSON.stringify(item));
                          navigate('/Checkout', { state: { checkoutItem: item } });
                        }
                      }}
                      className="mt-1 px-3 py-1 bg-[#5c7c89] text-white rounded font-semibold hover:bg-[#1f4959] text-xs"
                    >Go to Checkout</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <p className="text-xl font-bold" style={{ color: textColor }}>
                Total: ₹{total}
              </p>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-[#5c7c89] text-white rounded font-semibold hover:bg-[#1f4959]"
                  onClick={() => {
                    if (!isLoggedIn) {
                      navigate('/login');
                    } else {
                      navigate('/Checkout');
                    }
                  }}
                >
                  Proceed to Checkout
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 text-[#5c7c89] rounded font-semibold hover:bg-gray-300"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}