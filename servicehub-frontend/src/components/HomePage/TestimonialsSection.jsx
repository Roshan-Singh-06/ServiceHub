import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    service: "Beauty Service",
    text: "Amazing service! The salon professional was punctual and did an excellent job. Will definitely book again.",
    image: "/images/pro1.png", // Replace with actual image path
  },
  {
    name: "Rakesh Verma",
    service: "AC Repair",
    text: "Quick and professional AC repair service. The technician was knowledgeable and fixed the issue immediately.",
    image: "/images/pro2.png",
  },
  {
    name: "Meena Iyer",
    service: "Painting Service",
    text: "Excellent painting service. The team was professional, clean, and the results exceeded my expectations.",
    image: "/images/pro3.png",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1f4959]">What Our Customers Say</h2>
        <p className="text-gray-600 mt-2">Real feedback from our satisfied customers</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-[#f9f9f9] p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex gap-1 text-yellow-400 mb-4">
              {Array(5).fill().map((_, i) => (
                <Star key={i} fill="currentColor" size={20} />
              ))}
            </div>
            <p className="text-gray-800 mb-6">"{item.text}"</p>
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover bg-gray-200"
              />
              <div>
                <p className="font-semibold text-[#1f4959]">{item.name}</p>
                <p className="text-sm text-gray-500">{item.service}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
