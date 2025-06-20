import React from 'react';

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1f4959] via-[#5c7c89] to-[#e6f2f1] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-3xl bg-white/90 rounded-2xl shadow-xl p-8 border-4 border-[#5c7c89]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1f4959] mb-4 text-center">About ServiceHub</h1>
        <p className="text-lg md:text-xl text-[#1f4959] mb-6 text-center">
          ServiceHub is your one-stop solution for all home and personal services. We connect you with trusted professionals for beauty, repair, cleaning, appliance maintenance, and more—right at your doorstep.
        </p>
        <ul className="list-disc list-inside text-[#5c7c89] text-base md:text-lg mb-6">
          <li>Verified and skilled professionals</li>
          <li>Easy online booking and transparent pricing</li>
          <li>Wide range of services: Salon, Spa, Cleaning, Repairs, and more</li>
          <li>Customer satisfaction and safety guaranteed</li>
        </ul>
        <p className="text-base text-[#1f4959] text-center">
          Our mission is to make your life easier by bringing essential services to your home, with quality and trust you can rely on. Experience convenience, reliability, and excellence with ServiceHub.
        </p>
      </div>
    </section>
  );
}
