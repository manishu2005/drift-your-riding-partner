import React from "react";
import { ShieldCheck, Smartphone, Users, Lightbulb, Leaf, Car } from "lucide-react";

export default function Company() {
  return (
    <div className="font-sans bg-black text-white min-h-screen px-6 md:px-16 py-12">
      {/* --- HEADER --- */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">Company Details</h1>
        <p className="text-gray-300 text-lg">
          Learn more about Drift — our mission, vision, and commitment to a better tomorrow.
        </p>
      </div>

      {/* --- MISSION & VISION --- */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-6">Mission & Vision</h2>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-300 mb-4">
              To move people and possibilities. Drift is dedicated to providing safe,
              seamless, and sustainable transportation, empowering our users to
              experience their cities without limits.
            </p>
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-300">
              To redefine urban mobility by making every journey an opportunity,
              connecting communities through technology, and leading the global
              transition to smarter, cleaner transportation.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center shadow-lg">
              <Car size={80} className="text-blue-400 mb-4" />
              <p className="text-gray-400 text-center">
                Empowering city travel with innovation, safety, and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <ShieldCheck className="mx-auto text-green-400 mb-3" size={48} />
            <h3 className="text-xl font-semibold mb-2">Safety First</h3>
            <p className="text-gray-400">
              We prioritize the well-being of our riders and Captains through background
              checks, 24/7 support, and safety investments.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <Smartphone className="mx-auto text-blue-400 mb-3" size={48} />
            <h3 className="text-xl font-semibold mb-2">Effortless Experience</h3>
            <p className="text-gray-400">
              Simplicity drives us — from app design to payments — ensuring every
              interaction feels smooth and reliable.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <Users className="mx-auto text-teal-400 mb-3" size={48} />
            <h3 className="text-xl font-semibold mb-2">Community Connection</h3>
            <p className="text-gray-400">
              We’re part of the neighborhoods we serve, supporting fair wages and local
              community initiatives.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <Lightbulb className="mx-auto text-yellow-400 mb-3" size={48} />
            <h3 className="text-xl font-semibold mb-2">Drive Innovation</h3>
            <p className="text-gray-400">
              Always moving forward — pioneering new rides, green tech, and smarter
              solutions for tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* --- SUSTAINABILITY --- */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-8">Sustainability Commitment</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg md:w-1/2">
            <Leaf size={60} className="text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">The Road to Zero Emissions</h3>
            <p className="text-gray-400">
              Drift is committed to achieving 50% electric vehicles in our fleet by 2030,
              cutting emissions and leading the charge for clean mobility.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg md:w-1/2">
            <Car size={60} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Eco-Ride Options</h3>
            <p className="text-gray-400">
              Riders can choose hybrid and electric rides — giving everyone the power to
              travel sustainably and responsibly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
