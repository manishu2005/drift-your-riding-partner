import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL=import.meta.env.VITE_BACKEND_URL;

export default function Signup() {
  const nav = useNavigate();
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    color: "",
    plate: "",
    capacity: "",
    vehicleType: "car",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "user") nav("/userdashboard", { replace: true });
    else if (token && role === "captain") nav("/captaindashboard", { replace: true });
  }, [nav]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const signupData = {
      fullname: {
        firstname: form.firstname,
        lastname: form.lastname,
      },
      email: form.email,
      password: form.password,
      phone: form.phone,
      role,
    };

    if (role === "captain") {
      if (!form.color || !form.plate || !form.capacity) {
        setMessage({
          type: "error",
          text: "Captain registration requires all vehicle details.",
        });
        setLoading(false);
        return;
      }
      signupData.vehicle = {
        color: form.color,
        plate: form.plate,
        capacity: parseInt(form.capacity, 10),
        vehicleType: form.vehicleType,
      };
    }

    try {
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage({ type: "success", text: "Signup successful! Redirecting..." });

        setTimeout(() => {
          nav(data.user.role === "user" ? "/userdashboard" : "/captaindashboard");
        }, 1000);

        setForm({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          phone: "",
          color: "",
          plate: "",
          capacity: "",
          vehicleType: "car",
        });
      } else {
        setMessage({ type: "error", text: data.message || "Signup failed. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Signup failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#040b11] to-[#001219] flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-lg bg-[rgba(0,20,30,0.85)] border border-cyan-800 shadow-[0_0_25px_rgba(0,255,255,0.2)] p-8 rounded-3xl backdrop-blur-md">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-cyan-400">
          Join <span className="text-orange-400">DriftGo</span>
        </h2>

        {message && (
          <div
            className={`p-4 mb-6 rounded-xl font-medium text-sm text-center ${
              message.type === "success"
                ? "bg-cyan-700/40 border border-cyan-500 text-cyan-200"
                : "bg-red-800/40 border border-red-600 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setRole("user")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              role === "user"
                ? "bg-cyan-500 text-black shadow-[0_0_10px_cyan]"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Rider
          </button>
          <button
            onClick={() => setRole("captain")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              role === "captain"
                ? "bg-orange-500 text-black shadow-[0_0_10px_orange]"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Captain
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              required
              value={form.firstname}
              onChange={handleChange}
              className="w-full p-3 bg-[#0a1a23] border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={form.lastname}
              onChange={handleChange}
              className="w-full p-3 bg-[#0a1a23] border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 bg-[#0a1a23] border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 bg-[#0a1a23] border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 bg-[#0a1a23] border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Captain Fields */}
          {role === "captain" && (
            <div className="space-y-4 border-t border-cyan-800 pt-4">
              <h3 className="text-lg font-semibold text-cyan-300">Vehicle Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  required
                  value={form.color}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0a1a23] border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="text"
                  name="plate"
                  placeholder="Plate number"
                  required
                  value={form.plate}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0a1a23] border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="capacity"
                  placeholder="Capacity"
                  required
                  value={form.capacity}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0a1a23] border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <select
                  name="vehicleType"
                  required
                  value={form.vehicleType}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#0a1a23] border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-400 to-orange-500 text-black hover:from-cyan-300 hover:to-orange-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {loading ? "Creating account..." : role === "user" ? "Sign up as Rider" : "Sign up as Captain"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
