import { useState } from "react";
import {
  PhoneCall,
  Search,
  Bell,
  X,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
  Lock,
} from "lucide-react";
import { CGC_UNIVERSITY_DATA } from "../data/cgcKnowledge.js";
import { saveAdmissionLead } from "../lib/supabase.js";
import { dispatchOutboundCall } from "../lib/dispatchCall.js";

const INDIAN_STATES = [
  "Punjab",
  "Haryana",
  "Himachal Pradesh",
  "Chandigarh",
  "Delhi NCR",
  "Uttar Pradesh",
  "Rajasthan",
  "Bihar",
  "Jammu & Kashmir",
  "Uttarakhand",
  "Madhya Pradesh",
  "West Bengal",
  "Maharashtra",
  "Jharkhand",
  "Assam",
];

export default function CgcOfficialLanding({ onLaunchCall }) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  // Official Apply Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    state: "Punjab",
    city: "Mohali",
    course: "B.Tech. Computer Science & Engineering",
    agree: true,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleOpenApplyModal = (preselectedCourse = "") => {
    if (preselectedCourse) {
      setFormData((prev) => ({ ...prev, course: preselectedCourse }));
    }
    setFormSubmitted(false);
    setIsApplyModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const fullPhone = `${formData.countryCode} ${formData.phone}`;
    try {
      // 1. Save to Supabase CRM Database
      await saveAdmissionLead({
        full_name: formData.name,
        phone: fullPhone,
        email: formData.email,
        program_interest: formData.course,
        programme: formData.course,
        call_consent: formData.agree,
        source: `CGC Portal Application (${formData.state}, ${formData.city})`,
      });

      // 2. Dispatch automated instant phone call via OmniDimension
      await dispatchOutboundCall({
        name: formData.name,
        phone: fullPhone,
        course: formData.course,
      });

      setFormSubmitted(true);
    } catch (err) {
      // Fallback dispatch even if database had a warning
      await dispatchOutboundCall({
        name: formData.name,
        phone: fullPhone,
        course: formData.course,
      });
      setFormSubmitted(true);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-white text-[#2e2e2e] font-sans antialiased selection:bg-[#9e0203] selection:text-white">
      
      {/* 1. TOP UTILITY STRIP (Matches official cgcuniversity.in) */}
      <div className="bg-[#1b263b] text-white text-[11px] py-1 px-4 sm:px-8 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Left links */}
          <div className="flex items-center gap-3.5 text-slate-300 font-semibold tracking-wider uppercase text-[10.5px]">
            <a href="https://gcp.cgcuniversity.in/" target="_blank" rel="noreferrer" className="hover:text-white transition">International</a>
            <span className="text-slate-500">|</span>
            <a href="#career" className="hover:text-white transition">Career</a>
            <span className="text-slate-500">|</span>
            <a href="#contact" className="hover:text-white transition">Contact Us</a>
            <span className="text-slate-500">|</span>
            <a href="https://admissions.cgcuniversity.in/" target="_blank" rel="noreferrer" className="hover:text-white transition">Admission Login</a>
            <span className="text-slate-500">|</span>
            <span className="blink-me text-red-400 font-bold tracking-wide">PH.D RESULT</span>
          </div>

          {/* Right utilities */}
          <div className="flex items-center gap-4">
            
            {/* 360 Virtual tour */}
            <a
              href="https://tour.cgcuniversity.in/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition font-medium"
            >
              <img
                src="https://www.cgcuniversity.in/frontend/images/common-images/virtual-tour.svg"
                alt="360 Tour"
                className="w-4 h-4 object-contain brightness-200"
              />
              <span className="text-[10px] uppercase font-bold tracking-wider">360° Virtual Tour</span>
            </a>

            <div className="h-3 w-px bg-slate-700 hidden sm:block"></div>

            {/* Social Icons from official site */}
            <div className="flex items-center gap-3">
              {[
                { name: "fb", url: "https://www.cgcuniversity.in/frontend/images/common-images/fb.svg", link: "https://www.facebook.com/cgcuniversitymohali" },
                { name: "x", url: "https://www.cgcuniversity.in/frontend/images/common-images/x.svg", link: "https://x.com/cgcuniversity" },
                { name: "linkedin", url: "https://www.cgcuniversity.in/frontend/images/common-images/linkedin.svg", link: "https://www.linkedin.com/company/cgcuniversitymohali/" },
                { name: "insta", url: "https://www.cgcuniversity.in/frontend/images/common-images/insta.svg", link: "https://www.instagram.com/cgcuniversitymohali" },
                { name: "youtube", url: "https://www.cgcuniversity.in/frontend/images/common-images/youtube.svg", link: "https://www.youtube.com/@cgcuniversitymohali" },
              ].map((s) => (
                <a key={s.name} href={s.link} target="_blank" rel="noreferrer">
                  <img
                    src={s.url}
                    alt={s.name}
                    className="w-3.5 h-3.5 object-contain opacity-80 hover:opacity-100 transition cursor-pointer invert"
                  />
                </a>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* 2. MAIN LOGO & NAVIGATION BAR (Matches official cgcuniversity.in) */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm transition-all">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">
          
          {/* Official CGC Mohali Logo */}
          <div className="flex items-center shrink-0 mr-6 lg:mr-10">
            <a href="/" className="flex items-center">
              <img
                src="/images/cgcu-logo.webp"
                alt="CGC University Mohali Logo"
                className="w-48 sm:w-56 h-auto object-contain"
              />
            </a>
          </div>

          {/* Navigation Links with generous spacing & hover underlines */}
          <nav className="hidden xl:flex items-center gap-7 lg:gap-8 text-[13px] font-bold text-[#2e2e2e] uppercase tracking-wider mx-auto">
            {["About", "Academics", "Programs", "Admission", "Campus Life", "Placements", "Industry Collaborations"].map((menu) => (
              <a
                key={menu}
                href={`#${menu.toLowerCase().replace(/\s+/g, "-")}`}
                className="relative py-1.5 hover:text-[#9e0203] transition-colors group whitespace-nowrap"
              >
                {menu}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#9e0203] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Header Section: Search + CGC UET Logo + Admission Helpline */}
          <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 shrink-0 ml-4">
            
            {/* Search Button */}
            <button
              onClick={() => handleOpenApplyModal()}
              title="Search"
              className="text-slate-600 hover:text-[#9e0203] transition p-1 cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            <div className="h-8 w-px bg-slate-300"></div>

            {/* CGC UET Logo (With brightness(0) filter so it displays crisp black on white) */}
            <div className="flex items-center">
              <img
                src="/images/cgcuet.png"
                alt="CGC UET Logo"
                className="h-9 sm:h-10 w-auto object-contain"
                style={{ filter: "brightness(0)" }}
              />
            </div>

            {/* Admission Helpline Section */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-[11px] font-semibold text-slate-700 tracking-tight mb-0.5 leading-none whitespace-nowrap">
                Admission Helpline
              </p>
              <button
                onClick={() => onLaunchCall()}
                title="Call Helpline 18005005005"
                className="bg-[#9e0203] hover:bg-[#800203] text-white font-extrabold text-[15px] tracking-wide px-5 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 leading-tight whitespace-nowrap cursor-pointer"
              >
                18005005005
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* 3. HERO PLACEMENT SECTION (Direct Replica from cgcuniversity.in) */}
      <section className="bg-[#f8f9fa] border-b border-slate-200 pt-10 pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="space-y-1.5">
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Best Private University in Punjab – CGC University, Mohali
            </p>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a2e] tracking-tight leading-tight max-w-3xl">
                A Legacy of <span className="text-[#9e0203]">Unwavering Commitment</span> in Securing Top–Tier Placements
              </h1>

              <button
                onClick={() => handleOpenApplyModal()}
                className="shrink-0 inline-flex items-center gap-2 bg-[#9e0203] hover:bg-[#800203] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-md shadow-lg hover:shadow-xl transition-all"
              >
                <span>VIEW PLACEMENTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 PLACEMENT CARDS WITH OFFICIAL CGC HOVER EFFECTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            
            {/* Card 1: 14000+ Placement Offers */}
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-2xl transition-all">
              <div className="p-4 bg-white border-b border-slate-100">
                <span className="text-3xl font-black text-[#9e0203] block tracking-tight">14000+</span>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Placement Offers
                </span>
              </div>
              <div className="h-68 overflow-hidden bg-slate-100 relative">
                <img
                  src="/images/events-1-campus-life.webp"
                  alt="CGC Placed Students"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#9e0203]/75 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-lg font-bold">14,000+ Offers</span>
                  <p className="text-xs text-white/90 mt-1 border-t border-white/30 pt-2">
                    Consecutive placement records across engineering, management, and pharmacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: 1700+ Recruiters */}
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-2xl transition-all">
              <div className="p-4 bg-white border-b border-slate-100">
                <span className="text-3xl font-black text-[#1b263b] block tracking-tight">1700+</span>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Recruiters
                </span>
              </div>
              <div className="h-68 overflow-hidden bg-slate-100 relative">
                <img
                  src="/images/events-2-campus-life.webp"
                  alt="Recruiters at CGC"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#9e0203]/75 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-lg font-bold">1,700+ Corporate Giants</span>
                  <p className="text-xs text-white/90 mt-1 border-t border-white/30 pt-2">
                    Amazon, Microsoft, Google, Juspay, TCS, Infosys, and Deloitte recruit here.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: 1 CR PA Highest Package */}
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-2xl transition-all">
              <div className="p-4 bg-white border-b border-slate-100">
                <span className="text-3xl font-black text-[#9e0203] block tracking-tight">
                  1 CR <span className="text-base text-slate-600">PA</span>
                </span>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Highest Package
                </span>
              </div>
              <div className="h-68 overflow-hidden bg-slate-100 relative">
                <img
                  src="/images/why-us-homepage-images.webp"
                  alt="Highest package student at CGC"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#9e0203]/75 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-lg font-bold">₹1 Crore Landmark</span>
                  <p className="text-xs text-white/90 mt-1 border-t border-white/30 pt-2">
                    Setting North India's benchmarks in global tech hiring packages.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: 50 LPA Package Offered */}
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-2xl transition-all">
              <div className="p-4 bg-white border-b border-slate-100">
                <span className="text-3xl font-black text-[#1b263b] block tracking-tight">50 LPA</span>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                  Package Offered by 9+ Companies
                </span>
              </div>
              <div className="h-68 overflow-hidden bg-slate-100 relative">
                <img
                  src="/images/events-3-campus-life.webp"
                  alt="CGC Campus Placements"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#9e0203]/75 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-lg font-bold">50 LPA Benchmark</span>
                  <p className="text-xs text-white/90 mt-1 border-t border-white/30 pt-2">
                    Offered by 9+ tier-1 companies for core engineering specializations.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. MARKS OF OUR EXCELLENCE (Accreditations & Rankings from live site) */}
      <section className="py-14 bg-white border-b border-slate-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9e0203]">
              Recognitions & Quality Standards
            </span>
            <h2 className="text-3xl font-black text-[#1a1a2e]">
              Marks of our Excellence!
            </h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Nationally accredited and globally ranked for academic rigor and research output.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "NAAC A+", subtitle: "CGPA 3.46 / 4.00", badge: "Highest Grade" },
              { title: "NIRF Ranked", subtitle: "Band 101–125 In North India", badge: "Ministry of Edu" },
              { title: "QS I-GAUGE", subtitle: "Diamond Rating Overall", badge: "Global Quality" },
              { title: "NBA Accredited", subtitle: "MBA, CSE & ECE Programs", badge: "Govt. Approved" },
              { title: "India Today", subtitle: "Ranked 2nd In Punjab", badge: "Top B-School" },
              { title: "Times B-School", subtitle: "Top 10 In North Zone", badge: "Survey 2025" },
            ].map((acc, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 bg-[#f8f9fa] hover:border-[#9e0203] hover:shadow-md transition text-center flex flex-col justify-between"
              >
                <div className="inline-block px-2 py-0.5 rounded-full bg-red-100 text-[#9e0203] text-[9px] font-bold uppercase mx-auto mb-2">
                  {acc.badge}
                </div>
                <h4 className="font-extrabold text-[#1a1a2e] text-base">{acc.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{acc.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RESEARCH & ENTREPRENEURSHIP HUB (From live site) */}
      <section className="py-14 bg-white border-b border-slate-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-[#9e0203] uppercase tracking-wider">
              Innovation Powerhouse
            </span>
            <h3 className="text-3xl font-black text-[#1a1a2e]">
              Research & Innovation at CGC University
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fostering entrepreneurship, deep-tech research, and patent commercialization with state-of-the-art incubation centres.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleOpenApplyModal()}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#9e0203] hover:underline"
              >
                <span>Explore Research Facilities</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { val: "2,600+", lbl: "Patents Filed" },
              { val: "2,800+", lbl: "Papers Published" },
              { val: "900+", lbl: "Patents Published" },
              { val: "₹15 Cr+", lbl: "Research Budget" },
              { val: "176+", lbl: "Patents Granted" },
              { val: "50+", lbl: "Startups Incubated" },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#f8f9fa] border border-slate-200 text-center">
                <span className="text-2xl font-black text-[#1b263b] block">{stat.val}</span>
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">{stat.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ACADEMIC PROGRAMMES */}
      <section id="programs" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9e0203]">
            Future-Ready Degrees
          </span>
          <h2 className="text-3xl font-black text-[#1a1a2e]">
            Programmes Offered at CGC University
          </h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Choose from industry-driven engineering, business, law, and healthcare curricula.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CGC_UNIVERSITY_DATA.programs.map((prog) => (
            <div
              key={prog.id}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>{prog.school}</span>
                  <span className="font-semibold text-[#9e0203]">{prog.duration}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{prog.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{prog.overview}</p>
                <div className="text-xs font-semibold text-slate-700 py-2 border-t border-slate-100 flex justify-between">
                  <span>Tuition:</span>
                  <span className="text-[#9e0203]">{prog.approxFeePerSem} / sem</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenApplyModal(prog.name)}
                className="mt-4 w-full py-2.5 rounded-lg bg-slate-100 hover:bg-[#9e0203] text-slate-700 hover:text-white text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Apply for {prog.name.split(" ")[0]}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CGC JOSH SCHOLARSHIPS */}
      <section id="admission" className="py-16 bg-[#f8f9fa] border-t border-slate-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#9e0203] uppercase tracking-wider">
              Merit-Based Financial Aid
            </span>
            <h3 className="text-3xl font-black text-[#1a1a2e]">
              CGC JOSH Scholarship Test (₹12 Crore Corpus)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              CGC University rewards academic excellence. Students with outstanding 12th board marks or high scores in CGC JOSH test receive up to 100% tuition fee waivers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {CGC_UNIVERSITY_DATA.scholarshipProgram.slabs.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200 text-center shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <span className="font-semibold text-slate-800 text-sm">{s.score}</span>
                <span className="font-black text-2xl text-[#9e0203] my-2">{s.benefit}</span>
                <button
                  onClick={() => handleOpenApplyModal()}
                  className="mt-2 text-xs font-bold text-slate-600 hover:text-[#9e0203] transition"
                >
                  Apply Under Slab →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMPREHENSIVE OFFICIAL FOOTER (Directly from cgcuniversity.in) */}
      <footer className="bg-[#0b0b0b] text-white pt-14 pb-10 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-slate-400">
            
            {/* Col 1: Campus Address */}
            <div className="space-y-3">
              <img
                src="https://www.cgcuniversity.in/frontend/images/common-images/cgcu-logo-white.webp"
                alt="CGC White Logo"
                className="w-44 h-auto object-contain"
              />
              <p className="text-slate-400 leading-relaxed text-[11.5px]">
                State Highway 12A, Chandigarh-Sirhind Road, Sahibzada Ajit Singh Nagar, Punjab 140307 (near Chandigarh).
              </p>
              <div className="space-y-1.5 pt-1 text-[11.5px]">
                <p className="flex items-center gap-2 text-white">
                  <Phone className="w-3.5 h-3.5 text-[#9e0203]" />
                  <span>Helpline: <strong>1800-500-5005</strong></span>
                </p>
                <p className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-[#9e0203]" />
                  <span>admissions@cgcuniversity.in</span>
                </p>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Quick Links</h5>
              {["Overview & History", "Recognitions & Approvals", "Leadership & Governance", "Campus Virtual Tour", "Life At CGC", "Student Welfare"].map((l) => (
                <p key={l}><a href="#link" className="hover:text-white transition">{l}</a></p>
              ))}
            </div>

            {/* Col 3: Admissions */}
            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Admissions 2026-27</h5>
              {["How to Apply?", "CGC JOSH Scholarship Test", "Fee Structure & Installments", "Hostel & Mess Booking", "Education Loan Assistance", "Anti-Ragging Committee"].map((l) => (
                <p key={l}><a href="#link" className="hover:text-white transition">{l}</a></p>
              ))}
            </div>

            {/* Col 4: Schools */}
            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Schools</h5>
              {["School of Engineering & Technology", "School of Management Studies", "School of Advance Computing", "School of Pharmaceutical Sciences", "School of Legal Studies", "School of Allied Health Sciences"].map((s) => (
                <p key={s}><a href="#schools" className="hover:text-white transition">{s}</a></p>
              ))}
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 CGC University, Mohali. All Rights Reserved.</p>
            <div className="flex gap-4">
              <span>Mandatory Disclosures</span>
              <span>•</span>
              <span>NIRF Data</span>
              <span>•</span>
              <span>Privacy Policy</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 9. FIXED RED "APPLY NOW" VERTICAL TAB ON RIGHT (Exact as cgcuniversity.in) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => handleOpenApplyModal()}
          title="Apply Now"
          className="bg-[#9e0203] hover:bg-[#800203] text-white font-extrabold text-[11px] tracking-widest px-3 py-6 rounded-l-md shadow-2xl transition-all [writing-mode:vertical-rl] rotate-180 flex items-center gap-2 cursor-pointer hover:pl-4"
        >
          <span>APPLY NOW</span>
        </button>
      </div>

      {/* 10. FLOATING BLUE NOTIFICATION BELL ON BOTTOM-LEFT (Official CGC Notification Component) */}
      <div className="fixed left-5 bottom-8 z-40">
        <button
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="relative w-10 h-10 rounded-full bg-[#0c91c4] hover:bg-[#0aa2db] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
        </button>

        {/* Notification card popup */}
        {notificationOpen && (
          <div className="absolute left-0 bottom-14 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 text-xs animate-in fade-in">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-[#9e0203] uppercase tracking-wide text-[10px]">
                Admissions Notification
              </span>
              <button
                onClick={() => setNotificationOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-slate-700 font-semibold mb-2 leading-relaxed">
              Admissions for session 2026-27 are now open. Speak to our admissions desk or apply online.
            </p>
            <button
              onClick={() => {
                setNotificationOpen(false);
                handleOpenApplyModal();
              }}
              className="w-full py-2 bg-[#9e0203] text-white font-bold rounded-lg text-center shadow-sm"
            >
              Apply Online
            </button>
          </div>
        )}
      </div>

      {/* 11. EXACT OFFICIAL CGC ADMISSION FORM MODAL (Opens on 'APPLY NOW') */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
            
            {/* Modal Header */}
            <div className="bg-[#9e0203] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-wide uppercase">
                  ADMISSIONS OPEN 2026-27
                </h3>
                <p className="text-[11px] text-white/80 font-medium">
                  CGC University, Mohali (Chandigarh Group of Colleges)
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6">
              {formSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                      Application Submitted Successfully!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name}</strong>. Your enquiry for <strong>{formData.course}</strong> has been received.
                    </p>
                    <p className="text-xs font-semibold text-slate-700 max-w-sm mx-auto pt-1">
                      Our admissions team will connect with you shortly. Meanwhile, please stay connected.
                    </p>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-6 py-2 bg-[#9e0203] hover:bg-[#800203] text-white text-xs font-bold rounded-md transition shadow-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                  
                  {/* Name field */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      *Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter Full Name"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#9e0203]"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      *Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter Email Address"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#9e0203]"
                    />
                  </div>

                  {/* Mobile Number with country code */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      *Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="w-24 border border-slate-300 rounded-md px-2 py-2 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#9e0203]"
                      >
                        <option value="+91">IN (+91)</option>
                        <option value="+977">NP (+977)</option>
                        <option value="+975">BT (+975)</option>
                        <option value="+880">BD (+880)</option>
                      </select>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10 digit number"
                        className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#9e0203]"
                      />
                    </div>
                  </div>

                  {/* State and City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        *State
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:outline-none focus:border-[#9e0203]"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        *City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Select City"
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#9e0203]"
                      />
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      *Course
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:outline-none focus:border-[#9e0203]"
                    >
                      {CGC_UNIVERSITY_DATA.programs.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Official Authorization Checkbox */}
                  <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-600 leading-normal">
                    <input
                      type="checkbox"
                      required
                      id="agreeTerms"
                      checked={formData.agree}
                      onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                      className="mt-0.5 accent-[#9e0203]"
                    />
                    <label htmlFor="agreeTerms" className="cursor-pointer">
                      I authorise CGC University, Mohali & its representatives to contact me with updates and notifications via Email/SMS/What'sApp/Call. This will override DND/NDNC.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-3 bg-[#9e0203] hover:bg-[#800203] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition"
                  >
                    {formLoading ? "Submitting..." : "Submit"}
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
