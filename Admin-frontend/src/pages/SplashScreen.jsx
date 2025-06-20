import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="relative z-10 text-center px-4">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="mb-6 relative"
        >
          {/* Custom Light Bulb Logo */}
          <svg
            className="w-32 h-32 mx-auto"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Glow Effect */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className="opacity-20"
              fill="url(#glowGradient)"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Bulb Outline */}
            <motion.path
              d="M50 15C35 15 25 25 25 40C25 48 30 53 35 58C40 63 40 65 40 70V75H60V70C60 65 60 63 65 58C70 53 75 48 75 40C75 25 65 15 50 15Z"
              stroke="white"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Bulb Base */}
            <motion.path
              d="M40 75H60V78H40V75ZM42 80H58V83H42V80Z"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />

            {/* Inner Lines */}
            <motion.g
              stroke="white"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <path d="M50 25V45M45 35H55M42 50H58" />
            </motion.g>

            {/* Gradient Definition */}
            <defs>
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Text Container */}
        <div className="space-y-2">
          {/* VOLT Text */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl font-bold tracking-wider text-white"
          >
            E-mandi
          </motion.h1>

          {/* VISION Text */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl font-light tracking-[0.3em] text-gray-400"
          >
            A NEW VISION
          </motion.h2>

          {/* Animated Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="h-0.5 bg-white/30 w-48 mx-auto"
          />
        </div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex justify-center space-x-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
          ))}
        </motion.div>

        {/* Subtle Corner Decorations */}
        {[
          "top-0 left-0 origin-top-left",
          "top-0 right-0 origin-top-right",
          "bottom-0 left-0 origin-bottom-left",
          "bottom-0 right-0 origin-bottom-right",
        ].map((position, i) => (
          <motion.div
            key={i}
            className={`absolute ${position} w-16 h-16 border-white/10`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
          >
            <div className="w-full h-full border-t border-l border-white/10" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
