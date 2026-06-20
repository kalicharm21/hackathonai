import React, { useState } from "react";
import { Play, ShieldAlert, Cpu, CheckCircle, RefreshCw, Zap, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CascadeEffect {
  sector: string;
  impact: string;
}

interface SimulationResult {
  cascadingEffects: CascadeEffect[];
  estimatedHealthScoreReduction: number;
  systemVulnerabilityIndex: number;
  recommendedStabilizationActions: string[];
}

export const InteractiveTwin: React.FC = () => {
  const [scenario, setScenario] = useState("Transformer explosion due to monsoon arcing");
  const [department, setDepartment] = useState("electricity");
  const [severity, setSeverity] = useState("severe");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>({
    cascadingEffects: [
      { sector: "Water Supply Pressure", impact: "Auxiliary power loss to primary pumping station. Residential pressure reduced by 40%." },
      { sector: "Health Infrastructure", impact: "Secondary ICU batteries activated. Outpatient systems disabled for non-essential machines." },
      { sector: "Traffic Systems", impact: "Metropolitan light signals in Sector 4 default to warning flashes, gridlocking the ring road." }
    ],
    estimatedHealthScoreReduction: 19,
    systemVulnerabilityIndex: 78,
    recommendedStabilizationActions: [
      "Load-shed high residential consumers in Ward 14 to stabilize grid parameters.",
      "Initiate reserve solar microgrid storage lines into central hospitals.",
      "Redirect municipal buses onto peripheral arterial routes to handle light gridlock."
    ]
  });

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/digital-twin/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario, department, severity })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Simulation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00E5FF]/30 transition-all duration-300 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Control Panel */}
        <div className="w-full lg:w-5/12 space-y-5 text-left">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#00E5FF] font-mono text-xs font-semibold mb-1 uppercase tracking-widest">
              <Cpu className="h-4 w-4 animate-pulse text-[#00E5FF]" />
              <span>Digital Twin Engine v3.0</span>
            </div>
            <h3 className="font-display text-xl font-medium text-white tracking-tight">
              Grid Stress Testing Workbench
            </h3>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
              Select or type stress variables to run high-fidelity simulations mapping municipal cascading network outages.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 font-mono">
                TRIGGER SCENARIO ACTION
              </label>
              <textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-[#00E5FF] font-sans leading-relaxed"
                id="twin-scenario-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 font-mono">
                  TARGET DEPARTMENT
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  id="twin-dept-select"
                >
                  <option value="electricity" className="bg-[#050816]">Electricity Grid</option>
                  <option value="water" className="bg-[#050816]">Water Supply</option>
                  <option value="healthcare" className="bg-[#050816]">Healthcare Wards</option>
                  <option value="transport" className="bg-[#050816]">Public Transport</option>
                  <option value="ration" className="bg-[#050816]">Ration Logistics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 font-mono">
                  STRESS SEVERITY
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  id="twin-severity-select"
                >
                  <option value="minor" className="bg-[#050816]">Minor Fluctuations</option>
                  <option value="moderate" className="bg-[#050816]">Moderate Outage</option>
                  <option value="severe" className="bg-[#050816]">Severe Failure</option>
                  <option value="critical" className="bg-[#050816]">Critical Grid Down</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] text-white font-bold text-sm py-2.5 px-4 rounded-full transition-all duration-300 disabled:opacity-50 cursor-pointer hover:opacity-90"
              id="twin-simulate-btn"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Computing Cascades...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current text-white" />
                  <span>Execute Smart Simulation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Screen */}
        <div className="w-full lg:w-7/12 bg-white/5 rounded-xl border border-white/10 p-5 flex flex-col justify-between text-left">
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.systemVulnerabilityIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Header Metrics */}
                <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono flex items-center space-x-1 uppercase">
                      <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
                      <span>Health Score Deficit</span>
                    </span>
                    <span className="text-2xl font-bold font-mono text-rose-500">
                      -{result.estimatedHealthScoreReduction}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-mono flex items-center space-x-1 uppercase">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span>Vulnerability Risk</span>
                    </span>
                    <span className="text-2xl font-bold font-mono text-amber-400">
                      {result.systemVulnerabilityIndex}/100
                    </span>
                  </div>
                </div>

                {/* Cascading Failures Timeline */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-widest mb-2 flex items-center space-x-1.5">
                    <ShieldAlert className="h-4 w-4 text-rose-500" />
                    <span>Real-Time Cascading Impact Analysis</span>
                  </h4>

                  <div className="space-y-2.5">
                    {result.cascadingEffects.map((item, index) => (
                      <div key={index} className="bg-black/30 border border-white/10 rounded-lg p-2.5 flex items-start space-x-3 hover:border-[#00E5FF]/25 transition-all">
                        <div className="h-5 w-5 mt-0.5 rounded bg-rose-550/10 flex items-center justify-center border border-rose-500/25 text-xs font-mono font-bold text-rose-400">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white font-mono leading-none">
                            {item.sector}
                          </div>
                          <div className="text-xs text-gray-400 mt-1 leading-normal font-sans">
                            {item.impact}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stabilization Plan */}
                <div className="bg-[#00FFB2]/5 border border-[#00FFB2]/20 rounded-xl p-3.5">
                  <h4 className="text-xs font-bold text-[#00FFB2] uppercase font-mono tracking-widest mb-2 flex items-center space-x-1.5">
                    <CheckCircle className="h-4 w-4 text-[#00FFB2]" />
                    <span>AI Stabilization Directives</span>
                  </h4>

                  <ul className="space-y-1.5 text-xs text-gray-300 font-sans">
                    {result.recommendedStabilizationActions.map((rec, i) => (
                      <li key={i} className="flex items-start space-x-1.5 leading-relaxed">
                        <span className="text-[#00FFB2] font-sans font-bold select-none">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
