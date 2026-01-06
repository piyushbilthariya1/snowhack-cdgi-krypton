import React, { useState } from "react";
import { registerUser } from "./userService";
import { Zap, ArrowRight } from "lucide-react";

const Register = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      onAuthSuccess();
    } catch (err) {
      alert("Registration failed. Use a unique email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="bg-brand bg-[#00FFB2] p-3 rounded-2xl">
            <Zap size={32} className="text-slate-900" fill="currentColor" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome to NanoAPI
        </h2>
        <p className="text-slate-400 text-center mb-8">
          Enter your details to generate your first API Key and get ₹100 free
          credits.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-[#00FFB2] outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl focus:border-[#00FFB2] outline-none transition-all"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-[#00FFB2] text-slate-900 font-bold p-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
          >
            Get My API Key <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
