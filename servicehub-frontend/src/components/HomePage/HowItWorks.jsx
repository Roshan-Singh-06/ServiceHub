import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Browse Services',
      description: 'Explore a variety of home and office services offered by trusted professionals on ServiceHub.',
    },
    {
      title: 'Book Instantly',
      description: 'Choose a time slot that works for you and book with just a few clicks—no waiting!',
    },
    {
      title: 'Get It Done',
      description: 'Our verified expert will arrive on time and complete the service to your satisfaction.',
    },
  ];

  return (
    <div id="how-it-works" className="bg-[#f9fbfc] py-16 px-4 md:px-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1f4959] mb-2">How It Works</h2>
      <p className="text-gray-600 mb-12">Get your service done in 3 easy steps</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-t-4 border-[#1f4959]"
          >
            <h3 className="text-lg md:text-xl font-semibold text-[#1f4959] mb-2">
              {index + 1}. {step.title}
            </h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
