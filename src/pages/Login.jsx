import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      nav(role === "user" ? "/userdashboard" : "/captaindashboard", { replace: true });
    }
  }, [nav]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", form, { withCredentials: true });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        nav(res.data.user.role === "user" ? "/userdashboard" : "/captaindashboard");
      } else {
        setErr(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setErr("Email or password is wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#040b11] to-[#001219] text-white p-6">
      <div className="w-full max-w-md bg-[rgba(0,20,30,0.85)] border border-cyan-800 shadow-[0_0_25px_rgba(0,255,255,0.2)] p-8 rounded-3xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-cyan-400">
          Sign in to <span className="text-orange-400">DriftGo</span>
        </h2>

        {err && (
          <p className="bg-red-800/40 border border-red-600 text-red-300 p-3 rounded-xl mb-4 text-center text-sm">
            {err}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-[#0a1a23] border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-[#0a1a23] border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl font-bold bg-gradient-to-r from-cyan-400 to-orange-500 text-black hover:from-cyan-300 hover:to-orange-400 shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 flex justify-between items-center text-sm">
          <button
            className="text-cyan-400 hover:underline cursor-pointer"
            onClick={() => nav("/signup")}
          >
            Create account
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="inline-block px-4 py-2 border border-cyan-600 text-cyan-400 rounded-xl hover:bg-cyan-600/20 transition-all"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

// Logout helper
export const handleLogout = (navigate) => {
  localStorage.clear();
  navigate("/login");
};
