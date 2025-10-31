import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Ridepage = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const nav = useNavigate();

  const handleSeePrices = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!pickup || !destination) {
      alert("Please enter both pickup and destination locations!");
      return;
    }

    // Save ride info so UserDashboard can use it
    localStorage.setItem("rideData", JSON.stringify({ pickup, destination }));

    if (user?.role === "user") {
      nav("/userdashboard");
    } else if (user?.role === "captain") {
      nav("/captaindashboard");
    } else {
      alert("Unauthorized access.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Main Section */}
      <main className="grid lg:grid-cols-2 gap-12 px-6 md:px-16 py-20 items-center">
        {/* Left Section */}
        <section>
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-cyan-300 mb-4 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            Arrive Fast, Arrive in Style
          </h2>
          <p className="text-lg text-cyan-300 mb-6">
            Drift — your adrenaline-fueled ride partner.
          </p>

          {/* Offer Info */}
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-cyan-400 font-semibold">
              Up to 50% off your first 5 Drift rides.
            </p>
          </div>
          <p className="text-gray-400 text-sm mb-8">
            *Valid within 15 days of signup. Terms & conditions apply.
          </p>

          {/* Input Fields */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter pickup location"
              className="w-full bg-transparent border border-cyan-700 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full bg-transparent border border-cyan-700 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSeePrices}
              className="bg-[#FF6B00] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#ff7a1a] shadow-[0_0_15px_rgba(255,107,0,0.5)] transition cursor-pointer"
            >
              See Prices
            </button>
            <button className="border border-cyan-700 text-cyan-300 px-6 py-3 rounded-xl font-semibold hover:border-cyan-400 hover:text-cyan-400 transition">
              Schedule for Later
            </button>
          </div>
        </section>

        {/* Right Section */}
        <section className="flex justify-center items-center">
          <div className="relative">
            <img
              src="../Driftlogo.png"
              alt="Drift Car"
              className="rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.3)] w-full max-w-md"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Ridepage;
