import React from "react";
import { Users, Building, History, Shield, CheckCircle2, Zap } from "lucide-react";
import { motion } from "motion/react";

export const TrustVisual: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 max-w-4xl mx-auto space-y-8 backdrop-blur-md">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-widest block">
          Telemetry Audits
        </span>
        <h3 className="font-display font-medium text-2xl text-white">Trust Verification Engine</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Bharat Pulse AI cross-references and matches truth discrepancies in seconds by synthesizing dynamic public data layers.
        </p>
      </div>

      {/* Trust Schema Node Stream */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 py-4 px-2">
        
        {/* Left Side: Three Input Sources */}
        <div className="flex flex-col space-y-5 w-full md:w-3/12 z-10">
          
          {/* Box 1 */}
          <motion.div
            whileHover={{ x: 5 }}
            className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center space-x-3 text-left"
          >
            <div className="h-8 w-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center border border-[#00E5FF]/20 text-[#00E5FF]">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase font-mono">Citizen Signals</h4>
              <p className="text-[10px] text-gray-400">Raw, fragmented reports/complaints</p>
            </div>
          </motion.div>

          {/* Box 2 */}
          <motion.div
            whileHover={{ x: 5 }}
            className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center space-x-3 text-left"
          >
            <div className="h-8 w-8 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center border border-[#4F46E5]/20 text-[#4F46E5]">
              <Building className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase font-mono">Gov Portals</h4>
              <p className="text-[10px] text-gray-400">Official scheduling / system logs</p>
            </div>
          </motion.div>

          {/* Box 3 */}
          <motion.div
            whileHover={{ x: 5 }}
            className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center space-x-3 text-left"
          >
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400">
              <History className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase font-mono">Grid History</h4>
              <p className="text-[10px] text-gray-400">Log telemetry & maintenance history</p>
            </div>
          </motion.div>

        </div>

        {/* Center Connecting Glowing Stream */}
        <div className="hidden md:block absolute left-[25%] right-[25%] top-[50%] h-0.5 -translate-y-1/2 overflow-hidden pointer-events-none select-none">
          <div className="h-full w-full bg-white/5 relative">
            <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#00E5FF] via-[#4F46E5] to-[#00FFB2] w-1/3 animate-ping" style={{ animationDuration: "3s" }} />
          </div>
        </div>

        {/* Center Node: AI Trust Engine Core */}
        <div className="flex flex-col items-center justify-center w-full md:w-4/12 z-10 relative">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 229, 255, 0.1)",
                "0 0 35px rgba(0, 229, 255, 0.35)",
                "0 0 20px rgba(0, 229, 255, 0.1)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="h-24 w-24 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#4F46E5]/20 border-2 border-[#00E5FF] flex flex-col items-center justify-center text-[#00E5FF]"
          >
            <Shield className="h-8 w-8 animate-pulse text-[#00E5FF] mb-1" />
            <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[#00E5FF]">
              TRUST ENGINE
            </span>
          </motion.div>
          
          <div className="mt-3.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] text-gray-300 font-mono flex items-center space-x-1">
            <Zap className="h-3.5 w-3.5 text-[#00E5FF]" />
            <span>Active cross-referencing contradictions</span>
          </div>
        </div>

        {/* Right Side: Consolidated Truth Output */}
        <div className="flex flex-col space-y-4 w-full md:w-3/12 z-10">
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white/5 shadow-lg border border-[#00FFB2]/20 rounded-2xl flex flex-col items-center justify-center text-center space-y-2.5"
          >
            <div className="h-10 w-10 rounded-full bg-[#00FFB2]/10 flex items-center justify-center text-[#00FFB2] border border-[#00FFB2]/25">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Verified Realities
              </h4>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                Reconciled statuses, anomaly alerts, flag warnings & exact confidence scores.
              </p>
            </div>

            <div className="bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/20 text-[10px] py-1 px-2.5 rounded font-mono font-semibold">
              Truth Index Level: 95.8%
            </div>
          </motion.div>

        </div>

      </div>

      {/* Key categories explanation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
        
        <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 text-left">
          <strong className="text-xs font-bold text-[#00E5FF] font-mono uppercase block mb-1">
            1. Logical Conflicts
          </strong>
          <span className="text-xs text-gray-400 leading-normal font-sans block">
            Recognizes conflicting information dynamically—e.g. government asserts "Active water piping" vs. local density of offline reports.
          </span>
        </div>

        <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 text-left">
          <strong className="text-xs font-bold text-[#4F46E5] font-mono uppercase block mb-1">
            2. Mitigation Audits
          </strong>
          <span className="text-xs text-gray-400 leading-normal font-sans block">
            Correlates previous maintenance logs to check if active outage relates to scheduled updates or unexpected transformer explosions.
          </span>
        </div>

        <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 text-left">
          <strong className="text-xs font-bold text-[#00FFB2] font-mono uppercase block mb-1">
            3. Dynamic Scaling
          </strong>
          <span className="text-xs text-gray-400 leading-normal font-sans block">
            Evaluates report veracity on standard geographic density algorithms—filtering single reporting noise vs. whole community grid events.
          </span>
        </div>

      </div>

    </div>
  );
};
