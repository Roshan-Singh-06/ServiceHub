import React from 'react';

const ReadyToBook = () => {
  return (
    <section className="bg-gradient-to-r from-[#1f4959] via-[#5c7c89] to-[#1f4959] text-white py-20 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">Ready to Book with ServiceHub?</h2>
        <p className="text-lg mb-8">
          Join thousands of satisfied users and experience expert services right at your doorstep with ServiceHub.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-[#1f4959] font-semibold py-3 px-6 rounded-md hover:bg-[#e6f0f3] transition duration-300">
            Explore Services
          </button>
          <button className="bg-[#5c7c89] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#4e6a78] transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReadyToBook;
