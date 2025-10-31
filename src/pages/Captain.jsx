import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Driver() {
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const hourlyLow = 90;
  const hourlyHigh = 150;
  const estimatedEarnings = Math.round(((hourlyLow + hourlyHigh) / 2) * hoursPerWeek);
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#070708] text-white font-poppins">
      {/* Container */}
      <div className="max-w-6xl mx-auto p-6 lg:p-12">
        {/* Header / Logo */}
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-extrabold tracking-wider text-cyan-400">DRIFTGO</div>
            <div className="hidden sm:block text-sm text-gray-400">Captain Recruitment</div>
          </div>
          <nav className="space-x-3">
            <button onClick={()=> nav('/login')} className="px-4 py-2 rounded-lg bg-[#FF6B00] font-semibold cursor-pointer">Apply Now</button>
            <button onClick={()=>nav('/trainingmodule')} className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-300 cursor-pointer">Learn How It Works</button>
          </nav>
        </header>

        {/* HERO */}
        <section className="relative mt-8 bg-gradient-to-b from-[#061015] to-transparent rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"/>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center p-8 lg:p-14">
            <div className="space-y-6 max-w-xl">
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-orbitron">
                FROM DRIVER
                <br />
                TO CAPTAIN.
              </h1>
              <p className="text-gray-300 text-lg">
                Turn your passion for driving into a rewarding career with DriftGo. Get certified, join events,
                and earn like a pro.
              </p>

              <div className="flex gap-4 items-center">
                <button onClick={()=>nav('/trainingmodule')} className="px-6 py-3 rounded-lg bg-[#FF6B00] font-semibold cursor-pointer">Begin Your Training</button>
              
              </div>

              <div className="mt-6 text-cyan-300">1000+ rides completed safely</div>
            </div>

            {/* Visual / right column */}
          <div className="hidden lg:flex items-center justify-end">
      <div className="w-96 h-56 rounded-xl border border-cyan-800 p-4 flex items-end relative overflow-hidden bg-[rgba(0,0,0,0.1)]">
        
        {/* Animated background image */}
        <div
          className="absolute inset-0 rounded-md bg-cover bg-center animate-zoomSlow"
          style={{
            backgroundImage: "url('/driftcaptain.logo.png')", // public folder image
            boxShadow: "0 0 20px rgba(0, 255, 246, 0.4)",
          }}
        ></div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.25)] rounded-md"></div>

        {/* Label on top */}
        <div className="ml-auto text-right text-sm text-gray-100 z-10 bg-[rgba(0,0,0,0.55)] px-2 py-1 rounded border border-cyan-400 shadow-[0_0_10px_rgba(0,255,246,0.5)] relative">
          Captain Gear
        </div>
      </div>
    </div>

          </div>
        </section>

        {/* Earnings / Stats */}
        <section className="mt-10 bg-transparent">
          <h2 className="text-3xl font-bold">Drive Smart. Earn More.</h2>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Comparison Card */}
            <div className="col-span-2 bg-[#0b0d10] rounded-xl border border-[#0f1720] p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-cyan-300">
                    <th className="py-2">Metric</th>
                    <th className="py-2">Drift Captain</th>
                    <th className="py-2">Regular Driver</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-[#0f1720]">
                    <td className="py-3">Average Hourly Earnings</td>
                    <td className="py-3">$90–$150/hr</td>
                    <td className="py-3">$25–$40/hr</td>
                  </tr>
                  <tr className="border-t border-[#0f1720]">
                    <td className="py-3">Event Bonuses</td>
                    <td className="py-3">Available</td>
                    <td className="py-3">None</td>
                  </tr>
                  <tr className="border-t border-[#0f1720]">
                    <td className="py-3">Sponsorship Rewards</td>
                    <td className="py-3">Eligible</td>
                    <td className="py-3">Standard Rides</td>
                  </tr>
                  <tr className="border-t border-[#0f1720]">
                    <td className="py-3">Ride Type</td>
                    <td className="py-3">Premium / Drift</td>
                    <td className="py-3">Standard Rides</td>
                  </tr>
                </tbody>
              </table>

              {/* Earnings calculator */}
              <div className="mt-6">
                <label className="block text-sm text-gray-400">How much could you earn? (hours per week)</label>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="range"
                    min={5}
                    max={80}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-3xl font-extrabold text-cyan-300">${Math.round(((hourlyLow + hourlyHigh) / 2) * hoursPerWeek)}</div>
                </div>
              </div>
            </div>

            {/* Quick pitch / perks */}
            <div className="bg-[#0b0d10] rounded-xl border border-[#0f1720] p-6 flex flex-col gap-4">
              <div className="text-xl font-semibold">Skill Meets Opportunity</div>
              <ul className="text-gray-300 space-y-3 mt-2">
                <li className="flex items-start gap-3">
                  <div className="text-cyan-300 text-2xl">🏁</div>
                  <div>
                    <div className="font-semibold">Pro-Level Driving</div>
                    <div className="text-sm text-gray-400">Showcase your talent at sanctioned DriftGo events.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="text-cyan-300 text-2xl">🕒</div>
                  <div>
                    <div className="font-semibold">Flexible Schedule</div>
                    <div className="text-sm text-gray-400">Work when you want — track or street.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="text-cyan-300 text-2xl">💸</div>
                  <div>
                    <div className="font-semibold">Performance Bonuses</div>
                    <div className="text-sm text-gray-400">Earn extra for events and loyalty.</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works / Steps */}
        <section className="mt-12">
          <h3 className="text-3xl font-bold mb-6">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: 1, title: "Apply Online", desc: "Complete your digital Captain profile." },
              { i: 2, title: "Verify & Train", desc: "Get verified and attend our DriftGo Academy orientation." },
              { i: 3, title: "Get Certified", desc: "Pass your drift safety test and receive your Captain license." },
              { i: 4, title: "Start Earning", desc: "Accept rides and join events — earn doing what you love." },
            ].map((s) => (
              <div key={s.i} className="bg-[#081018] rounded-xl p-6 border border-[#0f1720]">
                <div className="text-cyan-300 text-4xl font-extrabold">{s.i}</div>
                <div className="mt-3 font-semibold text-lg">{s.title}</div>
                <p className="text-gray-400 mt-2 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Training Modules */}
        <section className="mt-12">
          <h3 className="text-3xl font-bold mb-6">Training Modules</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Drift Fundamentals", icon: "🚗" },
              { title: "Vehicle Control & Safety", icon: "🧤" },
              { title: "Customer Experience", icon: "💬" },
              { title: "DriftGo Event Protocols", icon: "🏆" },
            ].map((m) => (
              <div key={m.title} className="bg-[#081018] rounded-xl p-6 border border-[#0f1720] text-center">
                <div className="text-3xl">{m.icon}</div>
                <div className="mt-3 font-semibold">{m.title}</div>
                <p className="text-gray-400 text-sm mt-2">Short description or time to complete.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certification Info */}
        <section className="mt-12">
          <h3 className="text-3xl font-bold mb-4">Certification Info</h3>
          <div className="bg-[#081018] rounded-xl p-6 border border-[#0f1720] flex items-center gap-6">
            <div>
              <p className="text-gray-300">All Captains certified under FIA-aligned standards.</p>
              <p className="text-gray-400 text-sm mt-2">Training, vehicle checks, and track exams are included in the certification.
              </p>
            </div>
            <div className="ml-auto flex items-center gap-4 opacity-60">
              <div className="w-20 h-12 bg-[rgba(255,255,255,0.03)] rounded flex items-center justify-center">FIA</div>
              <div className="w-20 h-12 bg-[rgba(255,255,255,0.03)] rounded flex items-center justify-center">Badge</div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {[
              {
                q: "Do I need prior drift experience?",
                a: "No. We accept drivers with varied experience — our DriftGo Academy will train you to Captain standards.",
              },
              { q: "What cars are eligible?", a: "Vehicles that meet our safety checklist — we help with inspections and upgrades." },
              { q: "Is safety gear provided?", a: "Yes — we provide certified safety equipment for training and events." },
              { q: "How soon can I start?", a: "Once certified, many Captains start within 1–2 weeks depending on scheduling." },
            ].map((f, idx) => (
              <details key={idx} className="bg-[#071016] rounded-lg p-4 border border-[#0f1720]"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-2 text-gray-300">{f.a}</p></details>
            ))}
          </div>
        </section>

        {/* Application / CTA Form */}
        <section className="mt-12 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-[#081018] rounded-xl p-8 border border-[#0f1720]">
            <h3  className="text-2xl font-bold mb-3">Ready to Earn Like a Pro?</h3>
            <p className="text-gray-400 mb-6">Apply now and our onboarding team will guide you through the certification process.</p>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Full name</label>
                <input className="w-full mt-2 p-3 rounded bg-[#061018] border border-[#0f1720]" placeholder="Your full name" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Contact phone or email</label>
                <input className="w-full mt-2 p-3 rounded bg-[#061018] border border-[#0f1720]" placeholder="Email or phone" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select className="mt-2 p-3 rounded bg-[#061018] border border-[#0f1720]">
                  <option>License Type</option>
                  <option>Full</option>
                  <option>Provisional</option>
                </select>
                <select className="mt-2 p-3 rounded bg-[#061018] border border-[#0f1720]">
                  <option>Experience Level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300">City</label>
                <input className="w-full mt-2 p-3 rounded bg-[#061018] border border-[#0f1720]" placeholder="City" />
              </div>

              <div className="flex items-center gap-3">
                <button  onClick={()=>nav('/login')} type="button" className="px-6 py-3 rounded bg-[#FF6B00] font-semibold">Apply to Drive</button>
                <div className="text-sm text-gray-400">No drift experience? Our team will train you.</div>
              </div>
            </form>
          </div>

          {/* Right column: quick benefits */}
          <div className="space-y-4">
            <div className="bg-[#081018] rounded-xl p-6 border border-[#0f1720]">
              <div className="font-semibold text-xl">What's included</div>
              <ul className="text-gray-300 mt-3 space-y-2 text-sm">
                <li>Professional track training</li>
                <li>Safety briefings & certified gear</li>
                <li>Mentorship & event access</li>
                <li>Dedicated Captain support line</li>
              </ul>
            </div>

            <div className="bg-[#081018] rounded-xl p-6 border border-[#0f1720]">
              <div className="font-semibold text-xl">Certification timeline</div>
              <div className="text-gray-400 text-sm mt-2">Typical onboarding: 2–4 weeks (depending on training slot availability).</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-[#0f1720] text-gray-400">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-extrabold text-cyan-400">DRIFTGO</div>
              <div className="text-sm">© {new Date().getFullYear()} DriftGo</div>
            </div>
            <div className="text-sm">FIA • Insured • Partnered</div>
            <div className="space-x-3">{['Twitter','Instagram','YouTube'].map((s)=> <button key={s} className="text-sm text-gray-400">{s}</button>)}</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
