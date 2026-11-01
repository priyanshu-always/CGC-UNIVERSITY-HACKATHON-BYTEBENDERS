import { useState } from "react";
import {
  PhoneCall,
  Users,
  CheckCircle,
  Clock,
  Flame,
  Search,
  Filter,
  Play,
  FileText,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Download,
} from "lucide-react";

const INITIAL_LEADS = [
  {
    id: 1,
    name: "Aarav Sharma",
    phone: "+91 98721 44520",
    city: "Chandigarh",
    percentage: "91.4%",
    course: "B.Tech CSE (AI & ML)",
    status: "Hot Lead",
    callDuration: "3m 42s",
    sentiment: "98% Positive",
    notes: "Eligible for 50% JOSH Scholarship. Requested fee breakdown on WhatsApp.",
    transcript: [
      { speaker: "AI Counselor", text: "Hello Aarav! Calling from CGC University Jhanjeri regarding your B.Tech CSE enquiry." },
      { speaker: "Aarav", text: "Yes ma'am, I wanted to know about scholarship criteria since I got 91% in 12th." },
      { speaker: "AI Counselor", text: "Congratulations on 91%! With this score, you qualify for our 50% CGC JOSH tuition fee waiver." },
      { speaker: "Aarav", text: "That is amazing. What about placements?" },
      { speaker: "AI Counselor", text: "Our landmark highest package is ₹1 Crore with 14,000+ placement offers. I am sending the campus tour pass to your number." },
    ],
  },
  {
    id: 2,
    name: "Simranjit Kaur",
    phone: "+91 98140 88219",
    city: "Ludhiana",
    percentage: "87.0%",
    course: "Master of Business Administration (MBA)",
    status: "Hot Lead",
    callDuration: "4m 10s",
    sentiment: "94% Positive",
    notes: "Interested in Business Analytics dual specialization. Wants hostel details.",
    transcript: [
      { speaker: "AI Counselor", text: "Sat Sri Akal Simranjit! Calling from CGC Jhanjeri School of Business." },
      { speaker: "Simranjit", text: "Sat Sri Akal! Can you tell me if hostel accommodation is available on campus?" },
      { speaker: "AI Counselor", text: "Yes! We have dedicated AC and non-AC girls' hostels with 24/7 security and multi-cuisine mess." },
    ],
  },
  {
    id: 3,
    name: "Rohan Vashisht",
    phone: "+91 97800 12345",
    city: "Ambala",
    percentage: "76.2%",
    course: "Bachelor of Computer Application (BCA)",
    status: "Warm Lead",
    callDuration: "2m 15s",
    sentiment: "82% Neutral",
    notes: "Comparing with local colleges; highlighted CGC 1,700+ top recruiters.",
    transcript: [
      { speaker: "AI Counselor", text: "Hello Rohan, following up on your BCA admission enquiry at CGC Jhanjeri." },
      { speaker: "Rohan", text: "What companies recruit BCA students?" },
      { speaker: "AI Counselor", text: "Top recruiters like Deloitte, Wipro, TCS, and Infosys actively hire from our Advance Computing school." },
    ],
  },
  {
    id: 4,
    name: "Tanya Verma",
    phone: "+91 94170 56789",
    city: "Shimla",
    percentage: "84.5%",
    course: "Bachelor of Pharmacy (B.Pharm)",
    status: "Hot Lead",
    callDuration: "3m 05s",
    sentiment: "96% Positive",
    notes: "PCI approved laboratory facilities confirmed; seat provisional booking requested.",
    transcript: [
      { speaker: "AI Counselor", text: "Hello Tanya! This is Ritu from CGC University Pharmaceutical Sciences." },
      { speaker: "Tanya", text: "Is the B.Pharm program approved by Pharmacy Council of India?" },
      { speaker: "AI Counselor", text: "Yes, 100% PCI approved with modern pharmacology and formulation research labs." },
    ],
  },
  {
    id: 5,
    name: "Vikramaditya Rao",
    phone: "+91 98888 99112",
    city: "Delhi NCR",
    percentage: "68.0%",
    course: "B.A. LL.B (5-Year Integrated Law)",
    status: "Follow-up",
    callDuration: "1m 30s",
    sentiment: "70% Neutral",
    notes: "Parent requested callback tomorrow at 6 PM.",
    transcript: [
      { speaker: "AI Counselor", text: "Hello Vikramaditya, calling from CGC Legal Studies department." },
      { speaker: "Vikramaditya", text: "Please call back in the evening when my father is home." },
      { speaker: "AI Counselor", text: "Certainly! I have scheduled an automated follow-up call for 6:00 PM today." },
    ],
  },
];

export default function AdminDialerDashboard({ onTriggerLiveCall }) {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [isDialingCampaign, setIsDialingCampaign] = useState(false);
  const [currentDialIndex, setCurrentDialIndex] = useState(-1);
  const [selectedLead, setSelectedLead] = useState(INITIAL_LEADS[0]);
  const [filterQuery, setFilterQuery] = useState("");

  const handleStartCampaign = () => {
    setIsDialingCampaign(true);
    setCurrentDialIndex(0);

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < leads.length) {
        setCurrentDialIndex(idx);
        setSelectedLead(leads[idx]);
      } else {
        clearInterval(interval);
        setIsDialingCampaign(false);
        setCurrentDialIndex(-1);
      }
    }, 2800);
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      l.course.toLowerCase().includes(filterQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Inquiries Dialed</span>
            <PhoneCall className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">1,842</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +24% this week
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Autonomous AI calling throughput</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">AI Lead Qualification</span>
            <CheckCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">91.6%</span>
            <span className="text-xs text-cyan-400 font-medium">High Accuracy</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Intent matched via CGC Knowledge RAG</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Hot Leads Ready</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">428</span>
            <span className="text-xs text-orange-400 font-medium">🔥 High Intent</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Admissions fee breakdown requested</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Avg. Call Handling</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">2m 45s</span>
            <span className="text-xs text-purple-400 font-medium">8x Faster than manual</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">OmniDimension Sarvam Ritu Engine</p>
        </div>

      </div>

      {/* Outbound Campaign Launcher Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Autonomous Outbound Auto-Dialer Pipeline
          </div>
          <h3 className="text-xl font-bold text-white">
            Simulate 1-Click AI Calling Campaign for CGC Leads
          </h3>
          <p className="text-xs text-slate-400 max-w-xl mt-1">
            CGC counselors can trigger batch calls to registered students. The AI agent asks eligibility, explains scholarships, and updates CRM status instantly.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleStartCampaign}
            disabled={isDialingCampaign}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition shadow-xl w-full md:w-auto ${
              isDialingCampaign
                ? "bg-amber-600 text-white animate-pulse"
                : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold shadow-emerald-500/20"
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            {isDialingCampaign ? `Auto-Dialing Lead #${currentDialIndex + 1}...` : "Launch AI Calling Campaign"}
          </button>

          <button
            onClick={onTriggerLiveCall}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            Test Live Inbound Call
          </button>
        </div>
      </div>

      {/* Leads Table & Transcript Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Leads Table */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <h4 className="text-base font-bold text-white">Recent Admission Enquiries</h4>
              <p className="text-xs text-slate-400">Click any student to view AI call transcript</p>
            </div>
            
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter by name, course..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-800 text-xs text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800">
                  <th className="pb-3 font-semibold">Student</th>
                  <th className="pb-3 font-semibold">Course Preference</th>
                  <th className="pb-3 font-semibold">12th %</th>
                  <th className="pb-3 font-semibold">AI Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead, idx) => {
                  const isCurrent = isDialingCampaign && currentDialIndex === idx;
                  const isSelected = selectedLead?.id === lead.id;

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent
                          ? "bg-amber-950/40 text-amber-200"
                          : isSelected
                          ? "bg-emerald-950/40 text-emerald-100"
                          : "hover:bg-slate-800/50 text-slate-300"
                      }`}
                    >
                      <td className="py-3 px-2">
                        <div className="font-semibold text-white flex items-center gap-2">
                          {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>}
                          {lead.name}
                        </div>
                        <span className="text-[10px] text-slate-400">{lead.phone} • {lead.city}</span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="font-medium text-slate-200">{lead.course}</div>
                      </td>
                      <td className="py-3 px-2 font-mono text-slate-300">{lead.percentage}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                            lead.status === "Hot Lead"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : lead.status === "Warm Lead"
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                              : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          }`}
                        >
                          {isCurrent ? "📞 Dialing Now..." : lead.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Transcript & AI Notes */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Call Intelligence & Transcript</h4>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Duration: {selectedLead.callDuration}
              </span>
            </div>

            {/* Lead Meta */}
            <div className="p-3 my-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-white">{selectedLead.name} ({selectedLead.city})</span>
                <span className="text-emerald-400 font-semibold">{selectedLead.sentiment}</span>
              </div>
              <p className="text-slate-400 text-[11px]">{selectedLead.notes}</p>
            </div>

            {/* Dialog transcript */}
            <div className="space-y-2.5 overflow-y-auto max-h-[260px] pr-2 text-xs">
              {selectedLead.transcript.map((t, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl ${
                    t.speaker === "AI Counselor"
                      ? "bg-slate-800/80 border border-slate-700/60 text-slate-200"
                      : "bg-emerald-950/40 border border-emerald-800/50 text-emerald-200"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider font-bold block mb-0.5 text-slate-400">
                    {t.speaker}
                  </span>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Synced with Supabase CRM Database
            </span>
            <button
              onClick={() => alert(`Sent WhatsApp brochure & fee breakdown to ${selectedLead.name} (${selectedLead.phone})`)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-md shadow-emerald-700/20"
            >
              Send WhatsApp Brochure
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
