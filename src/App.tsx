import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroMap } from "./components/HeroMap";
import { InteractiveTwin } from "./components/InteractiveTwin";
import { CitizenPortal } from "./components/CitizenPortal";
import { PredictiveInsights } from "./components/PredictiveInsights";
import { TrustVisual } from "./components/TrustVisual";
import { AIChatBot } from "./components/AIChatBot";
import {
  Sparkles,
  Zap,
  Droplet,
  Heart,
  Bus,
  ShoppingCart,
  TrendingUp,
  Shield,
  Activity,
  UserCheck,
  AlertOctagon,
  ChevronRight,
  Database,
  BarChart2,
  FileText,
  Clock,
  LogOut,
  Sliders,
  BellRing,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Eye,
  CheckCircle,
  X,
  User,
  Lock,
  Mail,
  Smartphone,
  CheckCircle2,
  Globe,
  Star,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Static mock trend of grid integrity
const trendData = [
  { day: "01 Jun", index: 92, reports: 12 },
  { day: "04 Jun", index: 94, reports: 8 },
  { day: "08 Jun", index: 88, reports: 22 },
  { day: "12 Jun", index: 91, reports: 14 },
  { day: "16 Jun", index: 95, reports: 9 },
  { day: "20 Jun", index: 94, reports: 11 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("landing");
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("commissioner@pulse.gov.in");
  const [userRole, setUserRole] = useState<string>("government"); // citizen, government, ngo
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authFeedback, setAuthFeedback] = useState("");

  const [alerts, setAlerts] = useState([
    { id: "1", district: "Karol Bagh Ward 12", issue: "Critical discrepancy on water tank valve stream.", severity: "high", age: "5 mins ago" },
    { id: "2", district: "Bhopal Sector 5", issue: "Ration delivery mismatch reported by 25 residents; portal claims fully cleared.", severity: "moderate", age: "2 hours ago" },
    { id: "3", district: "Chennai Hub C", issue: "Outage detected on Sector transformer. Verification index is current.", severity: "minor", age: "4 hours ago" }
  ]);

  // Handle seeding if DB is empty
  const handleSeedReports = async () => {
    try {
      const qs = await getDocs(collection(db, "reports"));
      if (qs.empty) {
        console.log("Firestore empty. Seeding realistic records for Bharat Pulse AI...");
        const seedItems = [
          {
            userId: "seed_u1",
            userEmail: "citizen.bhopal@pulse.in",
            title: "Severe pressure drop in central drinking pipelines",
            description: "No municipal water since 36 hours. Local tanker prices increased by 200%. Official portal declares 100% active operational pressure.",
            department: "Water",
            locationName: "Bhopal Ward 14",
            latitude: 23.254,
            longitude: 77.402,
            status: "disputed",
            contradictionDetected: true,
            aiVerificationScore: 92,
            aiAnalysis: "[ALERT LOG] Discrepancy Flagged. Official telemetry claims fully pressurized supply pipelines. However, local feedback vectors from water tank meters indicate supply shutoff. Anomaly matched. Status recommended: Disputed Outage.",
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            userId: "seed_u2",
            userEmail: "citizen.delhi@pulse.in",
            title: "Transformer sparking with smoke near Karol Bagh Main Market",
            description: "Substation transformer arcing after heavy lightning. Whole street block power is offline. Restoration crews not present.",
            department: "Electricity",
            locationName: "Karol Bagh, Delhi",
            latitude: 28.644,
            longitude: 77.188,
            status: "verified",
            contradictionDetected: false,
            aiVerificationScore: 88,
            aiAnalysis: "[LOG INTEGRATION] Incident Verified. Matching utility sensor grids confirm a protective fuse trip on Karol Bagh Substation Node-A2. Telemetry and citizen logs fully synchronized.",
            createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            userId: "seed_u3",
            userEmail: "ration.NGO@gmail.com",
            title: "Delayed grains consignment in ration shop-c4",
            description: "Shop operator claims allotment did not arrive. Over 100 people backlogged in queues. Ledger indicates clearance on 18th.",
            department: "Ration",
            locationName: "Karol Bagh, Delhi",
            latitude: 28.651,
            longitude: 77.192,
            status: "disputed",
            contradictionDetected: true,
            aiVerificationScore: 94,
            aiAnalysis: "[AI WARNING] Contradiction Detected. The PDS digital ledger manifests verified allotment transit to Karol Bagh Corridor Hub. However, citizen queuing timelines show continuous manual lag. Local inspection recommended.",
            createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ];

        for (const item of seedItems) {
          await addDoc(collection(db, "reports"), item);
        }
        console.log("Seeding complete!");
      }
    } catch (err) {
      console.error("Failed seeding database:", err);
    }
  };

  useEffect(() => {
    handleSeedReports();
  }, []);

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthFeedback("Establishing network connection...");
    setTimeout(() => {
      setAuthenticated(true);
      if (authMode === "register") {
        setUserEmail(authEmail || "citizen.citizen@pulse.gov.in");
        setUserRole("citizen");
      } else {
        setUserEmail(authEmail || "officer.delhi@pulse.gov.in");
        setUserRole("government");
      }
      setAuthFeedback("Authentication successful!");
      setTimeout(() => {
        setShowAuthModal(false);
        setAuthFeedback("");
      }, 1000);
    }, 1200);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserEmail("");
    setUserRole("citizen");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050816] text-white selection:bg-[#00E5FF] selection:text-[#050816] font-sans">
      
      {/* Navbar Container */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        authenticated={authenticated}
        onLoginClick={() => {
          setAuthMode("login");
          setShowAuthModal(true);
        }}
        userEmail={userEmail}
      />

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LANDING PAGE */}
          {activeTab === "landing" && (
            <motion.div
              key="landing-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-20 text-center md:text-left"
            >
              
              {/* SECTION 1: Hero Banner Grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left copy text block */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest w-fit mx-auto lg:mx-0">
                    <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                    AI Powered Public Service Intelligence
                  </div>

                  <h1 className="font-display font-extrabold text-4.5xl md:text-5.5xl leading-[1.05] tracking-tight text-white mb-2">
                    Trust Public <br className="hidden md:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#00FFB2] to-[#4F46E5]">
                      Information Again
                    </span>
                  </h1>

                  <p className="text-gray-400 text-base md:text-lg leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                    Bharat Pulse AI is an AI-powered Public Information Trust Engine that helps citizens access reliable public service information by analyzing government updates, citizen reports, historical patterns, and AI predictions.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab("dashboard")}
                      className="px-8 py-3 bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] text-[#050816] font-extrabold rounded-xl shadow-lg shadow-[#00E5FF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-mono tracking-wider text-xs uppercase border border-[#00E5FF]/30"
                      id="hero-explore-btn"
                    >
                      Command Center
                    </button>
                    
                    <button
                      onClick={() => setShowDemoModal(true)}
                      className="px-8 py-3 border border-white/20 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
                      id="hero-demo-btn"
                    >
                      Watch Demo
                    </button>
                  </div>

                  {/* Trust Metrics Row */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-left">
                    <div>
                      <span className="text-xl md:text-2xl font-black font-mono text-white block">24 Districts</span>
                      <span className="text-[9px] uppercase font-mono font-bold text-gray-500 tracking-wider">Pilot Operation</span>
                    </div>

                    <div>
                      <span className="text-xl md:text-2xl font-black font-mono text-[#00E5FF] block">95.8%</span>
                      <span className="text-[9px] uppercase font-mono font-bold text-gray-400 tracking-wider">AI Verification</span>
                    </div>

                    <div>
                      <span className="text-xl md:text-2xl font-black font-mono text-[#00FFB2] block">1.5M Ticks</span>
                      <span className="text-[9px] uppercase font-mono font-bold text-gray-500 tracking-wider">Telemetry Audited</span>
                    </div>
                  </div>

                </div>

                {/* Right India Map and live indicators */}
                <div className="lg:col-span-6 h-full">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] opacity-20 blur-xl"></div>
                    <HeroMap />
                  </div>
                </div>

              </div>

              {/* Floating Real-time Continuous Cards Simulation */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Electricity Reliability", value: "92%", color: "text-amber-400", bg: "bg-amber-950/20 border-amber-500/10" },
                  { label: "Water Distribution", value: "84%", color: "text-cyan-400", bg: "bg-cyan-950/20 border-cyan-500/10" },
                  { label: "Healthcare Standby", value: "88%", color: "text-emerald-400", bg: "bg-emerald-950/20 border-emerald-500/10" },
                  { label: "Transit Fleet Velocity", value: "79%", color: "text-indigo-400", bg: "bg-indigo-950/20 border-indigo-500/10" }
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${item.bg} text-left flex items-center justify-between`}>
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono block uppercase">{item.label}</span>
                      <span className={`text-xl font-bold font-mono ${item.color}`}>{item.value}</span>
                    </div>
                    <span className="flex h-2 w-2 rounded-full bg-[#00FFB2] animate-ping" />
                  </div>
                ))}
              </div>

              {/* SECTION 2: Problem Statement */}
              <div className="space-y-8 pt-6 border-t border-white/5">
                <div className="text-center space-y-2">
                  <span className="text-[#00E5FF] font-mono text-xs font-bold uppercase tracking-widest block">The Core Dispute</span>
                  <h2 className="font-display font-medium text-2xl md:text-3xl text-white">
                    The Modern Crisis of Public Information
                  </h2>
                  <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                    Citizens navigate a fragmented, noisy world where official proclamations and real-world utility services often contradict.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { title: "Conflicting Data", value: "Official portals declare 'Constant Active Supply' while whole neighborhoods run dry, leaving citizens without trustworthy resources." },
                    { title: "Delayed Updates", value: "Traditional municipal updates work on slow manual reports, taking days to register critical local grid outages." },
                    { title: "Noisy Reports", value: "Local feedback stream is unstructured and inconsistent, making individual complaints hard to localize or audit." },
                    { title: "Lack of Trust", value: "Citizens lose faith in administrative records when telemetry states 100% functionality but local taps stay dry." },
                    { title: "Offline Limits", value: "Suburban or rural outages cut off digital channels entirely, blocking vulnerable populations from real-time info." }
                  ].map((prob, i) => (
                    <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-rose-500/20 hover:bg-white/[0.04] transition-all text-left space-y-2">
                      <div className="h-6 w-6 rounded bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs font-mono font-bold">
                        0{i + 1}
                      </div>
                      <h4 className="font-bold text-sm text-white">{prob.title}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{prob.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: How Bharat Pulse Works */}
              <div className="space-y-8 pt-6">
                <div className="text-center space-y-2">
                  <span className="text-[#00FFB2] font-mono text-xs font-bold uppercase tracking-widest block">System Mechanism</span>
                  <h2 className="font-display font-medium text-2xl md:text-3xl text-white">
                    How Bharat Pulse Resolves Trust
                  </h2>
                  <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                    A multi-layered convergence engine processing citizen signals against hardware telemetry dynamically.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                  {/* Connecting lines illustration */}
                  <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] pointer-events-none -z-15"></div>

                  {[
                    { step: "01", label: "Signal Collection", desc: "Citizens submit geolocated micro-reports of local outages directly via mobile or low-connectivity cells.", icon: <Smartphone className="h-5 w-5 text-[#00E5FF]" /> },
                    { step: "02", label: "Oracle Telemetry", desc: "Autonomously queries live official schedules and sensor meters across power grids and pumping substations.", icon: <Database className="h-5 w-5 text-indigo-400" /> },
                    { step: "03", label: "Gemini Truth Audit", desc: "Cross-references logical contradictions, calculates discrepancy ratings and publishes explainable trust indices.", icon: <Sparkles className="h-5 w-5 text-[#00FFB2]" /> },
                    { step: "04", label: "Twin Containment", desc: "Models cascade impacts on overlapping infrastructure grids to offer administrators immediate stabilization keys.", icon: <Activity className="h-5 w-5 text-rose-400" /> }
                  ].map((step, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00E5FF]/40 transition-all text-left space-y-3 bg-gradient-to-b from-[#050816] to-[#0a0f26]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-gray-500">PHASE {step.step}</span>
                        <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          {step.icon}
                        </div>
                      </div>
                      <h4 className="font-bold text-base text-white">{step.label}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: Features Showcase */}
              <div className="space-y-8 pt-6">
                <div className="text-center space-y-2">
                  <span className="text-[#4F46E5] font-mono text-xs font-bold uppercase tracking-widest block">Capabilities</span>
                  <h2 className="font-display font-medium text-2xl md:text-3xl text-white">
                    Built for Infinite Scalability
                  </h2>
                  <p className="text-xs text-slate-400 max-w-xl mx-auto">
                    Robust platform specifications tailored for modern administrative grids.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "AI Trust Engine", desc: "Deep logic comparison resolving official metrics vs local citizen reports density within seconds.", icon: <Shield className="text-[#00E5FF]" /> },
                    { label: "Contradiction Detection", desc: "Instantly flag divergence indices—e.g. government says '100% power' vs 40 localized neighborhood warnings.", icon: <AlertOctagon className="text-rose-400" /> },
                    { label: "High-Fidelity Twin", desc: "STRESS-test cascades on power networks, water valves, emergency wards, and municipal fleets dynamically.", icon: <Activity className="text-amber-400" /> },
                    { label: "Citizen Mobile Portal", desc: "Simple interface for reports, automated location logging, status tracking, and community voting.", icon: <Smartphone className="text-indigo-400" /> },
                    { label: "Predictive Analytics", desc: "Continuous forecasting of impending utility failures based on weather pressure indexes and report volumes.", icon: <TrendingUp className="text-[#00FFB2]" /> },
                    { label: "Offline Mode Ready", desc: "Optimized for extreme low-packet networks via automated local SQLite buffering and SMS payload triggers.", icon: <Globe className="text-gray-400" /> }
                  ].map((feat, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all text-left space-y-3">
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {feat.icon}
                      </div>
                      <h4 className="font-bold text-sm text-white">{feat.label}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 5: Digital Twin Preview */}
              <div className="space-y-6 pt-6">
                <div className="text-center space-y-2">
                  <span className="text-[#00E5FF] font-mono text-xs font-bold uppercase tracking-widest block">Virtual Sandbox</span>
                  <h2 className="font-display font-medium text-2xl md:text-3xl text-white">
                    Digital Twin Sandbox Preview
                  </h2>
                  <p className="text-xs text-gray-400 max-w-lg mx-auto">
                    Animate stress patterns on virtual city networks and watch AI generate preventive stabilization protocols.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] opacity-10 blur-2xl"></div>
                  <InteractiveTwin />
                </div>
              </div>

              {/* SECTION 6: Testimonials */}
              <div className="space-y-8 pt-6">
                <div className="text-center space-y-2">
                  <span className="text-[#00FFB2] font-mono text-xs font-bold uppercase tracking-widest block">Validation</span>
                  <h2 className="font-display font-medium text-2xl md:text-3xl text-white">
                    Praised by Administrators & Citizens
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { quote: "Before Bharat Pulse AI, auditing neighborhood water pipeline pressure reports took weeks. Now we identify, analyze, and resolve utility trust contradictions in real-time.", author: "Shri S. K. Nair", role: "Chief Municipal Officer, Bhopal" },
                    { quote: "The trust index transparency is remarkable. Knowing the exact confidence score of localized grid outages tells us when to trust government numbers or order private delivery tankers.", author: "Priya Sharma", role: "Resident Advocate, Karol Bagh" },
                    { quote: "Integrating citizen signals into a database allows NGOs to support civil logistics during monsoon arcing periods. A complete benchmark for public data systems.", author: "Rajesh K. Gupta", role: "Director, Civil Logistics Trust India" }
                  ].map((t, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-left relative flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="text-xs text-amber-400 flex items-center gap-1">
                          {[...Array(5)].map((_, idx) => <Star key={idx} className="h-3 w-3 fill-current" />)}
                        </span>
                        <p className="text-xs text-gray-300 italic leading-relaxed font-sans">
                          "{t.quote}"
                        </p>
                      </div>
                      <div className="border-t border-white/10 pt-4 mt-6">
                        <h4 className="text-xs font-bold text-white">{t.author}</h4>
                        <span className="text-[10px] text-gray-400 font-mono font-medium">{t.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 7: CTA block */}
              <div className="rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden bg-gradient-to-r from-slate-950 via-[#0a0d24] to-slate-950 text-center space-y-6">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#00E5FF]/20 to-[#4F46E5]/20 rounded-full blur-[80px] pointer-events-none -z-10"></div>
                
                <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-widest block">SECURE ACCESS</span>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white">
                  Build Trust in Public Information
                </h3>
                <p className="text-xs text-gray-400 max-w-lg mx-auto font-sans leading-relaxed">
                  Join the leading Indian municipal grids modeling real-time factual telemetry. Instantly audit service status or run stress cascade simulators.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setShowAuthModal(true);
                    }}
                    className="px-8 py-3.5 bg-white text-slate-950 font-bold text-xs font-mono uppercase tracking-wider rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Request Console Demo
                  </button>
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="px-8 py-3.5 border border-white/20 bg-white/5 rounded-full font-bold text-xs font-mono uppercase tracking-wider hover:bg-white/10 text-white transition-all cursor-pointer"
                  >
                    Enter Sandbox
                  </button>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: SOLUTIONS INTERACTIVE PORTFOLIO */}
          {activeTab === "solutions" && (
            <motion.div
              key="solutions-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-left"
            >
              <div className="max-w-xl">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 tracking-wider">
                  SOLUTIONS PORTFOLIO
                </span>
                <h1 className="font-display font-medium text-3xl text-white mt-1">
                  Public Service Intelligence Grids
                </h1>
                <p className="text-xs text-slate-400 leading-relaxed mt-2 font-sans">
                  Inspect the structural telemetry algorithms mapping factual status updates vs official declarations. Choose a department to monitor.
                </p>
              </div>

              {/* Grid showing five detailed grid boards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Electricity */}
                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 hover:border-[#00E5FF]/45 transition-all duration-300 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-amber-400 flex items-center justify-center">
                        <Zap className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="font-sans font-medium text-sm text-white">Electricity Intelligence</h3>
                    </div>

                    <span className="text-[10px] font-mono bg-[#00FFB2]/10 text-[#00FFB2] font-bold border border-[#00FFB2]/20 py-0.5 px-2 rounded">
                      94% STABILIZED
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-normal font-sans">
                    Fuses microgrid sensors & citizen smart load telemetry with solar arcing forecasts to verify transformer outage reports automatically.
                  </p>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Predicted Stress Period</span>
                      <span className="text-amber-400 font-bold">14:00 - 16:30</span>
                    </div>

                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Overload Prob</span>
                      <span className="text-amber-400 font-bold">12.5%</span>
                    </div>
                  </div>
                </div>

                {/* 2. Water */}
                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 hover:border-[#00E5FF]/45 transition-all duration-300 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-[#00E5FF] flex items-center justify-center">
                        <Droplet className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="font-sans font-medium text-sm text-white">Water Supply pressure</h3>
                    </div>

                    <span className="text-[10px] font-mono bg-[#00E5FF]/10 text-[#00E5FF] font-bold border border-[#00E5FF]/20 py-0.5 px-2 rounded">
                      89% VOLUME
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-normal font-sans">
                    Monitors reservoir outbound valve operations, matching flow rates with municipal water-meter citizen notifications to spot pressure drops.
                  </p>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Main Pumping Gate-B</span>
                      <span className="text-cyan-400 font-bold">Active (44 GPM)</span>
                    </div>

                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Ward pressure Index</span>
                      <span className="text-cyan-400 font-bold">Normal range</span>
                    </div>
                  </div>
                </div>

                {/* 3. Healthcare */}
                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 hover:border-[#00E5FF]/45 transition-all duration-300 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-[#00FFB2] flex items-center justify-center">
                        <Heart className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="font-sans font-medium text-sm text-white">Healthcare Standby</h3>
                    </div>

                    <span className="text-[10px] font-mono bg-[#00FFB2]/10 text-[#00FFB2] font-bold border border-[#00FFB2]/20 py-0.5 px-2 rounded">
                      92/100 CAP
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-normal font-sans">
                    Consolidates public health emergency ICU bed availability vectors with municipal oxygen pressure data streams.
                  </p>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Oxygen reserve status</span>
                      <span className="text-[#00FFB2] font-bold">Normal safety (100h)</span>
                    </div>

                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Active ICU beds</span>
                      <span className="text-[#00FFB2] font-bold">421 Available</span>
                    </div>
                  </div>
                </div>

                {/* 4. Transport */}
                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 hover:border-[#00E5FF]/45 transition-all duration-300 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-indigo-400 flex items-center justify-center">
                        <Bus className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="font-sans font-medium text-sm text-white">Transit Operations</h3>
                    </div>

                    <span className="text-[10px] font-mono bg-indigo-950/40 text-indigo-400 font-bold border border-indigo-500/20 py-0.5 px-2 rounded">
                      LINK LAG: -2M
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-normal font-sans">
                    Reconciles GPS transit logs vs passenger queuing delays reported locally to identify backtracking routes and delays.
                  </p>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Central Metro Line</span>
                      <span className="text-indigo-400 font-bold">98% efficiency</span>
                    </div>

                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Route congestion</span>
                      <span className="text-indigo-400 font-bold">Low density</span>
                    </div>
                  </div>
                </div>

                {/* 5. Ration Logistics */}
                <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 hover:border-[#00E5FF]/45 transition-all duration-300 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-rose-400 flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4" />
                      </div>
                      <h3 className="font-sans font-medium text-sm text-white">Ration Distribution</h3>
                    </div>

                    <span className="text-[10px] font-mono bg-rose-950/40 text-rose-400 font-bold border border-rose-500/20 py-0.5 px-2 rounded">
                      LEDGER AUDITED
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-normal font-sans">
                    Secures automated transaction logs mapping grain transit routes, highlighting dispatch delays against municipal store ledgers.
                  </p>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Active allotment clearing</span>
                      <span className="text-rose-400 font-bold">94.2%</span>
                    </div>

                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-gray-400">PDS shop compliance</span>
                      <span className="text-rose-400 font-bold">Fully secured ledgers</span>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 3: TRUTH ENGINE RECOGNITION */}
          {activeTab === "trust" && (
            <motion.div
              key="trust-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <TrustVisual />
            </motion.div>
          )}

          {/* TAB 4: ENTERPRISE COMMAND CENTER (DASHBOARD) */}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-left animate-fade-in"
            >
              
              {/* Dynamic Role Switcher block for quick hackathon/investor checks */}
              <div className="p-4 bg-[#4f46e5]/10 border border-[#4f46e5]/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-mono font-bold text-[#00E5FF] uppercase">Demo Account Controller</h4>
                  <p className="text-[11px] text-gray-300 font-sans">
                    Cycle through citizen, administration or NGO accounts to inspect platform authorization scopes immediately.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {[
                    { id: "citizen", label: "Citizen Watchdog", email: "citizen.voter@gmail.com" },
                    { id: "government", label: "Grid Commissioner", email: "commissioner@pulse.gov.in" },
                    { id: "ngo", label: "NGO Ground Liaison", email: "field.ngo@redcross.org" }
                  ].map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setUserRole(role.id);
                        setUserEmail(role.email);
                        setAuthenticated(true);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all border cursor-pointer ${
                        userRole === role.id
                          ? "bg-[#00E5FF] text-[#050816] border-[#00E5FF] shadow-inner"
                          : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                  {authenticated && (
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1.5 bg-rose-950/40 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-mono hover:bg-rose-900/30 font-bold uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="h-3 w-3" />
                      Exit
                    </button>
                  )}
                </div>
              </div>

              {/* Welcome Alert banner & status summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white/[0.02] border border-white/10 p-5 rounded-2xl">
                <div className="md:col-span-8 space-y-1.5">
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wider">
                    Secured System Terminal
                  </span>
                  <h2 className="font-display font-medium text-xl text-white">
                    Command console for <span className="text-[#00E5FF]">{userEmail}</span>
                  </h2>
                  <p className="text-xs text-gray-400 font-sans">
                    Role Authorisation Level: <strong className="text-white uppercase font-mono">{userRole} control base</strong>. You have full telemetry verification access for region code <span className="font-mono text-[#00E5FF]">MP_BH_14 (Bhopal Metropolitan)</span>.
                  </p>
                </div>
                <div className="md:col-span-4 flex justify-end">
                  <div className="bg-[#050816] border border-white/10 px-5 py-3 rounded-xl text-center shadow-lg w-full sm:w-auto">
                    <span className="text-[9px] font-mono text-gray-500 block uppercase">Area Health Index</span>
                    <span className="text-3xl font-black font-mono text-[#00FFB2]">86/100</span>
                    <span className="text-[9px] text-[#00E5FF] font-mono block">● Optimally Functional</span>
                  </div>
                </div>
              </div>

              {/* Main Area Health Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Score block */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                      Total Pilot Districts
                    </span>
                    <span className="text-3xl font-bold font-mono tracking-tight text-white block">
                      24 Hubs
                    </span>
                    <span className="text-[10px] text-[#00FFB2] font-mono">
                      ● Active tracking operational
                    </span>
                  </div>
                  <Database className="h-10 w-10 text-gray-700" />
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                      Global Trust Score
                    </span>
                    <span className="text-3xl font-bold font-mono tracking-tight text-[#00E5FF] block">
                      87.4%
                    </span>
                    <span className="text-[10px] text-[#00E5FF] font-mono">
                      Discrepancies reconciled
                    </span>
                  </div>
                  <Shield className="h-10 w-10 text-[#00E5FF]/40" />
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                      Sync Accuracy Rate
                    </span>
                    <span className="text-3xl font-bold font-mono tracking-tight text-[#00FFB2] block">
                      95.8%
                    </span>
                    <span className="text-[10px] text-[#00FFB2] font-mono">
                      Telemetry validated via Gemini
                    </span>
                  </div>
                  <Activity className="h-10 w-10 text-[#00FFB2]/40" />
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                      Public Watchdogs
                    </span>
                    <span className="text-3xl font-bold font-mono tracking-tight text-white block">
                      15,402
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Citizens auditing grids
                    </span>
                  </div>
                  <UserCheck className="h-10 w-10 text-gray-700" />
                </div>

              </div>

              {/* Center Screen: Map/Alert Row vs. Line chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Chart and Incident streams on Left */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Recharts Integrity Trend card */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
                    <div>
                      <h3 className="font-display font-medium text-base text-white">System Integrity Convergence Index</h3>
                      <p className="text-[11px] text-gray-400">Comparing public confidence scores with official sensor stability (June 2026).</p>
                    </div>

                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="day" stroke="#475569" fontSize={10} fontFamily="var(--font-mono)" />
                          <YAxis domain={[80, 100]} stroke="#475569" fontSize={10} fontFamily="var(--font-mono)" />
                          <Tooltip contentStyle={{ backgroundColor: "#050816", borderColor: "rgba(255,255,255,0.1)", fontSize: "11px" }} />
                          <Area type="monotone" dataKey="index" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#colorIndex)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Citizen Reports List Container */}
                  <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
                    <CitizenPortal />
                  </div>

                </div>

                {/* Sidebar Alerts on Right */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Critical Alerts Feed */}
                  <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-5 space-y-4">
                    
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="font-display font-bold text-sm text-slate-100 flex items-center space-x-1.5">
                        <BellRing className="h-4 animate-bounce text-rose-500" />
                        <span>Discrepancy Alarm Queue</span>
                      </h3>
                      <span className="bg-rose-950 text-rose-400 text-[10px] font-mono px-2 py-0.5 rounded border border-rose-500/25">
                        {alerts.length} Pending
                      </span>
                    </div>

                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                      <AnimatePresence mode="popLayout">
                        {alerts.length === 0 ? (
                          <div className="py-8 text-center text-slate-500 text-xs">
                             Alarm queue cleared. Telemetry convergence healthy!
                          </div>
                        ) : (
                          alerts.map((al) => (
                            <motion.div
                              key={al.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="p-3 rounded-lg bg-rose-950/10 border border-rose-500/20 text-xs space-y-2"
                            >
                              <div className="flex items-start justify-between">
                                <div className="space-y-0.5">
                                  <span className="font-mono text-[9px] font-bold text-rose-400 uppercase tracking-widest block">
                                    {al.district}
                                  </span>
                                  <p className="text-slate-300 leading-relaxed font-sans">{al.issue}</p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-1 border-t border-rose-500/10 text-[9px] font-mono">
                                <span className="text-slate-500">{al.age}</span>
                                <button
                                  onClick={() => acknowledgeAlert(al.id)}
                                  className="text-[#00E5FF] hover:text-cyan-300 font-bold uppercase hover:underline cursor-pointer"
                                  id={`ack-alert-${al.id}`}
                                >
                                  Dismiss Anomaly
                                </button>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                  {/* AI Predictive Insights Column component */}
                  <PredictiveInsights />

                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 5: PUBLIC SERVICE DIGITAL TWIN */}
          {activeTab === "twin" && (
            <motion.div
              key="twin-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-left"
            >
              
              <div className="max-w-xl">
                <span className="text-[11px] font-mono font-bold uppercase text-rose-500 tracking-wider">
                  CASCADING OUTAGE SIMULATION
                </span>
                <h1 className="font-display font-medium text-3xl text-white mt-1">
                  Public Infrastructure Digital Twin
                </h1>
                <p className="text-xs text-slate-400 leading-relaxed mt-2 font-sans">
                  Execute synthetic failure stressors on interlocking municipal power networks, pump substations, transit routes, and hospital logistics. Let Bharat Pulse AI compute cascade pathways.
                </p>
              </div>

              <InteractiveTwin />

            </motion.div>
          )}

          {/* TAB 6: REPORTS STREAM AND SUBMISSION TAB */}
          {activeTab === "reports" && (
            <motion.div
              key="reports-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-left"
            >
              
              <div className="max-w-xl">
                <span className="text-[10px] font-mono font-bold uppercase text-[#00E5FF] tracking-wider">
                  CITIZEN ORACLE SYSTEM
                </span>
                <h1 className="font-display font-medium text-3xl text-white mt-1">
                  Report Directory & Audit Feed
                </h1>
                <p className="text-xs text-slate-400 leading-relaxed mt-2 font-sans">
                  Submit outage accounts or review live community logs. This system matches official claims against crowdsourced citizen telemetry to isolate contradictions.
                </p>
              </div>

              <div className="bg-[#0a0d24]/60 p-6 rounded-2xl border border-white/10">
                <CitizenPortal />
              </div>

            </motion.div>
          )}

          {/* TAB 7: ABOUT */}
          {activeTab === "about" && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-left max-w-4xl mx-auto"
            >
              
              <div className="text-center space-y-2 mb-8">
                <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-widest block">Project Mandate</span>
                <h1 className="font-display font-semibold text-3xl md:text-4xl text-white">
                  Bharat Pulse AI
                </h1>
                <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed font-mono">
                  The Intelligence Layer Between Citizens and Public Services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-lg text-white">Our Mission</h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    Traditional municipal channels are plagued by feedback loops delay. A water pipe rupture or electricity transformer blast takes days to map accurately, leaving citizens stranded and administrations misinformed.
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    Bharat Pulse AI was built for the <strong>SolveForIndia Hackathon</strong> to serve as an instant Public Information Trust Engine. By uniting crowdsourced mobile signals with physical hardware hardware telemetry, we help resolve logical contradictions immediately.
                  </p>
                </div>

                <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-lg text-white">Technical Architecture</h3>
                  <ul className="space-y-3.5 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 rounded flex items-center justify-center font-mono font-bold shrink-0">1</span>
                      <span className="font-sans text-gray-300"><strong>Data Harmonization</strong>: Streams multi-source vectors into Firestore, targeting unique database IDs autonomously.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/20 rounded flex items-center justify-center font-mono font-bold shrink-0">2</span>
                      <span className="font-sans text-gray-300"><strong>Gemini Reasoning</strong>: Employs <code>gemini-2.5-flash</code> models to evaluate contradiction factors server-side and generate transparent explanatory reasoning.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20 rounded flex items-center justify-center font-mono font-bold shrink-0">3</span>
                      <span className="font-sans text-gray-300"><strong>Stressor Twin Modeler</strong>: Maps cascade outages by solving interconnected node equations across utility lines instantly.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 8: CONTACT */}
          {activeTab === "contact" && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-left max-w-xl mx-auto"
            >
              
              <div className="space-y-2 text-center mb-6">
                <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-widest block">Communications</span>
                <h1 className="font-display font-medium text-3xl text-white">
                  Get in Touch
                </h1>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  Connect with the Bharat Pulse engineering desk, government liaison desk or administrative hubs.
                </p>
              </div>

              {/* Dynamic feedback Form contact */}
              <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl space-y-4">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message logged dynamically on our developer stream!");
                }} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold font-mono text-gray-400 uppercase mb-1">Your Identity / Department</label>
                    <input type="text" placeholder="e.g. Ward 12 Inspector" required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-[#00E5FF] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold font-mono text-gray-400 uppercase mb-1">Email Address</label>
                    <input type="email" placeholder="e.g. officer@mp.gov.in" required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-[#00E5FF] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold font-mono text-gray-400 uppercase mb-1">System Message Description</label>
                    <textarea rows={4} placeholder="Input questions regarding API integrations, local sensor seeding or pilot district expansions..." required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:border-[#00E5FF] focus:outline-none" />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#00E5FF] text-[#050816] rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer font-mono">
                    Dispatch Message
                  </button>
                </form>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Floating AI Chat bot assistant */}
      <AIChatBot />

      {/* Footer Container */}
      <Footer />

      {/* SPECTACULAR INTERACTIVE LOGIN/REGISTER MODAL OVERLAY */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full rounded-2xl bg-gradient-to-b from-[#0a0f2d] to-[#050816] border border-white/10 p-6 md:p-8 shadow-2xl relative text-left whitespace-normal overflow-hidden"
            >
              {/* Abs circle glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#00E5FF]/20 rounded-full blur-[50px] -z-10"></div>
              
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-1 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                id="btn-close-auth-modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-2 mb-6">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] mb-1">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-display font-medium text-xl text-white">
                  {authMode === "login" && "Login to Command Base"}
                  {authMode === "register" && "Create Watchdog Profile"}
                  {authMode === "forgot" && "Recover Security Credentials"}
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  {authMode === "login" && "Authorize your credential keys to access pilots."}
                  {authMode === "register" && "Register to log local utility malfunctions instantly."}
                  {authMode === "forgot" && "Input address key to override device keys."}
                </p>
              </div>

              {authFeedback && (
                <div className="mb-4 p-3 bg-[#00FFB2]/10 border border-[#00FFB2]/20 rounded-lg text-xs font-mono text-[#00FFB2] animate-pulse">
                  {authFeedback}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === "register" && (
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold font-mono uppercase text-gray-400">Full Public Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs focus:border-[#00E5FF] focus:outline-none focus:bg-white/10"
                        id="auth-name-field"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold font-mono uppercase text-gray-400">Security Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. officer.delhi@pulse.gov.in"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs focus:border-[#00E5FF] focus:outline-none focus:bg-white/10"
                      id="auth-email-field"
                    />
                  </div>
                </div>

                {authMode !== "forgot" && (
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold font-mono uppercase text-gray-500">Credential Passcode</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs focus:border-[#00E5FF] focus:outline-none focus:bg-white/10"
                        id="auth-pass-field"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer font-mono"
                  id="btn-auth-submit"
                >
                  {authMode === "login" && "Verify Secure Login"}
                  {authMode === "register" && "Complete Account Registration"}
                  {authMode === "forgot" && "Dispatch Recovery Vector"}
                </button>
              </form>

              {/* Mock Google Login and layout switches */}
              <div className="mt-5 space-y-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setAuthFeedback("Synchronizing Google SSO keys...");
                    setTimeout(() => {
                      setAuthenticated(true);
                      setUserEmail("hackathon.contestant@solveforindia.in");
                      setUserRole("government");
                      setAuthFeedback("Access authenticated via Google Accounts!");
                      setTimeout(() => {
                        setShowAuthModal(false);
                        setAuthFeedback("");
                      }, 1000);
                    }, 1000);
                  }}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono font-medium text-gray-300 flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-google-sign-in"
                >
                  <Globe className="h-4 w-4 text-[#00E5FF]" />
                  <span>Authenticate with Google Auth</span>
                </button>

                <div className="flex justify-between text-[11px] text-gray-400">
                  {authMode === "login" ? (
                    <>
                      <button type="button" onClick={() => setAuthMode("forgot")} className="hover:text-white underline cursor-pointer">Forgot passcode?</button>
                      <button type="button" onClick={() => setAuthMode("register")} className="hover:text-white underline cursor-pointer">Register Watchdog</button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setAuthMode("login")} className="hover:text-white underline mx-auto cursor-pointer">Return to Terminal Login</button>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WATCH DEMO MODAL SCREEN */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full rounded-2xl bg-[#0a0f2d] border border-white/10 p-6 shadow-2xl relative text-left"
            >
              <h3 className="font-display font-bold text-lg text-white mb-2">Bharat Pulse Platform Walkthrough</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed font-sans">
                Bharat Pulse AI operates through a high-frequency decentralized oracle loop that harvests data across Wards, Ward-Officers checklists, municipal IoT flows, and NGO ground surveys. It integrates automatic contradiction matching so state administrators see exactly where public confidence lags behind official portal assertions.
              </p>
              
              <div className="space-y-3 text-xs text-gray-300 font-sans">
                <div className="flex items-start space-x-2">
                  <span className="h-5 w-5 rounded bg-cyan-950/50 text-cyan-400 flex items-center justify-center font-mono font-semibold">1</span>
                  <span><strong>District Dashboards</strong>: Access geographical health profiles, including water velocity and power substation failures.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="h-5 w-5 rounded bg-cyan-950/50 text-cyan-400 flex items-center justify-center font-mono font-semibold">2</span>
                  <span><strong>AI Audits</strong>: Spot discrepancies instantly—e.g. government asserts &apos;Active water piping&apos; vs. Karol Bagh Ward outage reports.</span>
                </div>
              </div>

              <button
                onClick={() => setShowDemoModal(false)}
                className="w-full mt-6 bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                id="close-demo-modal-btn"
              >
                Close Walkthrough
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
