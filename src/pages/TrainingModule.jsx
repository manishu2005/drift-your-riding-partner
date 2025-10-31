import React from "react";

const modules = [
  {
    title: "Drift Fundamentals: Mastering the Ride Line",
    goal: "Ensure the Captain can execute passenger-friendly drifts that are smooth, controlled, and thrilling without sacrificing safety.",
    topics: [
      {
        topic: "Friction Circle & Weight Transfer",
        details:
          "Detailed analysis of optimal weight distribution before and during initiation. Focus on controlled throttle application to manage lateral G-force and maintain passenger comfort.",
        focus: "Precision & Theory",
      },
      {
        topic: "Power-over, Clutch Kick, E-brake Initiation",
        details:
          "Practical video demonstrations highlighting smoothness vs. aggression. Choose the right method based on track conditions.",
        focus: "Technique & Application",
      },
      {
        topic: "Controlled Drift Entry & Smooth Angles",
        details:
          "Training to find the 'sweet spot' steering angle that maintains smoke trails without rapid direction changes.",
        focus: "Consistency & Control",
      },
      {
        topic: "Passenger-Focused Drift Experience",
        details:
          "Understanding the 'passenger tolerance zone' for G-forces. Throttle feathering to prevent nausea while maintaining thrill.",
        focus: "Customer Comfort",
      },
      {
        topic: "Seamless Drift Transitions (Tandem Line)",
        details:
          "Drills minimizing off-angle time between corners for a continuous, flowing ride.",
        focus: "Flow & Engagement",
      },
    ],
  },
  {
    title: "Vehicle Control & Safety: Operational Integrity",
    goal: "Instill a proactive, military-grade discipline regarding vehicle readiness, maintenance, and emergency response.",
    topics: [
      {
        topic: "Pre-Ride Safety Checklist (Digital Sign-off)",
        details:
          "20+ mandatory checks logged every 4 hours (harness lock, fire suppression, tire depth, etc.).",
        focus: "Mandatory Protocol",
      },
      {
        topic: "Emergency Egress & Procedures",
        details:
          "10-second target for safe exit: Kill Switch, Engine Check, Harness Release for both driver and passenger.",
        focus: "Crisis Management",
      },
      {
        topic: "Tire Management & Heat Monitoring",
        details:
          "Monitor hot pressure and log tire temperatures after every 5 rides. Notify crew for urgent replacements.",
        focus: "Resource Management",
      },
      {
        topic: "Vehicle Diagnostics & Reporting (Offline Protocol)",
        details:
          "Identify Red Alerts (Overheat, Oil Drop) → terminate session → file maintenance report via app.",
        focus: "Proactive Reporting",
      },
    ],
  },
  {
    title: "Customer Experience: The 5-Star Service",
    goal: "Ensure every interaction reinforces the 'DriftGo' brand as a safe, thrilling, and premium service.",
    topics: [
      {
        topic: "Rider Briefing & Easing Anxiety",
        details:
          "Sample scripts for building trust and humor. Emphasize safety and professionalism.",
        focus: "Communication & Trust",
      },
      {
        topic: "Personalized Thrill Level (Pre-Ride Assessment)",
        details:
          "Gauge rider comfort (5/10 vs 10/10 thrill). Adjust drift intensity accordingly.",
        focus: "Adaptability & Service",
      },
      {
        topic: "In-Car Communication & Engagement",
        details:
          "Use helmet mic for narration. Warn before intense drifts. Stay focused, no off-topic chat.",
        focus: "In-Ride Protocol",
      },
      {
        topic: "Post-Ride Photo/Video Moments",
        details:
          "Guide passenger for best photo angle. Ensure clean livery and backdrop setup.",
        focus: "Marketing & Social Share",
      },
      {
        topic: "Complaint Resolution & Professionalism",
        details:
          "Handle refund/voucher cases via Captain App for sickness or mechanical issues.",
        focus: "Issue Resolution",
      },
    ],
  },
  {
    title: "DriftGo Event Protocols: Operational Excellence",
    goal: "Guarantee seamless operation within the DriftGo ecosystem and media/legal compliance.",
    topics: [
      {
        topic: "Track & Venue Logistics (PUDO & Hot Zones)",
        details:
          "Interactive map with slow zones (5 km/h). Follow queueing and track flow precisely.",
        focus: "Logistical Compliance",
      },
      {
        topic: "App & Booking Management (Service Flow)",
        details:
          "4-Step Ride Cycle: Accept → Arrive → Start → Complete. Ghosting penalized.",
        focus: "Platform Integrity",
      },
      {
        topic: "Branding & Media Interaction Policy",
        details:
          "Always wear uniform. No press interviews without approval. Direct media to Event Manager.",
        focus: "Brand Consistency",
      },
      {
        topic: "Incident Reporting Procedure (Post-Crash/Damage)",
        details:
          "1. Safety First  2. Contact Command  3. Document with 8-point photo checklist.",
        focus: "Legal & Insurance",
      },
    ],
  },
];

export default function TrainingModule() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400">
        DriftGo Captain Training Curriculum
      </h1>
      <div className="space-y-16">
        {modules.map((m, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-cyan-700 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          >
            <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
              {m.title}
            </h2>
            <p className="text-gray-300 mb-6">{m.goal}</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-cyan-800">
                <thead className="bg-[rgba(0,255,255,0.1)]">
                  <tr>
                    <th className="border border-cyan-800 px-4 py-2 text-left">
                      Topic
                    </th>
                    <th className="border border-cyan-800 px-4 py-2 text-left">
                      Key Details
                    </th>
                    <th className="border border-cyan-800 px-4 py-2 text-left">
                      Focus
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {m.topics.map((t, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[rgba(0,255,255,0.05)] transition"
                    >
                      <td className="border border-cyan-800 px-4 py-3 font-semibold text-cyan-200">
                        {t.topic}
                      </td>
                      <td className="border border-cyan-800 px-4 py-3 text-gray-300">
                        {t.details}
                      </td>
                      <td className="border border-cyan-800 px-4 py-3 text-gray-400 italic">
                        {t.focus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}
