import React from 'react';

const professionals = [
  {
    name: 'Aarav Sharma',
    role: 'Electrician',
    experience: '5+ years experience',
    rating: 4.9,
    reviews: 124,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Priya Verma',
    role: 'Salon Expert',
    experience: '6+ years experience',
    rating: 4.8,
    reviews: 98,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Raj Mehta',
    role: 'Plumber',
    experience: '7+ years experience',
    rating: 4.7,
    reviews: 76,
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    name: 'Sneha Kapoor',
    role: 'Cleaning Specialist',
    experience: '4+ years experience',
    rating: 4.9,
    reviews: 112,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const FeaturedProfessionals = () => {
  return (
    <section className="bg-[#f9fbfc] py-16 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1f4959] mb-2">
        Featured Professionals
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Meet our top-rated service providers
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {professionals.map((pro, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={pro.image}
              alt={pro.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-[#1f4959]">{pro.name}</h3>
            <p className="text-sm text-gray-500">{pro.role}</p>
            <div className="flex items-center justify-center mt-2 mb-1 text-yellow-500">
              {'★'.repeat(Math.floor(pro.rating)) + (pro.rating % 1 >= 0.5 ? '½' : '')}
              <span className="text-gray-600 ml-2 text-sm">
                {pro.rating} ({pro.reviews} reviews)
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{pro.experience}</p>
            <button className="bg-[#1f4959] hover:bg-[#173946] text-white text-sm py-2 px-4 rounded-md transition-all">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
