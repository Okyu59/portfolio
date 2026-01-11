import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mail, Menu, X, Briefcase, GraduationCap, Award, ExternalLink, Download, Sparkles, MessageSquare, Send, Loader2 } from 'lucide-react';

// --- GEMINI API CONFIGURATION ---
const apiKey = ""; // Runtime environment provides this key.

const callGemini = async (prompt, systemContext = "") => {
  if (!apiKey) {
    console.error("API Key is missing.");
    return "Error: API Key is missing. Please check the environment configuration.";
  }

  const fullPrompt = systemContext 
    ? `Context: ${systemContext}\n\nQuestion/Task: ${prompt}`
    : prompt;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't process your request at this moment. Please try again later.";
  }
};


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
    ),
    rawText: "Okyu Choi Portfolio. Product Designer. Relentlessly Simplifying Financial Complexity."
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
            <li><strong className="text-gray-800">Hanwha Life</strong> | Lead Product Designer (2021 – 2025)</li>
            <li><strong className="text-gray-800">LG CNS</strong> | UX/UI Designer (2019 – 2021)</li>
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
    ),
    rawText: "Introduction. I specialize in removing friction from legacy financial services. Experience: Samsung Card, Hanwha Life, LG CNS. Education: KAIST (M.S), Univ of Tsukuba (B.A)."
  },
  // Page 3: Hanwha Life Claim (Intro)
  {
    id: 3,
    category: "Project 01: Mobile Claim",
    title: "Fail-proof Insurance Claim Experience",
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
    ),
    rawText: "Project: Fail-proof Insurance Claim Experience. Achievements: Reduced returns by 480/month, +15.4% mobile claims, 4.2 App Store Rating. Role: Lead Product Designer."
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
    ),
    rawText: "Problem: Users struggled with jargon and complex forms. High drop-off at Details Input and Document Upload. VOC: 'Photo was blurry, claim rejected'."
  },
  // Page 5: Hanwha Life Claim (Solution 1)
  {
    id: 5,
    category: "Project 01: Mobile Claim",
    title: "Solution: Plain Language & Flow",
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
    ),
    rawText: "Solution: UX Writing - Changed 'Beneficiary' to 'Person receiving money'. Progressive Disclosure - One Thing Per Page pattern to reduce cognitive load."
  },
  // Page 6: Hanwha Life Claim (Solution 2)
  {
    id: 6,
    category: "Project 01: Mobile Claim",
    title: "Solution: Error Prevention (Poka-yoke)",
    subtitle: "Smart Camera Guide",
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
    ),
    rawText: "Solution: Error Prevention. Solved blurry photo issues with Guide Frame and Sharpness Check validation step."
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
    ),
    rawText: "Solution: Peak-End Rule. Asked for app review right after submission success. Impact: Rating increased from 1.8 to 4.2. Review count increased 8.3x."
  },
  // Page 8: Hanwha App Renewal (Intro)
  {
    id: 8,
    category: "Project 02: App Renewal",
    title: "Customer-Centric App Renewal",
    subtitle: "From Agent-Managed to Self-Managed",
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
    ),
    rawText: "Project 2: App Renewal. Concept: Agent-Managed to Self-Managed. Results: +140k MAU, +1.5M Total Downloads."
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
    ),
    rawText: "Problem: Insurance apps are low engagement (6 visits/month). Hypothesis: Replicating human agent 'care' via app will increase visitation."
  },
  // Page 10: Hanwha App Renewal (Solution)
  {
    id: 10,
    category: "Project 02: App Renewal",
    title: "Solution: Data-Driven Personalization",
    subtitle: "Relationship Building",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Digital Nudges</h4>
          <p className="text-gray-600 text-sm">
            Replaced generic ads with personalized notifications for life events (birthdays, anniversaries) and contract updates, mimicking a personal agent's touch.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Value-First Information</h4>
          <p className="text-gray-600 text-sm">
             Instead of confusing product names, we highlighted <strong>"Expected Pension Amount"</strong> and <strong>"Max Coverage"</strong> to show tangible user value immediately.
          </p>
        </div>
      </div>
    ),
    rawText: "Solution: Digital Nudges (Personalized notifications for birthdays/updates). Value-First Info (Expected Pension Amount instead of product names)."
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
    ),
    rawText: "Project 3: LG CNS Haru Jogak MyData Platform. Strategy: Combine Financial Data with Lifestyle Data. Achievement: 200k users in 3 months, First non-financial MyData license."
  },
  // Page 12: LG CNS MyData (Detail)
  {
    id: 12,
    category: "Project 03: MyData Platform",
    title: "Feature: Automated Life-Log",
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
           <div className="bg-gray-100 p-2 rounded">Financial Data<br/><span className="text-gray-900 font-bold">Spending, Transfer</span></div>
           <div className="bg-gray-100 p-2 rounded">Lifestyle Data<br/><span className="text-gray-900 font-bold">Location, Search</span></div>
        </div>
      </div>
    ),
    rawText: "Feature: Automated Life-Log. Maps spending data with location/search history to answer 'What was I doing when I spent this money?'."
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
            In a Super-app environment merging 4 affiliates, maintaining a consistent brand voice was inefficient and prone to errors.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Solution</h4>
          <p className="text-gray-600 text-sm">
            Developed a custom internal assistant using <strong>Samsung FabriX</strong> (LLM). It enables designers to instantly generate copy that aligns with Monimo's specific persona and writing guidelines.
          </p>
        </div>
      </div>
    ),
    rawText: "Project 4: AI UX Writing Assistant. Problem: Inconsistent brand voice across 4 affiliates. Solution: Built custom assistant on Samsung FabriX (LLM) to enforce persona and guidelines."
  },
  // Page 14: Global Project (Tagless)
  {
    id: 14,
    category: "Global Project",
    title: "Tagless Payment System",
    subtitle: "Bogota, Colombia POC",
    content: (
      <div className="space-y-5">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Project Overview</h4>
          <p className="text-gray-600 text-sm">
            Designed a "Walk-through" payment experience (Tagless) using Bluetooth beacon technology, eliminating the need to physically tap cards.
          </p>
        </div>
        <div>
           <h4 className="font-bold text-gray-900 mb-1">Role</h4>
           <p className="text-gray-600 text-sm">UX/UI Design (100%) & Field Testing in Colombia.</p>
        </div>
      </div>
    ),
    rawText: "Global Project: Tagless Payment System POC in Bogota. Designed walk-through payment using Bluetooth Beacons. Role: UX/UI Design & Field Testing."
  },
  // Page 15: Global Project (Japan)
  {
    id: 15,
    category: "Global Project",
    title: "AI Care for Japanese Moms",
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
             An AI speaker-based service focusing on child safety checks and emotional bonding rather than education.
          </p>
        </div>
      </div>
    ),
    rawText: "Global Project: Japan Naver Design Camp. Insight: Japanese moms prioritize safety/emotion over education. Concept: Clova Sensei - AI speaker for safety checks and bonding."
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
          <p className="text-xs text-gray-500 mb-2">Gamified Habit Forming App</p>
          <p className="text-gray-600 text-sm">
             Designed a platform to help users form healthy habits (e.g., taking vitamins) through gamification mechanics.
          </p>
        </div>
        <div className="border-t pt-4">
          <h4 className="font-bold text-gray-900 text-lg mb-1">Sogle Sogle</h4>
          <p className="text-xs text-gray-500 mb-2">Accessibility App</p>
          <p className="text-gray-600 text-sm">
             A communication tool for the hearing impaired that converts voice to subtitles and sign language in real-time.
          </p>
        </div>
      </div>
    ),
    rawText: "Side Projects. Kiip: Gamified Vitamin Habit App. Sogle Sogle: Voice-to-Subtitle/Sign Language app for hearing impaired."
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
            <li>Monimo Partnership Service UX Design</li>
            <li>Wallet Service Advanced Research</li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-orange-600 mb-1">2023-2024 (Hanwha Life)</div>
          <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
            <li>Mobile Claim Process Improvement (Project Lead)</li>
            <li>Proxy Claim Service Construction (Project Lead)</li>
            <li>Contractor Change Service (Project Lead)</li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-orange-600 mb-1">2021-2022 (Hanwha Life)</div>
          <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
            <li>Insurance D2C Platform Planning</li>
            <li>Mobile App Renewal (Research & UX)</li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-gray-700 mb-1">2019-2021 (LG CNS)</div>
          <ul className="list-disc list-inside text-gray-600 pl-1 space-y-1">
            <li>Tagless Transport Card App</li>
            <li>MyData Platform Construction</li>
            <li>LG Group Employee ID Integration</li>
          </ul>
        </div>
      </div>
    ),
    rawText: "Timeline. 2025: Samsung Card Monimo UX. 2023-24: Hanwha Life Claim UX (PL). 2021-22: Hanwha D2C/Renewal. 2019-21: LG CNS Tagless/MyData."
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
    ),
    rawText: "Contact Page. LinkedIn: https://www.linkedin.com/in/okyu59/"
  }
];

// --- COMPONENTS FOR AI FEATURES ---

// 1. AI Summary Modal Component
const AISummaryModal = ({ isOpen, onClose, summary, isLoading }) => {
    if (!isOpen) return null;
    return (
        <div className="absolute top-20 right-4 z-50 w-80 bg-white rounded-lg shadow-2xl border border-blue-100 p-4 animate-in slide-in-from-right fade-in duration-300">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    <h4 className="font-bold text-gray-900 text-sm">Gemini Insight</h4>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
            </div>
            {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-6 space-y-3">
                    <Loader2 className="animate-spin text-blue-600" size={24} />
                    <span className="text-xs text-gray-500">Analyzing this page...</span>
                 </div>
            ) : (
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {summary}
                </div>
            )}
        </div>
    );
};

// 2. Chat Widget Component
const AIChatWidget = ({ isOpen, setIsOpen, portfolioContext }) => {
    const [messages, setMessages] = useState([
        { role: 'system', text: "Hello! I'm Okyu's AI Assistant powered by Gemini. Ask me anything about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");
        setIsLoading(true);

        // Prepare context
        const contextString = portfolioData.map(p => `Page ${p.id} (${p.category}): ${p.rawText}`).join("\n");
        const systemInstruction = `You are an AI assistant for Okyu Choi's UX Portfolio. 
        You are talking to a recruiter or hiring manager. 
        Use the following portfolio content to answer questions confidently and professionally.
        Highlight his data-driven approach and problem-solving skills.
        
        Portfolio Content:
        ${contextString}`;

        const reply = await callGemini(userMsg, systemInstruction);
        
        setMessages(prev => [...prev, { role: 'ai', text: reply }]);
        setIsLoading(false);
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="absolute bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 z-50 flex items-center gap-2"
            >
                <MessageSquare size={24} />
                <span className="font-bold text-sm pr-1">Ask AI</span>
            </button>
        );
    }

    return (
        <div className="absolute bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom fade-in duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex justify-between items-center text-white shrink-0">
                <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-yellow-400" />
                    <div>
                        <h3 className="font-bold text-sm">Portfolio Assistant</h3>
                        <p className="text-[10px] text-gray-300">Powered by Gemini 2.5</p>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                            msg.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                         <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm flex gap-2 items-center">
                            <Loader2 className="animate-spin text-blue-600" size={16} />
                            <span className="text-xs text-gray-500">Typing...</span>
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about my projects..."
                        className="flex-1 bg-gray-100 border-0 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // AI Summary State
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

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
      // Close summary when changing pages
      setSummaryOpen(false);
  }, [currentPage]);

  // AI Function: Summarize Current Page
  const handleSummarizePage = async () => {
      if (summaryOpen) {
          setSummaryOpen(false);
          return;
      }
      
      setSummaryOpen(true);
      if (!currentData.rawText) return;

      setIsSummarizing(true);
      const prompt = `Summarize the following portfolio page content for a recruiter in one concise sentence highlighting the key impact or skill: "${currentData.rawText}"`;
      const result = await callGemini(prompt);
      setSummaryText(result);
      setIsSummarizing(false);
  };

  // 이미지 경로 생성 함수
  const getImagePath = (index) => `img/${index + 1}.jpg`;

  return (
    <div className="flex flex-col h-screen bg-neutral-900 font-sans text-gray-800 overflow-hidden relative">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-sm">
            OC
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Okyu Choi</h1>
            <p className="text-xs text-gray-500">Product Designer</p>
          </div>
        </div>

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

        <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row relative">
        
        {/* LEFT: VISUAL (Image) */}
        <div className="flex-1 bg-neutral-900 relative flex items-center justify-center overflow-hidden p-2 md:p-8">
            <div className="relative shadow-2xl max-w-full max-h-full">
                <img 
                    src={getImagePath(currentPage)} 
                    alt={`Portfolio Page ${currentPage + 1}`}
                    className="max-w-full max-h-[85vh] object-contain mx-auto rounded-sm"
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/800x600/333/FFF?text=Image+Not+Found\nSave+as+img/" + (currentPage + 1) + ".jpg";
                    }}
                />
            </div>
        </div>

        {/* RIGHT: CONTEXT (English Description) */}
        <div 
          ref={containerRef}
          className="w-full md:w-[400px] lg:w-[480px] bg-white border-l border-gray-200 overflow-y-auto flex flex-col shadow-2xl z-10 relative"
        >
          {/* AI Page Insight Button */}
          <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={handleSummarizePage}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-100"
              >
                  <Sparkles size={14} />
                  <span>AI Insight</span>
              </button>
          </div>

          {/* AI Summary Modal */}
          <AISummaryModal 
            isOpen={summaryOpen} 
            onClose={() => setSummaryOpen(false)} 
            summary={summaryText} 
            isLoading={isSummarizing} 
          />

          <div className="p-8 flex-1 pt-12">
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

          {/* Navigation */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0">
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

      {/* AI Chat Widget */}
      <AIChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} portfolioContext={portfolioData} />

    </div>
  );
};

export default App;
