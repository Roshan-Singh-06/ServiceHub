import React from 'react';

const stats = [
  { number: '50,000+', label: 'Happy Customers' },
  { number: '2,500+', label: 'Verified Professionals' },
  { number: '100,000+', label: 'Services Completed' },
];

const StatsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#0c1f27] to-[#1f4959] py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
        {stats.map((item, index) => (
          <div key={index}>
            <h3 className="text-3xl font-bold">{item.number}</h3>
            <p className="text-gray-300 mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBanner;
