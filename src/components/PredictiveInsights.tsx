import React, { useState, useEffect } from "react";
import { AlertTriangle, Clock, Activity, Zap, RefreshCw, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Prediction {
  serviceType: "water" | "electricity" | "healthcare" | "transport" | "ration";
  predictedIssue: string;
  probability: number;
  impactLevel: "minor" | "moderate" | "severe" | "critical";
  recommendedAction: string;
}

export const PredictiveInsights: React.FC = () => {
  const [district, setDistrict] = useState("Bhopal Ward 14");
  const [weatherFactors, setWeatherFactors] = useState("Monsoon rainfall, temperature spikes");
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      serviceType: "electricity",
      predictedIssue: "Monsoon arcing overload on primary Grid-2 node",
      probability: 78,
      impactLevel: "severe",
      recommendedAction: "Pre-seal transformers in Sector 12 and load balance onto Ward 15 microgrid."
    },
    {
      serviceType: "water",
      predictedIssue: "Reservoir backup pressure drop due to auxiliary pump repair delay",
      probability: 64,
      impactLevel: "moderate",
      recommendedAction: "Activate secondary hydraulic valve arrays in Northern Corridors prior to peak morning demand."
    },
    {
      serviceType: "transport",
      predictedIssue: "Link Road backtracking following high probability sector flooding",
      probability: 72,
      impactLevel: "moderate",
      recommendedAction: "Coordinate municipal bus rerouting schedules onto flyovers automatically."
    }
  ]);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/predictive-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ district, weatherFactors }),
      });
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setPredictions(data);
      }
    } catch (err) {
      console.error("Predictive download failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/[0.03] rounded-2xl border border-white/10 p-5 space-y-5 backdrop-blur-md text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-display font-medium text-base text-white flex items-center space-x-2">
            <Activity className="h-4 w-4 text-[#00FFB2]" />
            <span>AI Disruption Forecasting Core</span>
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Modeling impending utility stress points using weather metrics and citizen reports density.
          </p>
        </div>

        <button
          onClick={fetchInsights}
          disabled={loading}
          className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-lg text-xs font-mono font-medium text-gray-300 disabled:opacity-50 cursor-pointer"
          id="predictive-forecast-btn"
        >
          {loading ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Clock className="h-3.5 w-3.5 text-[#00E5FF] font-bold" />
          )}
          <span>{loading ? "Modeling..." : "Regenerate Forecast"}</span>
        </button>
      </div>

      {/* Control Input Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1.5">
            District Coverage Sector
          </label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
            id="district-field"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1.5">
            Stress Weather Factors
          </label>
          <input
            type="text"
            value={weatherFactors}
            onChange={(e) => setWeatherFactors(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
            id="weather-field"
          />
        </div>
      </div>

      {/* Predictions list */}
      <div className="space-y-3.5">
        <AnimatePresence mode="popLayout">
          {predictions.map((p, idx) => (
            <motion.div
              key={p.predictedIssue + idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: idx * 0.1 }}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/30 transition-colors space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`h-2.5 w-2.5 rounded-full select-none ${
                    p.impactLevel === "critical" || p.impactLevel === "severe" ? "bg-rose-500" : "bg-amber-400"
                  }`} />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#00E5FF]">
                    {p.serviceType}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                  <span className="text-[10px] text-gray-400 font-mono">Prob:</span>
                  <span className="text-[11px] font-bold font-mono text-[#00E5FF]">{p.probability}%</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium font-sans text-white">
                  {p.predictedIssue}
                </h4>
              </div>

              <div className="p-2.5 bg-black/30 rounded-lg border border-white/10 text-xs text-gray-400 flex items-start space-x-2">
                <CheckSquare className="h-4 w-4 text-[#00FFB2] shrink-0 mt-0.5" />
                <div className="leading-normal">
                  <strong className="text-white block font-heading text-[10px] font-bold uppercase tracking-wider">Recommended Outage Mitigation Action:</strong>
                  {p.recommendedAction}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
