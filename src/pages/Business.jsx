import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useEffect } from "react";
import { useState } from "react";

const Business = () => {
  const navigate = useNavigate();
    const [user, setUser] = useState(null);

      useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/userlogin");
  };

  const username =
    user?.fullname?.firstname ||
    user?.email?.split("@")[0] ||
    "User";

  return (
   
    <div className="font-sans bg-black text-white ">
   
      {/* --- HERO SECTION --- */}
      <section
      
        className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/business.jpg')", 
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
         
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold text-white"
        >
          Drift for Business: <br /> Effortless Travel. Total Control.
        </motion.h1>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl">
          The streamlined corporate travel solution that puts safety, savings,
          and simplicity first.
        </p>

       <div className="mt-10 flex gap-4 items-center">
  {user ? (
    <>
      <span className="text-lg font-semibold text-cyan-300">
        Hi, {username} 
      </span>
     
    </>
  ) : (
    <>
      <button
        className="bg-[#FFD700] text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition"
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
      <button
        className="border border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition"
        onClick={() => navigate("/userlogin")}
      >
        Book a Demo
      </button>
    </>
  )}
</div>

      </section>

      {/* --- HEADER  --- */}
      <section className="bg-[#121212] py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          {[
            { number: "99.8%", text: "On-Time Reliability" },
            { number: "50+", text: "Corporate Partners" },
            { number: "4.9★", text: "Average Client Rating" },
            { number: "24/7", text: "Dedicated Support" },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-[#FFD700]">{item.number}</p>
              <p className="text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="bg-gray-50 text-black py-24 ">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 md:p-8 gap-16 text-center ">
          {[
            {
              icon: "🛡️",
              title: "Safety First",
              desc: "Enterprise-grade safety protocols and verified drivers for peace of mind.",
            },
            {
              icon: "💰",
              title: "Centralized Billing & Savings",
              desc: "Simplify expenses with consolidated invoices and transparent cost tracking.",
            },
            {
              icon: "📊",
              title: "Full Control Dashboard",
              desc: "Monitor usage, set policies, and manage riders in real time.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center"
            >
              <div className="text-5xl text-[#FFD700]">{card.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{card.title}</h3>
              <p className="mt-3 text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FEATURES DEEP DIVE --- */}
      <section className="bg-white text-black py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-1 lg:grid-cols-2 px-6 md:px-12 lg:px-12 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 ml-6">
              The Control Panel
            </h2>
            <ul className="space-y-4 text-gray-700 ml-6">
              <li>
                <strong>Automated Expense Integration</strong> — Connect your
                finance tools seamlessly.
              </li>
              <li>
                <strong>Policy Enforcement</strong> — Define travel policies that
                auto-apply to every booking.
              </li>
              <li>
                <strong>Book on Behalf Of</strong> — Assist executives and teams
                effortlessly.
              </li>
              <li>
                <strong>Real-Time Analytics</strong> — Track usage and spending
                instantly.
              </li>
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/dashboard.png" 
              alt="Drift Business Dashboard"
              className="rounded-2xl shadow-2xl border border-gray-200"
            />
          </motion.div>
        </div>
      </section>

      {/* --- FINAL --- */}
      <section className="bg-black py-24 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Ready to Simplify Your Corporate Travel?
        </h2>
        <button className="bg-[#FFD700] text-black px-10 py-5 rounded-full text-lg font-semibold hover:bg-yellow-400 transition"onClick={()=>
            navigate("/userlogin")
          } >
          Start Your Free 30-Day Trial
        </button>
      </section>
    </div>
  );
};

export default Business;

