import React from "react";

const Loader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1f4959]/80 via-[#5c7c89]/80 to-[#e6f2f1]/80 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg
          aria-hidden="true"
          className="w-20 h-20 animate-spin text-[#e6f2f1] fill-[#5c7c89] drop-shadow-xl"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" stroke="#e6f2f1" strokeWidth="10" fill="none" />
          <path
            d="M50 5a45 45 0 1 1-31.82 76.82"
            stroke="#1f4959"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#1f4959] font-bold text-lg tracking-wide animate-pulse">
          Loading ServiceHub...
        </span>
      </div>
      <div className="flex gap-3 mt-2">
        <span className="bg-[#5c7c89] text-white px-4 py-2 rounded-full text-sm font-semibold shadow">Trusted Professionals</span>
        <span className="bg-[#e6f2f1] text-[#1f4959] px-4 py-2 rounded-full text-sm font-semibold shadow">At Your Doorstep</span>
      </div>
    </div>
  </div>
);

export default Loader;
