import React from 'react';

const ServiceCard = ({ title, description, price, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs w-full cursor-pointer mx-auto sm:mx-0">
      <img src={image} alt={title} className="h-40 sm:h-48 md:h-56 w-full object-cover" />
      <div className="p-3 sm:p-4 md:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">{description}</p>
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm md:text-base text-slate-700 font-medium">Starting from ₹{price}</span>
          <span className="text-slate-600 text-lg">→</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

