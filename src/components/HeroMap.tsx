import React, { useState, useEffect } from "react";
import { MapPin, Shield, Zap, Droplet, Bus, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CityMetric {
  name: string;
  x: number; // percentage pos 0-100
  y: number; // percentage pos 0-100
  electricity: number;
  water: number;
  healthcare: number;
  transit: number;
  alert: string | null;
}

const citiesData: CityMetric[] = [
  { name: "New Delhi", x: 42, y: 22, electricity: 96, water: 82, healthcare: 91, transit: 88, alert: "Transformer arcing risk inside Karol Bagh" },
  { name: "Mumbai", x: 26, y: 62, electricity: 98, water: 91, healthcare: 94, transit: 92, alert: null },
  { name: "Chennai", x: 49, y: 82, electricity: 94, water: 74, healthcare: 89, transit: 86, alert: "Water supply deficit in central pipelines" },
  { name: "Kolkata", x: 74, y: 46, electricity: 92, water: 88, healthcare: 86, transit: 80, alert: null },
  { name: "Bhopal", x: 45, y: 44, electricity: 91, water: 84, healthcare: 89, transit: 84, alert: "Auxiliary power supply maintenance active" },
  { name: "Bangalore", x: 42, y: 76, electricity: 94, water: 68, healthcare: 92, transit: 91, alert: null },
  { name: "Hyderabad", x: 46, y: 64, electricity: 95, water: 80, healthcare: 90, transit: 87, alert: null },
];

export const HeroMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityMetric>(citiesData[4]); // Bhopal default
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % citiesData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeHeartbeat = citiesData[tickerIndex];

  return (
    <div className="bg-white/[0.03] rounded-2xl border border-white/10 p-5 shadow-2xl relative overflow-hidden flex flex-col md:grid md:grid-cols-12 gap-5 h-full backdrop-blur-md">
      
      {/* Background neon grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Dynamic India Map visual mapping (Map on Left/Center, Metrics on Right) */}
      <div className="col-span-12 md:col-span-7 flex flex-col justify-between relative min-h-[290px]">
        
        {/* Header HUD info */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center space-x-1.5 bg-white/5 py-1 px-2.5 rounded-full border border-white/10">
            <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-ping" />
            <span className="text-[9px] font-mono font-bold uppercase text-gray-300">National Telemetry Node</span>
          </div>

          <span className="text-[10px] text-gray-500 font-mono">
            Active: 7 Core Hubs
          </span>
        </div>

        {/* Vector SVG India Map simulation */}
        <div className="w-full h-56 relative my-auto flex items-center justify-center">
          <svg className="w-full h-full max-w-[280px] text-slate-900 overflow-visible" viewBox="0 0 100 100" fill="currentColor">
            
            {/* Outline path simulating India geographical territory */}
            <path
              d="M 40,10 L 45,5 L 48,12 L 44,18 L 47,24 L 52,22 L 56,28 L 54,34 L 58,38 L 72,42 L 78,45 L 75,49 L 71,48 L 74,53 L 64,54 L 62,50 L 55,56 L 50,68 L 48,74 L 46,80 L 49,85 L 45,95 L 43,90 L 40,82 L 39,78 L 42,72 L 40,65 L 43,60 L 37,58 L 33,55 L 26,58 L 22,65 L 20,58 L 26,53 L 28,48 L 35,46 L 33,40 L 39,36 L 37,28 L 34,22 L 38,18 Z"
              fill="rgba(255, 255, 255, 0.01)"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.8"
            />

            {/* Glowing lines connecting hubs */}
            <line x1="42" y1="22" x2="45" y2="44" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="26" y1="62" x2="45" y2="44" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="49" y1="82" x2="42" y2="76" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="0.5" strokeDasharray="2" />
            <line x1="45" y1="44" x2="42" y2="76" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="0.5" strokeDasharray="2" />
          </svg>

          {/* Glowing node buttons */}
          {citiesData.map((city) => (
            <button
              key={city.name}
              onClick={() => setSelectedCity(city)}
              className="absolute group flex items-center justify-center -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer"
              style={{ left: `${city.x}%`, top: `${city.y}%` }}
              id={`city-node-${city.name.toLowerCase()}`}
            >
              <span className={`absolute h-4 w-4 rounded-full opacity-40 transition-all scale-100 group-hover:scale-150 ${
                selectedCity.name === city.name ? "bg-[#00E5FF] animate-ping" : "bg-gray-500"
              }`} />
              <span className={`h-2 w-2 rounded-full border border-black/80 transition-colors ${
                selectedCity.name === city.name ? "bg-[#00E5FF]" : "bg-gray-400 group-hover:bg-[#00E5FF]"
              }`} />

              <span className="absolute left-3.5 bg-[#050816] border border-white/10 px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none select-none">
                {city.name}
              </span>
            </button>
          ))}
        </div>

        {/* Heartbeat feedback card along bottom map edge */}
        <div className="z-10 bg-white/5 border border-white/10 rounded-lg p-2 flex items-center space-x-2 text-left">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/20">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00FFB2] animate-pulse" />
          </div>
          <div className="text-[10px] text-gray-400 font-mono truncate">
            <strong>{activeHeartbeat.name} status feed:</strong> {activeHeartbeat.alert || "All core networks stable (Confidence indices normal)"}
          </div>
        </div>

      </div>

      {/* Metrics HUD Panel on Right */}
      <div className="col-span-12 md:col-span-5 bg-white/[0.04] rounded-xl border border-white/10 p-4 flex flex-col justify-between space-y-4 text-left">
        <div>
          <span className="text-[8px] uppercase font-mono font-bold tracking-widest text-gray-500 block mb-1">
            Core Hub Telemetry Metrics
          </span>
          <h4 className="text-sm font-bold text-white font-display flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-[#00E5FF]" />
            <span>{selectedCity.name}</span>
          </h4>
        </div>

        {/* Meters Grid */}
        <div className="space-y-3">
          
          {/* Watt/Electricity metre */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-gray-300 flex items-center space-x-1">
                <Zap className="h-3 w-3 text-amber-400" />
                <span>Electricity Availability</span>
              </span>
              <span className="text-amber-400 font-semibold">{selectedCity.electricity}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-amber-400 to-[#00E5FF] transition-all duration-700" style={{ width: `${selectedCity.electricity}%` }} />
            </div>
          </div>

          {/* Water grid supply metre */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-gray-300 flex items-center space-x-1">
                <Droplet className="h-3 w-3 text-[#00E5FF]" />
                <span>Water Pressure</span>
              </span>
              <span className="text-[#00E5FF] font-semibold">{selectedCity.water}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] transition-all duration-700" style={{ width: `${selectedCity.water}%` }} />
            </div>
          </div>

          {/* Public Transport dispatch metre */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-gray-300 flex items-center space-x-1">
                <Bus className="h-3 w-3 text-[#00FFB2]" />
                <span>Transit Dispatch Rate</span>
              </span>
              <span className="text-[#00FFB2] font-semibold">{selectedCity.transit}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-[#00FFB2] to-[#00E5FF] transition-all duration-700" style={{ width: `${selectedCity.transit}%` }} />
            </div>
          </div>

        </div>

        {/* Warning Indicator Box */}
        <div className={`p-2.5 rounded-lg border text-[10px] flex items-start space-x-2 font-mono leading-relaxed ${
          selectedCity.alert 
            ? "bg-rose-500/10 border-rose-500/20 text-rose-300"
            : "bg-[#00FFB2]/5 border-[#00FFB2]/20 text-[#00FFB2]"
        }`}>
          {selectedCity.alert ? (
            <>
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>LOGGED WARNING: {selectedCity.alert}</span>
            </>
          ) : (
            <>
              <Shield className="h-3.5 w-3.5 text-[#00FFB2] shrink-0 mt-0.5" />
              <span>ALL INFRASTRUCTURE MEETS TRUTH DEVIATION STANDARDS.</span>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
