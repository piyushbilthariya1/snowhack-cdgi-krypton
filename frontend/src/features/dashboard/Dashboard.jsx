import React, { useState, useEffect } from "react";
import {
  Zap,
  Wallet,
  Key,
  Activity,
  Send,
  Clock,
  CheckCircle,
  Copy,
} from "lucide-react";
import api from "../../services/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data.data);
    } catch (err) {
      console.error("Session expired");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAiCall = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await api.post("/proxy/gemini", { prompt });
      setAiResponse(res.data.data);
      fetchProfile(); // Refresh balance and history instantly
    } catch (err) {
      alert(err.response?.data?.message || "Check your balance!");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center text-emerald-400">
        Booting SaaS Engine...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-8">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Zap className="text-emerald-400 fill-emerald-400" size={32} />
          <h1 className="text-2xl font-black tracking-tighter">NANOAPI.IO</h1>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl flex items-center gap-4">
          <Wallet className="text-emerald-400" size={20} />
          <span className="text-xl font-mono font-bold text-white">
            ₹{user.walletBalance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: API PLAYGROUND */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem]">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <Activity size={20} className="text-emerald-400" /> Live AI
              Playground
            </h2>
            <textarea
              className="w-full bg-slate-950 border border-slate-800 p-6 rounded-2xl h-32 outline-none focus:border-emerald-400/50 transition-all text-slate-300 mb-4"
              placeholder="Ask Gemini anything... (Cost: ₹0.10)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleAiCall}
              disabled={loading}
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                "PROXIED CALL IN PROGRESS..."
              ) : (
                <>
                  <Send size={18} /> EXECUTE API REQUEST
                </>
              )}
            </button>

            {aiResponse && (
              <div className="mt-6 p-6 bg-black/40 border border-slate-800 rounded-2xl font-mono text-sm text-emerald-100">
                <p className="text-xs text-slate-500 uppercase mb-2">
                  Upstream Response:
                </p>
                {aiResponse}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: LEDGER & KEY */}
        <div className="space-y-8">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Your Secret Key
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <code className="text-xs text-emerald-400 font-mono truncate mr-2">
                {user.nanoKey}
              </code>
              <Copy size={16} className="text-slate-600 cursor-pointer" />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] h-[400px] flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
              <Clock size={14} /> Transaction Ledger
            </h3>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {user.usageHistory.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-slate-800/50 pb-3"
                >
                  <div>
                    <p className="text-sm font-bold text-white">
                      {item.apiName}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <p className="text-emerald-400 font-mono font-bold">
                    -₹{item.cost.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
