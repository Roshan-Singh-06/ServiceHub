// src/components/Services.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: "Plumbing Services",
    description: "Pipe repairs, fixture installation, leak fixes, and drainage...",
    price: 299,
    image: "/images/plumber.jpg",
  },
  {
    title: "Painting Services",
    description: "Interior, exterior painting, wall texturing, and color...",
    price: 299,
    image: "/images/painter.jpg",
  },
  {
    title: "Cleaning Services",
    description: "Deep cleaning, housekeeping, carpet, and sofa...",
    price: 299,
    image: "/images/electric.jpg",
  },
  {
    title: "Appliance Repair",
    description: "Washing machine, refrigerator, microwave repair...",
    price: 299,
    image: "/images/cooking.jpg",
  },
  {
    title: "Women's Salon & Spa",
    description: "Haircuts, facials, manicures, pedicures, spa...",
    price: 299,
    image: "/images/womenspa.jpg",
  },
  {
    title: "Men's Salon & Spa",
    description: "Haircuts, beard styling, massages, grooming...",
    price: 299,
    image: "/images/menspa.jpg",
  },
  {
    title: "AC Repair & Service",
    description: "Installation, repair, maintenance of ACs...",
    price: 299,
    image: "/images/men.jpg",
  },
  {
    title: "Electrical Services",
    description: "Wiring, switch installation, electrical repairs...",
    price: 299,
    image: "/images/electric2.jpg",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="bg-gray-50 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Our Services</h2>
        <p className="text-slate-600 mt-2">Choose from our wide range of professional services</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => {
              if (service.title === 'Plumbing Services') navigate('/plumber');
            }}
            style={{ cursor: service.title === 'Plumbing Services' ? 'pointer' : 'default' }}
          >
            <ServiceCard
              title={service.title}
              description={service.description}
              price={service.price}
              image={service.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
