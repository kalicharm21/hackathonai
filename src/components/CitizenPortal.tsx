import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, orderBy, limit, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { AlertCircle, Plus, Sparkles, MapPin, CheckCircle2, ShieldAlert, Calendar, Loader, Eye, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Report {
  id: string;
  userId: string;
  userEmail: string;
  title: string;
  description: string;
  department: string;
  locationName: string;
  latitude: number;
  longitude: number;
  status: "open" | "investigating" | "verified" | "disputed" | "resolved";
  contradictionDetected: boolean;
  aiVerificationScore: number;
  aiAnalysis: string;
  createdAt: string;
  updatedAt: string;
}

interface CitizenPortalProps {
  onNewReportAdded?: (report: any) => void;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({ onNewReportAdded }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("Electricity");
  const [locationName, setLocationName] = useState("");
  const [officialStatus, setOfficialStatus] = useState("Declaring normal conditions");

  const [activeReportDetails, setActiveReportDetails] = useState<Report | null>(null);

  // Load reports
  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const q = query(collection(db, "reports"), orderBy("createdAt", "desc"), limit(20));
      const querySnapshot = await getDocs(q);
      const items: Report[] = [];
      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        items.push({
          id: docSnap.id,
          userId: d.userId || "anonymous_user",
          userEmail: d.userEmail || "anonymous@citizen.in",
          title: d.title || "",
          description: d.description || "",
          department: d.department || "Electricity",
          locationName: d.locationName || "Madhya Pradesh",
          latitude: d.latitude || 23.25,
          longitude: d.longitude || 77.41,
          status: d.status || "open",
          contradictionDetected: d.contradictionDetected || false,
          aiVerificationScore: d.aiVerificationScore ?? 85,
          aiAnalysis: d.aiAnalysis || "",
          createdAt: d.createdAt || new Date().toISOString(),
          updatedAt: d.updatedAt || new Date().toISOString(),
        });
      });
      setReports(items);
    } catch (err) {
      console.error("Error drawing reports:", err);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handlePostReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !locationName) return;

    setIsSubmitting(true);
    try {
      // 1. Call Bharat Pulse Trust Engine server API to query Gemini and evaluate contradiction
      const verifyRes = await fetch("/api/verify-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: department.toLowerCase(),
          title,
          description,
          officialStatus,
          historicalPattern: "Moderate seasonal volatility inside suburban district networks"
        }),
      });

      const verifyData = await verifyRes.json();

      // Ensure verification status and variables are derived cleanly
      const contradiction = verifyData.contradictionDetected ?? false;
      const confidence = verifyData.confidenceScore ?? 82;
      const analysis = verifyData.reasoning || "Analyzing reporting consistency vs national telemetry networks.";
      const recStatus = contradiction ? "disputed" : "verified";

      const newReportData = {
        userId: "pulse_user_" + Math.floor(Math.random() * 100000),
        userEmail: "citizen.pulse@gmail.com",
        title,
        description,
        department,
        locationName,
        latitude: 23.25 + (Math.random() - 0.5) * 1.5, // Seed in Madhya Pradesh vicinity
        longitude: 77.41 + (Math.random() - 0.5) * 1.5,
        status: recStatus,
        contradictionDetected: contradiction,
        aiVerificationScore: confidence,
        aiAnalysis: analysis,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 2. Save into standard cloud Firestore database
      await addDoc(collection(db, "reports"), newReportData);

      // Trigger callback if provided
      if (onNewReportAdded) {
        onNewReportAdded(newReportData);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setLocationName("");
      setShowForm(false);
      
      // Refresh list
      fetchReports();
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-medium text-lg text-white">Live Citizen Reports Stream</h2>
          <p className="text-xs text-slate-400">
            Real citizen logs submitted and validated dynamically through Bharat Pulse AI engines.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={fetchReports}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-gray-300 rounded-lg border border-white/10 transition-colors cursor-pointer"
            id="btn-refresh-reports"
          >
            <RefreshCw className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Reload Stream</span>
          </button>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-1.5 bg-[#00E5FF] hover:bg-white text-[#050816] font-bold text-xs py-1.5 px-4 rounded-full transition-all shadow-lg shadow-[#00E5FF]/10 cursor-pointer"
            id="btn-file-outage"
          >
            <Plus className="h-4 w-4" />
            <span>File Utility Incident</span>
          </button>
        </div>
      </div>

      {/* Form Dialog Box */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/[0.03] rounded-2xl border border-white/10 p-5 overflow-hidden backdrop-blur-md"
            id="citizenship-report-form"
          >
            <form onSubmit={handlePostReport} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5">
                    Service Sector
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                    id="form-report-dept"
                  >
                    <option value="Electricity" className="bg-[#050816]">Electricity Infrastructure</option>
                    <option value="Water" className="bg-[#050816]">Water & Sanitation</option>
                    <option value="Healthcare" className="bg-[#050816]">Public Health Facilities</option>
                    <option value="Transport" className="bg-[#050816]">Public Transit Networks</option>
                    <option value="Ration" className="bg-[#050816]">PDS Ration Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5">
                    Outage / Disruption Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Substation transformer burst inside Sector-3"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                    id="form-report-title"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5">
                    District Locality / Landmark
                  </label>
                  <input
                    type="text"
                    required
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. Bhopal, MP Or Karol Bagh Ward 12"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                    id="form-report-location"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5">
                    Official Status / Municipality Declarations
                  </label>
                  <input
                    type="text"
                    value={officialStatus}
                    onChange={(e) => setOfficialStatus(e.target.value)}
                    placeholder="e.g. Government portal says running normally"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                    id="form-report-official"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider font-mono mb-1.5">
                    Detailed Account / Evidence description
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Provide specific, non-emotional evidence of the disruption, affected population size, or restoration timelines if visible."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                    id="form-report-desc"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-1.5 border border-white/10 hover:bg-white/5 text-xs font-mono font-medium text-gray-400 rounded-lg cursor-pointer"
                    id="form-cancel-btn"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 bg-gradient-to-r from-[#00E5FF] to-[#4F46E5] text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer hover:opacity-90 transition-opacity"
                    id="form-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="h-3.5 w-3.5 animate-spin" />
                        <span>Verifying with AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5 text-[#00E5FF]" />
                        <span>Submit & Verify</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reports Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Reports Stream Cards */}
        <div className="lg:col-span-7 space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
          {loadingReports ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader className="h-8 w-8 text-cyan-500 animate-spin mb-3" />
              <p className="text-xs font-mono">Drawing live reports from telemetry database...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-12 glass-panel border border-slate-800 rounded-xl">
              <AlertCircle className="h-8 w-8 text-amber-500/60 mx-auto mb-2" />
              <p className="text-xs text-slate-500">No reports logged yet. Click "File Utility Incident" to submit the first entry!</p>
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                onClick={() => setActiveReportDetails(report)}
                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeReportDetails?.id === report.id
                    ? "bg-white/[0.08] border-[#00E5FF] shadow-lg shadow-[#00E5FF]/5"
                    : report.contradictionDetected
                    ? "bg-white/[0.03] border-rose-500/20 hover:border-rose-500/40"
                    : "bg-white/[0.03] border-white/10 hover:border-[#00E5FF]/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider select-none ${
                        report.department.toLowerCase() === "electricity"
                          ? "bg-amber-950/60 text-amber-400 border border-amber-500/20"
                          : report.department.toLowerCase() === "water"
                          ? "bg-cyan-950/60 text-[#00E5FF] border border-[#00E5FF]/20"
                          : "bg-emerald-950/60 text-[#00FFB2] border border-[#00FFB2]/20"
                      }`}>
                        {report.department}
                      </span>
                      
                      <span className="text-[10px] text-gray-400 font-mono flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-[#00E5FF]" />
                        <span>{report.locationName}</span>
                      </span>
                    </div>

                    <h4 className="font-sans font-medium text-sm text-white line-clamp-1">
                      {report.title}
                    </h4>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className={`text-[10px] font-semibold font-mono tracking-wider flex items-center space-x-1 uppercase ${
                      report.contradictionDetected ? "text-rose-400" : "text-[#00FFB2]"
                    }`}>
                      {report.contradictionDetected ? (
                        <>
                          <ShieldAlert className="h-3 w-3" />
                          <span>Contradiction</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Trust Match</span>
                        </>
                      )}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 mt-0.5">
                      {new Date(report.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-400 line-clamp-2">
                  {report.description}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Details Drawer */}
        <div className="lg:col-span-5 bg-white/[0.03] rounded-2xl border border-white/10 p-5 shrink-0 flex flex-col justify-between backdrop-blur-md">
          <AnimatePresence mode="wait">
            {activeReportDetails ? (
              <motion.div
                key={activeReportDetails.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 text-left"
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-400 text-[10px] font-mono">
                      <Calendar className="h-3.5 w-3.5 text-[#00E5FF]" />
                      <span>Submitted: {new Date(activeReportDetails.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <span className={`text-[10px] font-semibold font-mono tracking-wider px-2 py-0.5 rounded-full select-none capitalize ${
                      activeReportDetails.status === "disputed"
                        ? "bg-rose-950/60 text-rose-400 border border-rose-500/20"
                        : "bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/20"
                    }`}>
                      {activeReportDetails.status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white mt-2">
                    {activeReportDetails.title}
                  </h3>

                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-[#00E5FF] font-mono font-medium">{activeReportDetails.locationName}</span>
                    <span className="text-gray-600 select-none">•</span>
                    <span className="text-[11px] text-gray-400 font-mono leading-none">Coords: {activeReportDetails.latitude.toFixed(3)}, {activeReportDetails.longitude.toFixed(3)}</span>
                  </div>
                </div>

                {/* Narrative Description */}
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Citizen Account Evidence</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{activeReportDetails.description}</p>
                </div>

                {/* Truth Index Meter */}
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-gray-200 font-mono uppercase tracking-wider flex items-center space-x-1">
                      <Sparkles className="h-3.5 w-3.5 text-[#00E5FF]" />
                      <span>Bharat Pulse Trust Index</span>
                    </span>
                    <span className={`text-lg font-bold font-mono ${
                      activeReportDetails.aiVerificationScore >= 80 ? "text-[#00E5FF]" : "text-rose-400"
                    }`}>
                      {activeReportDetails.aiVerificationScore}%
                    </span>
                  </div>

                  {/* Meter line */}
                  <div className="h-2 w-full bg-[#00E5FF]/10 rounded-full overflow-hidden border border-[#00E5FF]/20">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        activeReportDetails.aiVerificationScore >= 80
                          ? "bg-gradient-to-r from-[#00E5FF] to-[#4F46E5]"
                          : "bg-gradient-to-r from-rose-500 to-amber-500"
                      }`}
                      style={{ width: `${activeReportDetails.aiVerificationScore}%` }}
                    />
                  </div>
                </div>

                {/* AI Auditing OutputLog */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center space-x-1">
                    <Eye className="h-3.5 w-3.5 text-[#00E5FF] font-bold" />
                    <span>AI Auditing Analysis & Contradiction Log</span>
                  </h4>
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-[11px] text-gray-300 leading-relaxed font-mono whitespace-pre-wrap text-left">
                    {activeReportDetails.aiAnalysis}
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-24 text-gray-500 space-y-2">
                <AlertCircle className="h-10 w-10 text-[#00E5FF]/20" />
                <p className="text-xs font-sans max-w-[200px]">Select any citizen report to inspect local facts against AI verification models.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
