import React, { useState } from "react";
import api from "../../services/api"; // Our Axios instance

const Playground = ({ onTransactionComplete }) => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const response = await api.post("/proxy/gemini", { prompt });
      setResult(response.data.data);
      onTransactionComplete(); // Refreshes balance in parent component
    } catch (err) {
      alert(err.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl mt-6">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        🚀 API Playground
      </h3>
      <textarea
        className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl mb-4 h-24 outline-none focus:border-brand"
        placeholder="Ask Gemini something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleTest}
        disabled={loading}
        className="bg-brand text-slate-900 font-bold px-6 py-2 rounded-xl disabled:opacity-50"
      >
        {loading ? "Processing..." : "Run Test (₹0.10)"}
      </button>
      {result && (
        <div className="mt-4 p-4 bg-black/40 rounded-xl text-sm font-mono text-slate-300 border border-slate-800">
          {result}
        </div>
      )}
    </div>
  );
};
