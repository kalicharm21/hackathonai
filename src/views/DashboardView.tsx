import React from "react";
import { TrustVisual } from "../components/TrustVisual";
import { CitizenPortal } from "../components/CitizenPortal";
import { PredictiveInsights } from "../components/PredictiveInsights";

export const DashboardView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-2 h-full p-2 bg-[#050505]">
      {/* LEFT: Telemetry */}
      <div className="col-span-3 border border-[#333] bg-[#0A0A0A] p-4">
        <TrustVisual />
      </div>

      {/* CENTER: Main Analysis */}
      <div className="col-span-6 space-y-2">
        <div className="border border-[#333] bg-[#0A0A0A] p-4">
          <PredictiveInsights />
        </div>
        <div className="border border-[#333] bg-[#0A0A0A] p-4">
          <CitizenPortal />
        </div>
      </div>

      {/* RIGHT: System Alerts */}
      <div className="col-span-3 border border-[#333] bg-[#0A0A0A] p-4">
        <h2 className="text-[9px] font-bold text-rose-500 uppercase tracking-widest mb-4">Critical System Alerts</h2>
        <div className="space-y-2">
           <div className="border border-[#333] bg-[#050505] p-3 text-[10px]">
              <span className="text-rose-400 font-bold block">WARD 12 DISCREPANCY</span>
              <p>Water valve pressure drop detected.</p>
           </div>
        </div>
      </div>
    </div>
  );
};