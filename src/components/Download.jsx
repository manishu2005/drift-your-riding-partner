import React from "react";
import { motion } from "framer-motion";

const Download = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#020617] via-[#030c1a] to-[#001B2E] text-white py-24 px-6 font-sans overflow-hidden">
      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(0,255,255,0.1),transparent_70%)]"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative text-5xl md:text-6xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        Download Drift Apps
      </motion.h2>

      {/* App Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
        {/* Drift App */}
        <div className="flex flex-col items-center text-center bg-[#0A0F1C] rounded-3xl border border-[#123A5B] p-10 hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition">
          <img
            src="./Driftlogo.png"
            alt="Drift App Logo"
            className="w-44 h-44 object-contain mb-6"
          />
          <p className="text-2xl font-semibold text-cyan-400 mb-2">
            Drift: Auto & Cabs
          </p>
          <p className="text-gray-400 text-sm max-w-xs">
            The fastest way to move. Book your Drift rides instantly.
          </p>
        </div>

        {/* Drift Captain App */}
        <div className="flex flex-col items-center text-center bg-[#0A0F1C] rounded-3xl border border-[#123A5B] p-10 hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition">
          <img
            src="./driftcaptain.logo.png"
            alt="Drift Captain Logo"
            className="w-44 h-44 object-contain mb-6"
          />
          <p className="text-2xl font-semibold text-cyan-400 mb-2">
            Drift Captain: Drive & Earn
          </p>
          <p className="text-gray-400 text-sm max-w-xs">
            Drive with Drift. Earn more. Control your schedule.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative mt-20 flex flex-col md:flex-row justify-center items-center gap-8">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          href="#"
          className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-full font-semibold text-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition"
        >
          Download Drift
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          href="#"
          className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-full font-semibold text-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition"
        >
          Download Drift Captain
        </motion.a>
      </div>
    </div>
  );
};

export default Download;
