import React from 'react';
import { FaWrench, FaPaintRoller, FaLock, FaTools, FaMale, FaFemale, FaWater, FaBug, FaFan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const services = [
  { icon: <FaFemale />, label: "Women's Salon & Spa" },
  { icon: <FaMale />, label: "Men's Salon & Massage" },
  { icon: <FaFan />, label: "AC & Appliance Repair" },
  { icon: <FaBug />, label: "Cleaning & Pest Control" },
  { icon: <FaTools />, label: "Electrician, Plumber & Carpenter" },
  { icon: <FaWater />, label: "Native Water Purifier" },
  { icon: <FaLock />, label: "Native Smart Locks" },
  { icon: <FaPaintRoller />, label: "Walls & Rooms Painting" },
  { icon: <FaWrench />, label: "Wall Panels" }
];

export default function ServiceHubHome() {
  // Images from public/images folder
  const img1 = '/images/img1.jpg';
  const img2 = '/images/img2.jpg';
  const img3 = '/images/img3.jpg';
  const img4 = '/images/img4.jpg';

  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1f4959] via-[#5c7c89] to-[#e6f2f1] py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left - Services Grid */}
        <div className="lg:w-1/2 w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
            Home Services at Your Doorstep
          </h1>
          <p className="text-lg md:text-xl text-[#e6f2f1] mb-8">
            Book trusted professionals for beauty, repair, cleaning, and more—right from your home.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-5 bg-white/90 rounded-2xl border border-[#5c7c89] hover:bg-[#5c7c89] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer group"
                onClick={() => {
                  if (service.label === "Women's Salon & Spa") {
                    navigate('/WomenSalon');
                  }
                }}
              >
                <div className="text-3xl mb-2 group-hover:text-white text-[#1f4959]">{service.icon}</div>
                <p className="text-center text-sm font-semibold group-hover:text-white text-[#1f4959]">{service.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - L-shaped Images in a Square Card */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="bg-white/90 rounded-2xl border-4 border-[#5c7c89] shadow-xl p-6 w-[600px] h-[600px] grid grid-cols-3 grid-rows-3 gap-4">
            {/* Large vertical image (L shape) */}
            <img
              src={img1}
              alt="Salon Service"
              className="rounded-xl object-cover w-full h-full row-span-3 col-span-2"
            />
            {/* Top right */}
            <img
              src={img2}
              alt="Massage"
              className="rounded-xl object-cover w-full h-full row-span-1 col-start-3"
            />
            {/* Middle right */}
            <img
              src={img3}
              alt="Technician 1"
              className="rounded-xl object-cover w-full h-full row-span-1 col-start-3 row-start-2"
            />
            {/* Bottom right */}
            <img
              src={img4}
              alt="Technician 2"
              className="rounded-xl object-cover w-full h-full row-span-1 col-start-3 row-start-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}