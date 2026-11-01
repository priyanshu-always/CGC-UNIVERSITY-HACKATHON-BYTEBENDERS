import { Award, Zap, ShieldCheck, Cpu, Mic, BrainCircuit, Globe, PhoneCall } from "lucide-react";

export default function HackathonPitchView({ onLaunchLiveCall }) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      
      {/* Hero Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Award className="w-4 h-4 text-emerald-400" />
          CGC University Jhanjeri Hackathon • AI Calling Innovation Track
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          CGC VoiceGenie: Autonomous AI Admissions Telephony
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Solving the university admissions scaling bottleneck with zero-latency voice AI, Indian regional language support, and real-time CRM lead qualification.
        </p>
      </div>

      {/* The Problem vs Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-red-500/20 shadow-xl">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            The Problem at University Admissions
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✕</span>
              <span><strong>25,000+ Enquiries Peak Load:</strong> Human counseling teams cannot dial or handle incoming calls during May-August admissions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✕</span>
              <span><strong>Slow Turnaround & High Drop-off:</strong> Students wait hours or days for basic fee, hostel, or scholarship eligibility answers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✕</span>
              <span><strong>Language & Accent Barrier:</strong> Callers from Punjab, Haryana, HP, and NCR struggle with generic robotic IVRs.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Our Autonomous AI Solution
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Sub-second Latency:</strong> Real-time two-way voice using Sarvam AI (Ritu voice) + Soniox transcription.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>CGC Jhanjeri RAG Knowledge:</strong> Precise facts on ₹1 Cr placement, 14,000+ offers, JOSH scholarship, and fees.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Dual Inbound & Outbound:</strong> Instant browser voice assistance for students + 1-click batch auto-dialer for counselors.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tech Stack Architecture */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          Technical Architecture & Protocol Flow
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mb-2">
              01
            </div>
            <h4 className="font-semibold text-white text-xs mb-1">OmniDimension Core</h4>
            <p className="text-[11px] text-slate-400">
              Agent #277505 orchestrating full-duplex conversational sessions with interruptibility.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs mb-2">
              02
            </div>
            <h4 className="font-semibold text-white text-xs mb-1">Sarvam Ritu + Soniox</h4>
            <p className="text-[11px] text-slate-400">
              State-of-the-art Indian neural voice synthesis with multilingual English, Hindi, and Punjabi nuances.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
              03
            </div>
            <h4 className="font-semibold text-white text-xs mb-1">CGC Jhanjeri RAG</h4>
            <p className="text-[11px] text-slate-400">
              Knowledge retrieval engine mapped to official fees, scholarships, NAAC A+ accreditation, and placements.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs mb-2">
              04
            </div>
            <h4 className="font-semibold text-white text-xs mb-1">Supabase CRM Sync</h4>
            <p className="text-[11px] text-slate-400">
              Automatic lead qualification (Hot/Warm/Cold), sentiment analysis scoring, and transcript persistence.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Call to Action for Hackathon Judges */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-emerald-500/20">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider bg-slate-950/20 px-3 py-1 rounded-full text-slate-950 inline-block mb-2">
            Live Demonstration for Hackathon Evaluators
          </span>
          <h3 className="text-2xl font-black">
            Test the AI Counselor Right Now
          </h3>
          <p className="text-xs font-medium text-slate-900 mt-1 max-w-lg">
            Click below to initiate a live voice call with Ritu. Ask about B.Tech CSE fees, 1 Crore package, or test barge-in interruptions in real-time.
          </p>
        </div>

        <button
          onClick={onLaunchLiveCall}
          className="shrink-0 px-7 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs shadow-xl transition flex items-center gap-2"
        >
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          Launch Live AI Voice Call
        </button>
      </div>

    </div>
  );
}
