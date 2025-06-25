import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { getUserBookings } from '../../services/userBookingApi';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getUserBookings()
      .then(res => {
        setBookings(res.data.bookings || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch bookings.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f2f1] via-[#5c7c89] to-[#1f4959] font-sans pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-14 p-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-black drop-shadow-lg tracking-tight uppercase">My Bookings</h1>
        {loading ? (
          <div className="text-center text-[#5c7c89] text-lg">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-[#5c7c89] text-lg">No bookings found.</div>
        ) : (
          <div className="space-y-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white/95 rounded-3xl shadow-xl border-2 border-[#5c7c89] p-6 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1f4959]">{booking.name}</h2>
                    <p className="text-[#5c7c89] text-sm">Phone: {booking.phone}</p>
                    <p className="text-[#5c7c89] text-sm">Address: {booking.address}</p>
                    <p className="text-[#5c7c89] text-sm">Slot: {new Date(booking.slot).toLocaleString()}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-semibold text-sm text-center ${statusColors[booking.status] || 'bg-gray-200 text-gray-800'}`}>{booking.status}</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm mt-2">
                    <thead>
                      <tr className="bg-[#e6f2f1] text-[#1f4959]">
                        <th className="px-3 py-2 text-left">Service</th>
                        <th className="px-3 py-2 text-left">Qty</th>
                        <th className="px-3 py-2 text-left">Price</th>
                        <th className="px-3 py-2 text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {booking.items.map((item, i) => (
                        <tr key={i} className="border-b border-[#5c7c89]/20">
                          <td className="px-3 py-2 flex items-center gap-2">
                            <img src={item.image || '/images/default-service.png'} alt={item.name} className="w-10 h-10 rounded object-cover border" onError={e => { e.target.onerror = null; e.target.src = '/images/default-service.png'; }} />
                            <span>{item.name}</span>
                          </td>
                          <td className="px-3 py-2">{item.qty}</td>
                          <td className="px-3 py-2">₹{item.price}</td>
                          <td className="px-3 py-2 font-semibold">₹{item.price * item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-[#1f4959]">Total: ₹{booking.total}</span>
                  <span className="text-xs text-[#5c7c89]">Booked on {new Date(booking.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
