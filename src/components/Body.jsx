import React from "react";
import { motion } from "framer-motion";

const suggestions = [
  { title: "Ride", 
    description: "Go anywhere with Drift. Request a ride and go.", 
    img: "./ride.png", },
  {
    title: "Reserve",
    description: "Plan ahead and reserve your Drift before the day arrives.",
    img: "./reserve.png",
  },
  {
    title: "Intercity",
    description: "Get affordable outstation rides anytime — right from your door.",
    img: "./intercity.png",
  },
  {
    title: "Shuttle",
    description: "Lower-cost shared rides on comfortable, professional vehicles.",
    img: "./shuttle.png",
  },
  {
    title: "Courier",
    description: "Drift delivers your items across town — fast, safe, and reliable.",
    img: "./Courier.png",
  },
  {
    title: "Rentals",
    description: "Rent Drift vehicles for hours and make unlimited stops easily.",
    img: "./rental.png",
  },
];

const Body = () => {
  return (
    <>
      {/* --- Hero Section --- */}
      <div className="bg-gradient-to-br from-[#020617] via-[#030c1a] to-[#001B2E] text-white font-sans py-24 sm:py-32  relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.08),transparent_70%)]"></div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* Text Section */}
          <motion.section
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Move the future with Drift
            </h2>
            <p className="mt-8 text-2xl font-medium text-gray-300">
              Fast. Smart. Connected. Your destination is just a Drift away.
            </p>
            <p className="mt-4 text-lg text-gray-400">
              Drift makes travel seamless — from city rides to intercity journeys — powered by technology and trust.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-full text-xl font-semibold hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition"
            >
              Launch Drift
            </motion.button>
          </motion.section>

          {/* Image Section */}
          <motion.section
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src="./body.png"
              alt="Drift App Interface"
              className="w-full max-w-md rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.2)]"
            />
          </motion.section>
        </div>
      </div>

      {/* --- Suggestions Section --- */}
      <div className="bg-[#030712] py-20 px-6 lg:px-12">
        <h3 className="text-4xl font-bold text-white mb-16 text-center">
          Explore Drift Services
        </h3>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {suggestions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: index * 0.1 },
                y: {
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              }}
              className="bg-gradient-to-b from-[#0A0F1C] to-[#0D1525] border border-[#112b4a] rounded-3xl shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition transform hover:-translate-y-1 p-8 flex flex-col items-center text-center"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-36 h-36 object-contain mb-6"
              />
              <h4 className="text-2xl font-semibold text-cyan-400 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-400 mb-6">{item.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="mt-auto px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-full font-semibold hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition"
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Body;
