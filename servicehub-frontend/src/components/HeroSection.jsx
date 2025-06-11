import { Typewriter } from 'react-simple-typewriter';

export default function HeroSection() {
  const tags = [
    { icon: "💇‍♀️", label: "Women's Salon" },
    { icon: "🔧", label: "Home Repairs" },
    { icon: "🧖‍♀️", label: "Spa Services" },
    { icon: "⚡", label: "Electrical" },
  ];

  const descriptions = [
    "From beauty treatments to home repairs,",
    "Find trusted professionals for all your service needs.",
    "Quality guaranteed, convenience delivered.",
  ];

  const servicePlaceholders = [
    "Search for Women's Salon",
    "Search for Home Repairs",
    "Search for Spa Services",
    "Search for Electrical",
  ];

  return (
    <section className="bg-gradient-to-b from-[#1f4959] to-[#5c7c89] text-white min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-10 sm:py-16 md:py-24">
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 text-white">Professional Services</h1>
      <h2 className="text-xl sm:text-4xl font-bold text-[#b0c4ce] mb-6">At Your Doorstep</h2>

      {/* Typewriter description using react-simple-typewriter */}
      <div className="min-h-[32px] mb-8 max-w-2xl text-base sm:text-lg text-gray-100">
        <Typewriter
          words={descriptions}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </div>

      {/* Search bar with animated placeholder */}
      <div className="relative flex items-center bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-xs sm:max-w-md mb-6">
        <input
          type="text"
          value=""
          readOnly
          placeholder=" "
          className="w-full px-4 py-2 text-gray-700 focus:outline-none placeholder-opacity-100 placeholder:text-gray-700 text-sm sm:text-base"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none text-sm sm:text-base">
          <Typewriter
            words={servicePlaceholders}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </div>
        <button className="bg-[#5c7c89] text-white px-4 py-2 hover:bg-[#4e6a78] z-10">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center space-x-1 bg-[#5c7c89] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white hover:bg-[#4e6a78] text-xs sm:text-sm md:text-base"
          >
            <span>{tag.icon}</span>
            <span>{tag.label}</span>
          </span>
        ))}
      </div>
        
    </section>
  
  );
}
