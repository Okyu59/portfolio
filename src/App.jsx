import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mail, Menu, X, Briefcase, GraduationCap, Award, ExternalLink, Download, Maximize2 } from 'lucide-react';

// --- DATA: UX 용어 및 표현 전면 검수 완료 (Revised for Global Standards) ---
const portfolioData = [
  // Page 1: Cover
  {
    id: 1,
    category: "Cover",
    title: "Okyu Choi Portfolio",
    subtitle: "Product Designer",
    content: (
      <div className="flex flex-col justify-center h-full">
         {/* 문구 삭제 요청 반영 */}
      </div>
    )
  },
  // Page 2: Intro & Resume
  {
    id: 2,
    category: "Introduction",
    title: "Relentlessly Simplifying Financial Complexity",
    subtitle: "Experience & Philosophy",
    content: (
      <div className="space-y-6 text-sm">
        <p className="text-gray-700 leading-relaxed">
          I specialize in removing friction from legacy financial services. My design process combines <strong>data-driven problem definition</strong> with <strong>rigorous user research</strong>. I collaborate intensively with engineering and business stakeholders to deliver measurable product impact.
        </p>
        <div className="border-t pt-4">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Briefcase size={16}/> Experience</h3>
          <ul className="space-y-2 text-gray-600">
            <li><strong className="text-gray-800">Samsung Card (Monimo UX)</strong> | Jun 2025 – Present</li>
            <li><strong className="text-gray-800">Hanwha Life Insurance</strong> | Product Designer (2021 – 2025)</li>
            <li><strong className="text-gray-800">LG CNS</strong> | UX/UI Designer (2019 – 2021)</li>
            <li><strong className="text-gray-800">Naver</strong> | Intern (2018)</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><GraduationCap size={16}/> Education</h3>
          <ul className="space-y-2 text-gray-600">
            <li><strong className="text-gray-800">KAIST</strong> | M.S. in Industrial Design (2016 – 2019)</li>
            <li><strong className="text-gray-800">Univ. of Tsukuba</strong> | B.A. in Product Design (2010 – 2016)</li>
          </ul>
        </div>
      </div>
    )
  },
  // Page 3: Hanwha Life Claim (Intro)
  {
    id: 3,
    category: "Project 01: Mobile Claim",
    title: "Frictionless Insurance Claims",
    subtitle: "Overview & Metrics",
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-bold text-blue-900 mb-2 text-sm uppercase tracking-wide">Key Achievements</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">▼480</div>
              <div className="text-[10px] text-gray-500 uppercase">Monthly Returned Claims</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">+15.4%</div>
              <div className="text-[10px] text-gray-500 uppercase">Mobile Claim Vol.</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">4.2★</div>
              <div className="text-[10px] text-gray-500 uppercase">App Store Rating</div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Role</h4>
          <p className="text-gray-600 text-sm">Lead Product Designer (Planning, UX/UI, UX Writing)</p>
        </div>
      </div>
    )
  },
  // Page 4: Hanwha Life Claim (Problem)
  {
    id: 4,
    category: "Project 01: Mobile Claim",
    title: "Problem: \"Why is my claim rejected?\"",
    subtitle: "Discovery & Pain Points",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">AS-IS Analysis</h4>
          <p className="text-gray-600 text-sm">
            The legacy app merely digitized complex paper forms without optimization. Users struggled with jargon and redundant fields.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Data Insight (Friction Points)</h4>
          <p className="text-gray-600 text-sm bg-red-50 p-3 rounded text-red-800">
            High drop-off rates detected at <strong>'Details Input' (54s)</strong> and <strong>'Document Upload' (1m 38s)</strong>.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Voice of Customer (VOC)</h4>
          <p className="text-gray-600 text-sm italic border-l-4 border-gray-300 pl-3">
            "I submitted the papers, but they told me to do it again because the photo was blurry."
          </p>
        </div>
      </div>
    )
  },
  // Page 5: Hanwha Life Claim (Solution 1)
  {
    id: 5,
    category: "Project 01: Mobile Claim",
    title: "Solution: Plain Language & Intuitive Flow",
    subtitle: "Reducing Cognitive Load",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 text-lg mb-2">1. UX Writing (Plain English)</h4>
          <p className="text-gray-600 text-sm mb-2">
            Translated strict insurance terminology into everyday conversational language to aid comprehension.
          </p>
          <div className="flex items-center gap-2 text-sm bg-gray-100 p-2 rounded">
            <span className="line-through text-gray-400">Beneficiary</span>
            <span className="text-gray-400">→</span>
            <span className="font-bold text-blue-600">"Person receiving the money"</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-lg mb-2">2. Progressive Disclosure</h4>
          <p className="text-gray-600 text-sm">
             Adopted a <strong>"One Thing Per Page"</strong> pattern. While this increased the total number of steps, it significantly reduced cognitive load and errors by allowing users to focus on one decision at a time.
          </p>
        </div>
      </div>
    )
  },
  // Page 6: Hanwha Life Claim (Solution 2)
  {
    id: 6,
    category: "Project 01: Mobile Claim",
    title: "Solution: Error Prevention (Poka-yoke)",
    subtitle: "Assisted Document Capture",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">The Issue</h4>
          <p className="text-gray-600 text-sm">
            Older demographics frequently submitted blurry or cut-off document photos, leading to high rejection rates ("Return-to-Customer").
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">The Solution</h4>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
            <li><strong>Guide Frame:</strong> An overlay guide to help users align documents correctly.</li>
            <li><strong>Sharpness Check:</strong> A mandatory validation step allowing users to verify legibility before submission.</li>
          </ul>
        </div>
      </div>
    )
  },
  // Page 7: Hanwha Life Claim (Solution 3)
  {
    id: 7,
    category: "Project 01: Mobile Claim",
    title: "Solution: The 'Peak-End' Rule",
    subtitle: "Turning Relief into Ratings",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Strategy</h4>
          <p className="text-gray-600 text-sm">
            Leveraged the <strong>"Peak-End Rule"</strong>. We captured the "moment of relief" immediately after a successful claim submission to ask for an app review, converting a high-friction task into a positive touchpoint.
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded border border-green-100">
          <h4 className="font-bold text-green-900 mb-2 text-sm uppercase">Impact</h4>
          <div className="flex justify-between items-center text-center">
             <div>
                <div className="text-xl font-bold text-green-700">1.8 <span className="text-sm text-gray-400">→</span> 4.2</div>
                <div className="text-[10px] text-gray-500">Rating Scale</div>
             </div>
             <div>
                <div className="text-xl font-bold text-green-700">8.3x</div>
                <div className="text-[10px] text-gray-500">Review Count Increase</div>
             </div>
          </div>
        </div>
      </div>
    )
  },
  // Page 8: Hanwha App Renewal (Intro)
  {
    id: 8,
    category: "Project 02: App Renewal",
    title: "Customer-Centric App Redesign",
    subtitle: "Transitioning from Agent-Led to Self-Service",
    content: (
      <div className="space-y-6">
        <div>
           <h4 className="font-bold text-gray-900 mb-1">Concept</h4>
           <p className="text-gray-600 text-sm">Empowering customers to manage their own insurance lifecycle without relying on offline agents.</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">+140k</div>
              <div className="text-xs text-gray-600">MAU Increase</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">+1.5M</div>
              <div className="text-xs text-gray-600">Total Downloads</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  // Page 9: Hanwha App Renewal (Problem)
  {
    id: 9,
    category: "Project 02: App Renewal",
    title: "Problem & Hypothesis",
    subtitle: "Breaking Old Habits",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Market Problem</h4>
          <p className="text-gray-600 text-sm">
            Insurance apps were historically static "inquiry-only" tools with low engagement (Avg. 6 visits/month).
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Hypothesis</h4>
          <p className="text-gray-600 text-sm italic">
            "If the mobile app can replicate the 'care' of a human agent (e.g., celebrating birthdays, notifying updates), users will visit more frequently."
          </p>
        </div>
      </div>
    )
  },
  // Page 10: Hanwha App Renewal (Solution)
  {
    id: 10,
    category: "Project 02: App Renewal",
    title: "Solution: Data-Driven Personalization",
    subtitle: "Building Digital Rapport",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Contextual Nudges</h4>
          <p className="text-gray-600 text-sm">
            Replaced generic ads with personalized notifications for life events (birthdays, anniversaries) and contract updates, recreating the care of a dedicated agent.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Benefit-Centric Information Value Over Jargon</h4>
          <p className="text-gray-600 text-sm">
             Instead of displaying obscure product names, we highlighted <strong>"Expected Pension Amount"</strong> and <strong>"Max Coverage"</strong> to demonstrate immediate value to the user.
          </p>
        </div>
      </div>
    )
  },
  // Page 11: LG CNS MyData (Intro)
  {
    id: 11,
    category: "Project 03: MyData Platform",
    title: "LG CNS 'Haru Jogak'",
    subtitle: "Life-Log Based MyData Platform",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Differentiation Strategy</h4>
          <p className="text-gray-600 text-sm">
            While competitors focused on "Asset Management," we differentiated by combining <strong>Financial Data</strong> with <strong>Lifestyle Data</strong> to create a comprehensive "Life Log."
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded text-sm text-purple-900">
           <strong>Achievement:</strong> Secured 200,000 users within 3 months and acquired the first MyData license for a non-financial IT company.
        </div>
      </div>
    )
  },
  // Page 12: LG CNS MyData (Detail)
  {
    id: 12,
    category: "Project 03: MyData Platform",
    title: "Feature: Life-Log Timeline Adding Context to Spending",
    subtitle: "Contextualizing Finance",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Concept</h4>
          <p className="text-gray-600 text-sm">
            "What was I doing when I spent this money?"<br/>
            The app automatically maps spending data (Credit card) with activity data (Google location, Search history) to provide a holistic view of the user's daily life.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
           <div className="bg-gray-100 p-2 rounded">Financial Data<br/><span className="text-gray-900 font-bold">Spending, Transfer (mydata) </span></div>
           <div className="bg-gray-100 p-2 rounded">Lifestyle Data<br/><span className="text-gray-900 font-bold">Location, Search (Google API)</span></div>
        </div>
      </div>
    )
  },
  // Page 13: Samsung Card AI (FabriX)
  {
    id: 13,
    category: "Project 04: AI UX Tool",
    title: "AI-Powered UX Writing Assistant",
    subtitle: "Samsung Card (Monimo)",
    content: (
      <div className="space-y-5">
        <div className="flex items-center gap-2 mb-2">
           <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded font-bold">Prompt Engineering</span>
           <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded font-bold">LLM Ops</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Problem</h4>
          <p className="text-gray-600 text-sm">
            Fragmented Brand Voice In a Super-app integrating four distinct financial affiliates, maintaining a consistent brand voice was inefficient and prone to inconsistency.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Solution</h4>
          <p className="text-gray-600 text-sm">
            AI-Powered Writing Assistant Developed a custom internal assistant using Samsung FabriX (LLM). This tool allows designers to instantly generate copy that perfectly adheres to Monimo's persona and guidelines, significantly reducing operational time.
          </p>
        </div>
      </div>
    )
  },
  // Page 14: Global Project (Tagless)
  {
    id: 14,
    category: "Global Project",
    title: "Tagless Fare Collection Pilot",
    subtitle: "Bogota, Colombia POC",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Project Overview</h4>
          <p className="text-gray-600 text-sm">
            Designed a frictionless "Walk-through" payment experience leveraging Bluetooth (BLE) beacon technology. This system eliminates the need for physical card tagging, allowing commuters to pass through gates seamlessly without breaking stride.
          </p>
        </div>
        <div>
           <h4 className="font-bold text-gray-900 mb-1">Role</h4>
           <p className="text-gray-600 text-sm">Sole UX/UI Designer & Led the end-to-end design process</p>
        </div>
      </div>
    )
  },
  // Page 15: Global Project (Japan)
  {
    id: 15,
    category: "Global Project",
    title: "AI Parenting Assistant for Working Moms",
    subtitle: "Naver Design Camp (Tokyo)",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">User Insight</h4>
          <p className="text-gray-600 text-sm">
             Through field research in Tokyo, we discovered that Japanese working moms prioritize <strong>"Safety & Emotional Connection"</strong> over "Academic Achievement" for their children.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Concept: Clova Sensei</h4>
          <p className="text-gray-600 text-sm">
             Clova Sensei A smart speaker service designed to foster emotional bonding and safety monitoring, deliberately shifting the focus away from traditional educational features.
          </p>
        </div>
      </div>
    )
  },
  // Page 16: Side Projects
  {
    id: 16,
    category: "Side Projects",
    title: "Agility & Ownership",
    subtitle: "Personal Projects",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-gray-900 text-lg mb-1">Kiip</h4>
          <p className="text-xs text-gray-500 mb-2">Healthcare platform</p>
          <p className="text-gray-600 text-sm">
             Gamified Habit Builder Designed a platform that gamifies daily routines to help users establish healthy habits, such as taking vitamins, through engaging rewards and challenges.
          </p>
        </div>
        <div className="border-t pt-4">
          <h4 className="font-bold text-gray-900 text-lg mb-1">Square Fit</h4>
          <p className="text-xs text-gray-500 mb-2">Live Home Fitness Platform</p>
          <p className="text-gray-600 text-sm">
             Designed a contactless matching service that connects users with expert trainers for real-time interactive workouts, addressing the need for accessible fitness during the pandemic.
          </p>
        </div>
        <div className="border-t pt-4">
          <h4 className="font-bold text-gray-900 text-lg mb-1">Sogle Sogle</h4>
          <p className="text-xs text-gray-500 mb-2">Accessibility Communication Tool</p>
          <p className="text-gray-600 text-sm">
             A real-time communication aid for the Deaf and Hard of Hearing. It bridges the communication gap by instantly converting spoken voice into live captions and sign language.
          </p>
        </div>
      </div>
    )
  },
  // Page 17: History List
  {
    id: 17,
    category: "History",
    title: "Project Timeline",
    subtitle: "Detailed Career History",
    content: (
      <div className="space-y-4 text-xs h-full overflow-y-auto">
        <div>
          <div className="font-bold text-blue-600 mb-1">2025 (Samsung Card)</div>
          <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
            <li>Monimo Partnership Service Design: Led UX strategy for partnership integration.</li>
            <li>Next-Gen Wallet Research: Conducted advanced research for digital wallet services.</li>
            <li>AI UX Initiatives: Developed an internal AI writing assistant using Samsung FabriX.</li>          
          </ul>
        </div>
        <div>
          <div className="font-bold text-orange-600 mb-1">2023-2024 (Hanwha Life Insurance)</div>
          <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
            <li>Mobile Claim Process Optimization (Project Lead): Streamlined the claim journey for efficiency.</li>
            <li>Proxy Claim Service Implementation (Project Lead): Designed end-to-end flows for third-party claims.</li>
            <li>Policyholder Change Service (Project Lead): Digitized the complex contractor change process.</li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-orange-600 mb-1">2021-2022 (Hanwha Life Insurance)</div>
          <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
            <li>D2C Insurance Platform Strategy: Planned the Direct-to-Consumer sales platform structure.</li>
            <li>Mobile App Redesign: Conducted user research and led the UX overhaul for the main app.</li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-gray-700 mb-1">2019-2021 (LG CNS)</div>
          <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
            <li>Tagless Fare Collection Pilot: Designed a hands-free transport payment system (Bogotá POC).</li>
            <li>MyData Platform Development: Built the UX architecture for financial data aggregation.</li>
            <li>LG Group Unified Account Platform: Built an integrated B2C membership system connecting all LG affiliates with a single login experience.</li>
          </ul>
        </div>
      </div>
    )
  },
  // Page 18: Outro
  {
    id: 18,
    category: "Contact",
    title: "Thank You",
    subtitle: "Get in Touch",
    content: (
      <div className="flex flex-col justify-center h-full space-y-6">
        <p className="text-gray-600">
          Thank you for reviewing my portfolio. I am open to new opportunities where I can solve complex problems with design.
        </p>
        <div className="flex flex-col gap-3">
             {/* Email Removed */}
            <a href="https://www.linkedin.com/in/okyu59/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <ExternalLink className="text-gray-700" size={20}/>
                <span className="text-gray-800 font-medium">LinkedIn Profile</span>
            </a>
        </div>
      </div>
    )
  }
];

// --- APP COMPONENT ---
const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const totalPages = portfolioData.length;
  const currentData = portfolioData[currentPage];

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  useEffect(() => {
      if(containerRef.current) containerRef.current.scrollTop = 0;
  }, [currentPage]);

  // 이미지 경로 생성 함수
  const getImagePath = (index) => `img/${index + 1}.jpg`;

  // 모바일에서 이미지 클릭 시 새 탭 열기
  const handleImageClick = () => {
    if (window.innerWidth < 768) { // md breakpoint 기준
      window.open(getImagePath(currentPage), '_blank');
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-neutral-900 font-sans text-gray-800 overflow-hidden relative">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 z-10 shrink-0 shadow-sm relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-sm">
            OC
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Okyu Choi</h1>
            <p className="text-xs text-gray-500">Product Designer</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
             Page {currentPage + 1} / {totalPages}
          </span>
          <a
            href="https://drive.google.com/file/d/1P0iv6keHnQmrVJIUBEvT-mIfc2dhrICT/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <Download size={16} /> Download PDF
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50 border-b border-gray-200 md:hidden animate-in slide-in-from-top-5">
          <div className="p-4 flex flex-col gap-2">
             <div className="text-xs text-gray-500 mb-2 px-2">
               Page {currentPage + 1} / {totalPages}
             </div>
             <a
              href="https://drive.google.com/file/d/1P0iv6keHnQmrVJIUBEvT-mIfc2dhrICT/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <Download size={16} /> Download PDF
            </a>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row relative">
        
        {/* LEFT/TOP: VISUAL (Image) */}
        {/* Mobile: 45% height. Desktop: Full height (h-full) and takes remaining width (flex-1) */}
        <div className="h-[45dvh] md:h-full md:flex-1 bg-neutral-900 relative flex items-center justify-center overflow-hidden p-0 md:p-8 shrink-0 cursor-zoom-in md:cursor-default" onClick={handleImageClick}>
            <div className="relative shadow-2xl w-full h-full flex items-center justify-center">
                <img 
                    src={getImagePath(currentPage)} 
                    alt={`Portfolio Page ${currentPage + 1}`}
                    className="w-full h-full object-contain mx-auto rounded-sm"
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/800x600/333/FFF?text=Image+Not+Found\nSave+as+img/" + (currentPage + 1) + ".jpg";
                    }}
                />
            </div>
            {/* Mobile-only Hint for tap */}
            <div className="absolute bottom-4 right-4 md:hidden bg-black/60 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
                <Maximize2 size={12} />
                <span>Tap to zoom</span>
            </div>
        </div>

        {/* RIGHT/BOTTOM: CONTEXT (English Description) */}
        <div 
          ref={containerRef}
          className="flex-1 w-full md:flex-none md:w-[320px] lg:w-[460px] bg-white border-l border-gray-200 overflow-y-auto flex flex-col shadow-2xl z-10 relative pb-[80px] md:pb-0"
        >
          <div className="p-6 md:p-8 flex-1">
            <div className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-4 rounded-sm">
              {currentData.category}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
              {currentData.title}
            </h2>
            <h3 className="text-sm text-gray-500 font-medium mb-6 uppercase tracking-wide">
              {currentData.subtitle}
            </h3>

            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
              {currentData.content}
            </div>
          </div>

          {/* Navigation - Fixed Bottom on Mobile / Normal Flow on Desktop */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:static md:w-full md:border-t-0 md:bg-gray-50 md:p-6 z-50">
            <div className="flex gap-3">
              <button 
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded border border-gray-300 font-medium text-sm transition-all ${currentPage === 0 ? 'opacity-30 cursor-not-allowed bg-gray-100' : 'hover:bg-white hover:shadow-sm bg-white'}`}
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button 
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded bg-black text-white font-medium text-sm transition-all ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 shadow-lg'}`}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
