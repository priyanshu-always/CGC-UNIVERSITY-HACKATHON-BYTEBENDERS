// Comprehensive Knowledge Base for CGC University (Jhanjeri, Mohali)
// Used by RAG engine and live voice agent responses

export const CGC_UNIVERSITY_DATA = {
  name: "CGC University, Jhanjeri (Chandigarh Group of Colleges)",
  location: "State Highway 12A, Jhanjeri, Mohali, Punjab 140307 (near Chandigarh)",
  accreditation: "NAAC A+ Accredited, approved by UGC, AICTE, PCI, BCI",
  tollFree: "1800-274-0404",
  email: "admissions@cgc.ac.in",
  website: "https://cgc.ac.in",

  highlights: {
    highestPackage: "₹1 Crore per annum (International / Landmark offer)",
    averagePackage: "₹6.5 - ₹8.5 LPA for core tech branches",
    placementOffers: "14,000+ placement offers",
    topRecruiters: "1,700+ leading companies including Amazon, Microsoft, Google, TCS, Wipro, Infosys, Deloitte, Capgemini, Cognizant",
    campusArea: "50+ Acres lush green smart campus with hi-tech labs and research centers",
    scholarships: "Up to 100% scholarship via CGC JOSH (Scholarship Test) & merit in 12th board exams",
  },

  programs: [
    {
      id: "btech-cse",
      name: "B.Tech. Computer Science & Engineering",
      school: "School of Engineering & Technology",
      duration: "4 Years (8 Semesters)",
      approxFeePerSem: "₹65,000 - ₹75,000",
      specializations: ["Artificial Intelligence & Machine Learning", "Data Science", "Cyber Security", "Cloud Computing & DevOps"],
      eligibility: "10+2 with Physics, Mathematics and one optional subject (Min 50% aggregate).",
      overview: "Industry-aligned syllabus with hands-on lab work, global certifications, hackathons, and tie-ups with top tech companies.",
    },
    {
      id: "bca",
      name: "Bachelor of Computer Applications (BCA)",
      school: "School of Advance Computing",
      duration: "3 Years (6 Semesters)",
      approxFeePerSem: "₹45,000 - ₹52,000",
      eligibility: "10+2 in any stream with Mathematics/Computer Science as a subject (Min 45-50%).",
      overview: "Focuses on software engineering, web full-stack development, mobile app design, and database management.",
    },
    {
      id: "bba",
      name: "BBA (Business Analytics / Digital Marketing / Finance)",
      school: "School of Business",
      duration: "3 Years (6 Semesters)",
      approxFeePerSem: "₹45,000 - ₹50,000",
      eligibility: "10+2 in any stream with at least 50% marks.",
      overview: "Develops entrepreneurial mindset, financial modeling, marketing analytics, and corporate internships.",
    },
    {
      id: "mba",
      name: "Master of Business Administration (MBA)",
      school: "School of Business",
      duration: "2 Years (4 Semesters)",
      approxFeePerSem: "₹70,000 - ₹80,000",
      eligibility: "Graduation in any discipline with minimum 50% marks + CAT/MAT/CMAT or university entrance score.",
      overview: "Executive mentoring, dual specializations (HR, Marketing, Finance, Business Analytics), live industry case studies.",
    },
    {
      id: "bpharm",
      name: "Bachelor of Pharmacy (B. Pharm)",
      school: "School of Pharmaceutical Sciences",
      duration: "4 Years (8 Semesters)",
      approxFeePerSem: "₹60,000 - ₹68,000",
      eligibility: "10+2 with Physics, Chemistry and Biology/Maths (Min 50% marks). PCI approved.",
      overview: "State-of-the-art pharmacology labs, formulation research, hospital training, and pharmaceutical industrial visits.",
    },
    {
      id: "law",
      name: "B.A. LL.B / LL.B / B.Com LL.B",
      school: "School of Legal Studies",
      duration: "5 Years Integrated / 3 Years LL.B",
      approxFeePerSem: "₹48,000 - ₹55,000",
      eligibility: "10+2 for integrated 5-year course (Min 45-50%) or Graduation for 3-year LL.B. BCI approved.",
      overview: "Moot court practice, legal aid clinics, internships with senior advocates and high courts.",
    },
    {
      id: "allied",
      name: "B.Sc. Medical Laboratory Sciences (MLS) & Radiology",
      school: "School of Allied & Health Sciences",
      duration: "3 - 4 Years",
      approxFeePerSem: "₹40,000 - ₹48,000",
      eligibility: "10+2 with Medical/PCB subjects (Min 50%).",
      overview: "Clinical rotations, pathology training, diagnostic imaging technology, hospital placements.",
    },
  ],

  campusFacilities: {
    hostels: "Separate AC and Non-AC hostels for boys and girls with 24/7 security, biometric attendance, Wi-Fi, laundry, and indoor games room.",
    hostelFee: "Approximately ₹85,000 to ₹1,20,000 per year including 4 meals daily (Breakfast, Lunch, Evening Snacks, Dinner).",
    transport: "Fleet of 100+ AC buses connecting Chandigarh, Mohali, Panchkula, Ambala, Patiala, Ropar, and Kharar.",
    sports: "Cricket stadium, synthetic basketball court, football ground, badminton, gym, table tennis, yoga center.",
    foodCourt: "Multiple multi-cuisine cafeterias, Nescafe kiosks, Subway, and bakery on campus.",
  },

  scholarshipProgram: {
    name: "CGC JOSH (Joint Online Scholarship & Honours Test)",
    pool: "₹12 Crore+ scholarship corpus",
    slabs: [
      { score: "93% and above in JOSH / 12th Board", benefit: "100% Tuition Fee Waiver" },
      { score: "85% to 92.99%", benefit: "50% Tuition Fee Waiver" },
      { score: "75% to 84.99%", benefit: "25% Tuition Fee Waiver" },
      { score: "65% to 74.99%", benefit: "15% Tuition Fee Waiver" },
    ],
  },
};

// Natural conversational intent matching engine for instant local counselor responses
export function answerCounselorQuery(queryText, language = "en") {
  const q = queryText.toLowerCase();

  // Greeting
  if (q.match(/\b(hi|hello|hey|namaste|sasriakal|sat sri akal|good morning|good afternoon)\b/)) {
    return {
      text: "Hello! Welcome to CGC University, Jhanjeri, Mohali. I'm Ritu, your AI admissions counsellor. Are you looking for information on B.Tech, Management, Pharmacy, or our 2026 scholarships?",
      intent: "greeting",
      sentiment: "positive",
      confidence: 0.98,
    };
  }

  // Fees query
  if (q.includes("fee") || q.includes("fees") || q.includes("kharcha") || q.includes("kitna lagega") || q.includes("cost") || q.includes("price")) {
    if (q.includes("hostel") || q.includes("living") || q.includes("rehna")) {
      return {
        text: "For hostels at CGC Jhanjeri, the yearly fee is between ₹85,000 to ₹1,20,000 depending on AC or Non-AC rooms. This includes 4 wholesome meals every day, high-speed Wi-Fi, laundry, and 24/7 security.",
        intent: "hostel_fees",
        sentiment: "neutral",
        confidence: 0.96,
      };
    }
    if (q.includes("cse") || q.includes("btech") || q.includes("engineering")) {
      return {
        text: "The semester tuition fee for B.Tech Computer Science and Engineering at CGC Jhanjeri is approximately ₹65,000 to ₹75,000 per semester. Furthermore, you can reduce this significantly with up to 100% scholarship through the CGC JOSH test!",
        intent: "btech_fees",
        sentiment: "positive",
        confidence: 0.97,
      };
    }
    if (q.includes("bca") || q.includes("bba")) {
      return {
        text: "The tuition fee for BCA and BBA programmes is approximately ₹45,000 to ₹52,000 per semester. We also offer merit-based fee waivers based on your 12th grade performance.",
        intent: "undergraduate_fees",
        sentiment: "positive",
        confidence: 0.95,
      };
    }
    return {
      text: "CGC Jhanjeri tuition fees vary by program: B.Tech is around ₹65,000-₹75,000 per semester, BBA and BCA are around ₹45,000-₹50,000, and Pharmacy is around ₹62,000. Which specific course are you considering?",
      intent: "general_fees",
      sentiment: "neutral",
      confidence: 0.92,
    };
  }

  // Placements query
  if (q.includes("placement") || q.includes("package") || q.includes("highest") || q.includes("salary") || q.includes("job") || q.includes("company") || q.includes("companies")) {
    return {
      text: "CGC Jhanjeri has stellar placements! Our landmark highest package touched ₹1 Crore per annum, with over 14,000+ placement offers and 1,700+ leading recruiters like Amazon, Microsoft, Google, Deloitte, and TCS visiting campus.",
      intent: "placements",
      sentiment: "positive",
      confidence: 0.99,
    };
  }

  // Scholarship query
  if (q.includes("scholarship") || q.includes("josh") || q.includes("discount") || q.includes("waiver") || q.includes("concession")) {
    return {
      text: "Yes! CGC University offers the 'CGC JOSH' scholarship test with a corpus of over ₹12 Crores. Students scoring above 93% in 12th or JOSH receive up to a 100% tuition fee waiver, and students with 85-92% get 50% waiver.",
      intent: "scholarship",
      sentiment: "positive",
      confidence: 0.98,
    };
  }

  // Hostel query
  if (q.includes("hostel") || q.includes("mess") || q.includes("food") || q.includes("stay") || q.includes("room")) {
    return {
      text: "We provide separate, premium AC and Non-AC hostels for both boys and girls on campus. You get 4 hygienic meals daily, high-speed Wi-Fi, 24/7 power backup, gym access, and strict biometric security.",
      intent: "hostel",
      sentiment: "positive",
      confidence: 0.95,
    };
  }

  // Courses / Programs query
  if (q.includes("course") || q.includes("program") || q.includes("branch") || q.includes("degree") || q.includes("subject")) {
    return {
      text: "CGC Jhanjeri offers flagship programs in B.Tech CSE (with AI/ML, Data Science, Cyber Security), BCA, BBA, MBA, B.Pharmacy, Law (BA LL.B & LL.B), and Allied Health Sciences. Which field interests you?",
      intent: "courses",
      sentiment: "positive",
      confidence: 0.94,
    };
  }

  // Admission Process query
  if (q.includes("admission") || q.includes("apply") || q.includes("eligibility") || q.includes("criteria") || q.includes("date") || q.includes("seat")) {
    return {
      text: "Admissions for the 2026-27 session are currently open! For B.Tech, 50% in 10+2 with PCM is required. You can apply online or visit our Jhanjeri campus directly. Would you like me to register your seat reservation right now?",
      intent: "admission_process",
      sentiment: "positive",
      confidence: 0.97,
    };
  }

  // Hindi / Punjabi language query
  if (q.includes("hindi") || q.includes("punjabi") || q.includes("kya haal hai") || q.includes("kiddan") || q.includes("sat sri akal")) {
    return {
      text: "Haanji bilkul! Aap Hindi ya Punjabi me bhi baat kar sakte hain. CGC Jhanjeri me B.Tech, BCA, BBA aur Pharmacy ke admissions shuru hain. Aapko kis course ki detail chahiye?",
      intent: "multilingual",
      sentiment: "positive",
      confidence: 0.99,
    };
  }

  // Location / Campus query
  if (q.includes("location") || q.includes("kahan") || q.includes("where") || q.includes("address") || q.includes("reach")) {
    return {
      text: "CGC University is located in Jhanjeri, Mohali, Punjab — just a 20-minute drive from Chandigarh city. We also operate over 100 AC buses covering Chandigarh, Mohali, Panchkula, Ambala, and Patiala.",
      intent: "location",
      sentiment: "neutral",
      confidence: 0.96,
    };
  }

  // Default intelligent fallback
  return {
    text: "CGC Jhanjeri offers top-ranked degree courses with a ₹1 Crore highest package and 14,000+ placements. I can share details on B.Tech CSE, fees, hostel rooms, or our 100% CGC JOSH scholarship. What would you like to know?",
    intent: "general_inquiry",
    sentiment: "neutral",
    confidence: 0.85,
  };
}
