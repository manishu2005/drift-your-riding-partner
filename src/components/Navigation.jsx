import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Ride", href: "/ride" },
  { name: "Drive", href: "/captain" },
  { name: "Business", href: "/business" },
  { name: "Company", href: "/company" },
];

export default function Navigation() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    nav("/login");
  };

  return (
    <div className="bg-[#000000] font-sans border-b border-cyan-800 shadow-[0_0_15px_rgba(0,255,255,0.15)]">
      <header className="relative z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-sm bg-[rgba(0,0,0,0.4)]"
        >
          {/* Left Section - Logo + Links */}
          <div className="flex items-center gap-x-10">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold text-cyan-400 tracking-wide drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
                Drift
              </span>
            </Link>
            <div className="hidden lg:flex gap-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-semibold text-gray-200 hover:text-cyan-400 transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-200 hover:text-cyan-400 transition"
            >
              <Bars3Icon className="size-6" />
            </button>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-x-8">
            {/* Language Dropdown */}
            <form>
              <select
                defaultValue="EN"
                className="bg-transparent border border-cyan-700 rounded-md text-sm text-white px-2 py-1 cursor-pointer hover:border-cyan-400 transition"
              >
                <option value="EN" className="text-black">
                  ENG
                </option>
              </select>
            </form>

            <Link
              to="/help"
              className="text-sm font-semibold text-gray-200 hover:text-cyan-400 transition"
            >
              Help
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-cyan-300 font-medium">
                  Hi, {user.email?.split("@")[0] || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md bg-[#FF6B00] hover:bg-[#ff7a1a] text-black text-sm font-semibold shadow-[0_0_10px_rgba(255,107,0,0.5)] transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-gray-200 hover:text-cyan-400 transition"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-md bg-[#FF6B00] hover:bg-[#ff7a1a] text-black text-sm font-semibold shadow-[0_0_10px_rgba(255,107,0,0.5)] transition"
                >
                  Log in
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#0a0a0a] p-6 shadow-[0_0_25px_rgba(0,255,255,0.2)]">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
                Drift
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-300 hover:text-cyan-400 transition"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>

            <div className="mt-8 space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium text-gray-200 hover:text-cyan-400 transition"
                >
                  {item.name}
                </Link>
              ))}

              <hr className="border-cyan-800/50" />

              <Link
                to="/help"
                className="block text-sm text-gray-300 hover:text-cyan-400 transition"
              >
                Help
              </Link>

              {user ? (
                <>
                  <div className="text-cyan-300">
                    Hello, {user.email?.split("@")[0] || "User"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-400 hover:text-red-300 mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white bg-[#FF6B00] hover:bg-[#ff7a1a] rounded-md text-center py-2 font-semibold shadow-[0_0_15px_rgba(255,107,0,0.5)] transition"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white border border-cyan-600 hover:border-cyan-400 rounded-md text-center py-2 font-semibold"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
