import React from "react";
import { HelpCircle, Car, Users, Mail, Phone, MessageCircle } from "lucide-react";

export default function Help() {
  return (
    <div className="bg-black min-h-screen text-gray-200 font-sans py-16 px-6">
      {/* --- Header --- */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
           DriftGo Help Center
        </h1>
        <p className="mt-4 text-gray-400 text-lg">
          Welcome to the DriftGo Help Center! Find fast answers below or connect with our support team.
        </p>
      </div>

      {/* --- Rider FAQs --- */}
      <section className="max-w-5xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <Car className="text-orange-500" size={28} />
          <h2 className="text-3xl font-semibold text-white">Rider FAQs (Booking Your Thrill)</h2>
        </div>

        <div className="bg-[rgba(255,255,255,0.05)] p-6 rounded-2xl border border-cyan-800 space-y-6 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          <div>
            <h3 className="text-cyan-400 font-semibold text-xl mb-2">What exactly is a DriftGo ride-along?</h3>
            <p>
              A DriftGo ride-along is a professional passenger experience where you ride shotgun with a certified drift
              expert in a high-performance car on a closed course. It’s a high-adrenaline experience full of controlled
              slides and speed!
            </p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-semibold text-xl mb-2">Is this safe?</h3>
            <p>
              Absolutely. All DriftGo Captains are licensed professionals, and every car has FIA-certified safety gear.
              You’ll receive a full briefing before strapping in.
            </p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-semibold text-xl mb-2">How long does a ride last?</h3>
            <p>
              Rides vary by package (2–5 laps). The full experience including briefing & photos lasts 15–30 minutes.
            </p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-semibold text-xl mb-2">What should I wear?</h3>
            <p>
              Comfortable athletic wear and closed-toe shoes are required. We’ll provide a helmet and head sock.
            </p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-semibold text-xl mb-2">Can I cancel or reschedule?</h3>
            <p>
              Yes — full refund if cancelled 48 hours before, and free reschedule up to 24 hours prior.
            </p>
          </div>
        </div>
      </section>

      {/* --- Captain FAQs --- */}
      <section className="max-w-5xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-orange-500" size={28} />
          <h2 className="text-3xl font-semibold text-white">Captain FAQs (Operational & Earnings)</h2>
        </div>

        <div className="bg-[rgba(255,255,255,0.05)] p-6 rounded-2xl border border-cyan-800 space-y-6 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          <div>
            <h3 className="text-cyan-400 font-semibold text-xl mb-2">How do I become a certified DriftGo Captain?</h3>
            <p>
              Apply via the Captain Portal, submit your racing license, complete DriftGo Training Modules, and pass a
              background check.
            </p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-semibold text-xl mb-2">What vehicle requirements must my car meet?</h3>
            <p>
              RWD performance cars only — with a roll cage, racing seats, harnesses, and valid tech inspection.
            </p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-semibold text-xl mb-2">How are my earnings calculated?</h3>
            <p>
              Based on package price minus DriftGo’s commission. 100% of tips go to you. Payments are weekly.
            </p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-semibold text-xl mb-2">What if there’s a vehicle issue or incident?</h3>
            <p>
              Log issues in the Captain Dashboard. In emergencies, hit the in-app SOS for immediate support and logging.
            </p>
          </div>
        </div>
      </section>

      {/* --- Contact & Support --- */}
      <section className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <HelpCircle className="text-orange-500" size={28} />
          <h2 className="text-3xl font-semibold text-white">Contact & Support</h2>
        </div>

        <div className="bg-[rgba(255,255,255,0.05)] border border-cyan-800 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          <div className="flex flex-col md:flex-row justify-around text-left gap-6 text-gray-300">
            <div>
              <h3 className="text-orange-400 font-semibold mb-2">Urgent Safety & Ride Issues</h3>
              <p className="flex items-center gap-2"><Phone size={16} /> Emergency Line: <strong>+91 90000 00000</strong></p>
              <p>Available 24 / 7 / 365</p>
            </div>

            <div>
              <h3 className="text-orange-400 font-semibold mb-2">General Booking & Account Help</h3>
              <p className="flex items-center gap-2"><Mail size={16} /> support@driftgo.com</p>
              <p>Mon–Fri, 9 AM – 5 PM</p>
            </div>

            <div>
              <h3 className="text-orange-400 font-semibold mb-2">Captain Support</h3>
              <p className="flex items-center gap-2"><MessageCircle size={16} /> Captain Portal Chat</p>
              <p>Mon–Sat, 8 AM – 8 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

