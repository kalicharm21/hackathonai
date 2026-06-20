import React, { useState } from "react";
import { Sparkles, Activity, ShieldCheck, Mail, Send, Twitter, Linkedin, Github } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="w-full mt-16 border-t border-white/10 bg-[#050816]/90 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand block */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-[#00E5FF] to-[#4F46E5] rounded flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight text-white font-display">
                Bharat Pulse <span className="text-[#00E5FF]">AI</span>
              </span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed font-sans pr-4">
              Building the state-of-the-art digital infrastructure trust grid. Connecting civic telemetry with real-time contradiction auditing or cascading disruption simulations.
            </p>

            <div className="flex items-center space-x-3.5 pt-2">
              <span className="text-[10px] text-gray-500 font-mono uppercase font-bold tracking-widest block">Connect //</span>
              <a href="#twitter" className="text-gray-400 hover:text-[#00E5FF] transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#linkedin" className="text-gray-400 hover:text-[#00E5FF] transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href="#github" className="text-gray-400 hover:text-[#00E5FF] transition-colors"><Github className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Directory Column 1 */}
          <div className="space-y-3 text-left">
            <h4 className="text-[11px] font-mono font-bold text-[#00E5FF] tracking-wider uppercase">Platform</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><a href="#solutions" className="hover:text-white transition-colors">Solutions Suite</a></li>
              <li><a href="#trust" className="hover:text-white transition-colors">Verification Core</a></li>
              <li><a href="#twin" className="hover:text-white transition-colors">Digital Twin Simulator</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">Analytical Console</a></li>
            </ul>
          </div>

          {/* Directory Column 2 */}
          <div className="space-y-3 text-left">
            <h4 className="text-[11px] font-mono font-bold text-gray-300 tracking-wider uppercase">Resources</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><a href="#docs" className="hover:text-white transition-colors">API Literature</a></li>
              <li><a href="#sandbox" className="hover:text-white transition-colors">Developer Sandbox</a></li>
              <li><a href="#status" className="hover:text-white transition-colors">System Telemetry</a></li>
              <li><a href="#hackathon" className="hover:text-white transition-colors">SolveForIndia Case</a></li>
            </ul>
          </div>

          {/* Directory Column 3 */}
          <div className="space-y-3 text-left">
            <h4 className="text-[11px] font-mono font-bold text-gray-300 tracking-wider uppercase font-sans">Company</h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><a href="#mission" className="hover:text-white transition-colors">Mission Metrics</a></li>
              <li><a href="#research" className="hover:text-white transition-colors">Science Papers</a></li>
              <li><a href="#press" className="hover:text-white transition-colors">Media Kit</a></li>
              <li><a href="#pulse-labs" className="hover:text-white transition-colors">Pulse Labs</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3 lg:col-span-1 text-left">
            <h4 className="text-[11px] font-mono font-bold text-gray-300 tracking-wider uppercase">Newsletter</h4>
            <p className="text-[10px] text-gray-400 leading-normal">
              Receive high-frequency reports on civic network resilience.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex bg-white/5 border border-white/10 rounded-lg p-1 items-center">
                <input
                  type="email"
                  required
                  placeholder="pulse@gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none text-[11px] text-white focus:outline-none px-2 py-1 w-full font-mono"
                />
                <button
                  type="submit"
                  className="h-6 w-6 rounded bg-[#00E5FF] hover:bg-white text-slate-950 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[10px] text-[#00FFB2] font-mono animate-pulse">
                  ✓ Connection established. Subscribed!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Live HUD System Status */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-500 font-mono tracking-widest uppercase gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-pulse"></span>
              Core engine: active
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00FFB2] rounded-full"></span>
              Satellite: sync
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full"></span>
              Firestore: online (12ms)
            </span>
          </div>
          <div className="text-center md:text-right">
            © {new Date().getFullYear()} Bharat Pulse AI // Developed for SolveForIndia Hackathon
          </div>
        </div>

      </div>
    </footer>
  );
};
