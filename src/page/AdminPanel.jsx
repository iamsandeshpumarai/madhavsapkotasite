import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ChevronRight } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"; // or use your custom axios instance
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Recommended for error feedback
import axiosapi from "../../utils/api";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1. Define the mutation
  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await axiosapi.post("api/auth/login", loginData);
      return response.data;
    },
    onSuccess: (data) => {
      // Assuming your API returns { success: true, data: { token, user } }
      toast.success("Login Successful");
      
      // Force a refetch of auth data in your Context/Provider
      queryClient.invalidateQueries(['authdata']);
      
      // Redirect to dashboard
      navigate("/admindashboard");
    },
    onError: (error) => {
      const message = error.response?.data?.error || "Login failed. Please check credentials.";
      toast.error(message);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // 2. Trigger the mutation
    loginMutation.mutate({ email, password });
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
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-white mb-6 shadow-xl shadow-slate-200">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
            Admin <span className="text-red-600 italic">Portal</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Authorized Personnel Access Only</p>
        </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-500/5 focus:border-red-600 outline-none transition-all font-medium text-slate-900"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-500/5 focus:border-red-600 outline-none transition-all font-medium text-slate-900"
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
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 active:scale-[0.98] transition-all disabled:opacity-70 shadow-lg"
            >
              {loginMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Authenticate Access
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

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