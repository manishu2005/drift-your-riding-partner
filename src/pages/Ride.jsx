import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const heroImage = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80';
const driftImage = './Driftlogo.png';
const cityImage = 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80';

export default function Ride() {
 const navigate = useNavigate();
  return (
    <div className="min-h-screen font-sans text-white bg-[#050507]">
      <style>{`
        @keyframes pulse-accent {0%{transform:scale(1)}50%{transform:scale(1.04)}100%{transform:scale(1)}}
        .accent-pulse{animation:pulse-accent 2s infinite ease-in-out}
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(4px); }
      `}</style>

      {/* Header */}
        <div className="md:hidden">{/* Mobile menu placeholder */}
          <button className="p-2 text-gray-300 hover:text-white">Menu</button>
        </div>
    

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[68vh] md:h-[72vh] lg:h-[78vh]">
          <img src={heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-70" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,5,7,0.5)] to-[rgba(5,5,7,0.85)]"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">YOUR RIDE, <br /> YOUR WAY.</h1>
              <p className="mt-4 text-lg md:text-xl text-gray-300">From the streets to the circuit — DriftGo delivers the perfect ride, every time.</p>

              <div className="mt-8 flex items-center gap-4">
                <a href="/login" className="inline-block px-6 py-3 rounded-md bg-[#ff4500] text-black font-semibold shadow-lg transform hover:scale-[1.02] transition">BOOK YOUR RIDE NOW</a>
                <a href="/" className="inline-flex items-center text-gray-300 hover:text-white gap-2">SEE HOW IT WORKS <span aria-hidden>›</span></a>
              </div>

            </div>
          </div>

          {/* Floating map mockup on the right */}
          <Link to="/login">
          <div className='hidden lg:block absolute right-12 top-1/3 w-[360px] cursor-pointer '>
          <div className="glass rounded-xl p-4 shadow-2xl transition-transform duration-300 hover:scale-105">
            <div className="w-full h-48 bg-black/30 rounded-md overflow-hidden" >
              <img src={cityImage} alt="map mock" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"/>
            </div>
            <div className="mt-3 text-sm text-gray-300">Live cars nearby · ETA 4–7 mins</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm">
                <div className="text-xs text-gray-400">Pickup</div>
                <div className="font-medium">Downtown</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">Ride</div>
                <div className="font-medium">Everyday</div>
              </div>
            </div>
          </div>
          </div>
</Link>
        </div>
      </section>

      {/* Ride Options */}
      <section id="rides" className="max-w-5xl mx-auto px-6 py-14 ">
        <h2 className="text-3xl font-bold mb-6">Choose Your Style</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
          <RideCard  title="Everyday" subtitle="Affordable rides for daily use" image={cityImage} navigate={navigate}/>
          <RideCard title="Premium" subtitle="Luxury vehicles & top-rated drivers" image={heroImage} navigate={navigate}/>
         
        </div>
      </section>

      {/* How It Works */}
      <section id="howitworks" className="bg-[#07070a] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Tap, Ride, Repeat</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowStep icon={<PinIcon />} title="Set Pickup" desc="Enter your location or tap GPS." />
            <HowStep icon={<CarIcon />} title="Choose Ride" desc="Select from Everyday to Drift packages." />
            <HowStep icon={<SpeedIcon />} title="Enjoy the Drive" desc="Watch your driver arrive — or strap in at the track." />
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold">Driven by pros. <span className="text-[#ff4500]">Safety first.</span></h3>
            <p className="mt-4 text-gray-300">Whether it's a calm commute or a speed run, every DriftGo driver is licensed, trained, and verified. Our cars are certified, insured, and track-tested.</p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <TrustItem label="Verified Drivers" />
              <TrustItem label="Real-time Tracking" />
              <TrustItem label="Full Insurance" />
              <TrustItem label="24/7 Support" />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img src={driftImage} alt="driver" className="w-full h-96 object-cover" />
            </div>
            <div className="absolute right-6 bottom-6 glass p-3 rounded-lg">
              <div className="text-xs text-gray-300">Peak G</div>
              <div className="text-lg font-semibold">1.5G</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#08080a] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Loved by Riders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial name="Ethan" text="It’s like Uber… but with turbochargers." />
            <Testimonial name="Sarah" text="Always reliable, always on time." />
            <Testimonial name="Priya" text="The drift experience was incredible — worth every rupee." />
          </div>
        </div>
      </section>

      {/* App Promo & Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold">Rides in one tap</h3>
            <p className="mt-4 text-gray-300">Book, track, and relive your rides — from city trips to the track. Download the app to carry DriftGo in your pocket.</p>

            <div className="mt-6 flex gap-4">
              <div className="w-40 h-12 glass rounded-md flex items-center justify-center ">App Store</div>
              <div className="w-40 h-12 glass rounded-md flex items-center justify-center">Google Play</div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-72 h-[520px] rounded-3xl overflow-hidden shadow-2xl">
              <img src={cityImage} alt="app mock" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#151518] mt-8 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">© {new Date().getFullYear()} DriftGo · All rights reserved</div>
          <div className="text-sm text-gray-400">Terms · Privacy · Support</div>
        </div>
      </footer>
    </div>
  );
}


/* Small UI subcomponents  */

function RideCard({ title, subtitle, image, highlight = false }) {
    const navigate = useNavigate();
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition ${highlight ? 'ring-2 ring-[#ff4500]' : ''}`}>
      <div className="h-44 bg-gray-900">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-90" />
      </div>
      <div className="p-4 bg-gradient-to-t from-[#000000] to-transparent">
        <div className="text-sm text-gray-300">{subtitle}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-semibold">{title}</div>
          <button onClick={()=>navigate('/login')} className="ml-3 px-3 py-1 rounded-md bg-[#ff4500] text-black text-sm font-medium cursor-pointer">Book</button>
        </div>
      </div>
    </div>
  );
}

function HowStep({ icon, title, desc }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-full bg-[#0b0b0d] flex items-center justify-center ring-1 ring-[#ff4500]/20">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-gray-300 mt-1 text-sm">{desc}</div>
      </div>
    </div>
  );
}

function Testimonial({ name, text }) {
  return (
    <div className="glass rounded-lg p-6">
      <div className="text-xl leading-snug">“{text}”</div>
      <div className="mt-4 text-sm text-gray-300">— {name}</div>
    </div>
  );
}

function TrustItem({ label }) {
  return (
    <div className="flex items-center gap-3 glass p-3 rounded-md">
      <div className="w-10 h-10 rounded-full bg-[#0b0b0d] flex items-center justify-center">✓</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

/*Icons */

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ff4500]">
      <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" stroke="#ff4500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.2" stroke="#ff4500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ff4500]">
      <path d="M3 13l1.5-4.5A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.93 1.5L21 13" stroke="#ff4500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" stroke="#ff4500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ff4500]">
      <path d="M12 6v6l4 2" stroke="#ff4500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12a9 9 0 0 1 18 0" stroke="#ff4500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
