import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ChevronRight } from "lucide-react";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add authentication logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-900/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] relative z-10"
      >
        {/* Branding/Logo Area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-white mb-6 shadow-xl shadow-slate-200">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
            Admin <span className="text-red-600 italic">Portal</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Authorized Personnel Access Only</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                Admin Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-500/5 focus:border-red-600 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                  placeholder="admin@madhavsapkota.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-2 px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Password
                </label>
                
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-500/5 focus:border-red-600 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Authenticate Access
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Warning */}
          <div className="mt-8 pt-8 border-t border-slate-50 flex items-start gap-3 text-slate-400">
            <div className="mt-0.5">
              <ShieldCheck size={14} className="text-red-600" />
            </div>
            <p className="text-[10px] leading-relaxed font-medium">
              This system is monitored. Unauthorized access attempts are logged and reported to the system administrator.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a href="/" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
            ← Return to Public Site
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;