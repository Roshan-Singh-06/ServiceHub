// src/components/Services.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import { getServices } from '../../services/api';

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await getServices();
        setServices(data.data || []);
      } catch (error) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg text-gray-500">Loading services...</div>;
  }

  return (
    <section id="services" className="bg-gray-50 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Our Services</h2>
        <p className="text-slate-600 mt-2">Choose from our wide range of professional services</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {services.length === 0 ? (
          <div className="text-gray-500 text-lg">No services available.</div>
        ) : (
          services.map((service, index) => (
            <div
              key={service._id || index}
              onClick={() => {
                if (service.serviceName === 'Plumbing Services') navigate('/plumber');
              }}
              style={{ cursor: service.serviceName === 'Plumbing Services' ? 'pointer' : 'default' }}
            >
              <ServiceCard
                title={service.serviceName}
                description={service.description}
                price={service.price}
                image={service.image}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Services;
