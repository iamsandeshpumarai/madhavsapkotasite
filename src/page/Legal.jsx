import React, { useState, useEffect } from "react"; // 1. Added useEffect
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useLocation } from "react-router-dom";

const Legal = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("terms");

  // 2. Logic to sync Tab with URL Path
  useEffect(() => {
    if (location.pathname === "/terms") {
      setActiveTab("terms");
    } else if (location.pathname === "/privacy") {
      setActiveTab("privacy");
    }
  }, [location.pathname]); // Runs whenever the URL changes

  const legalContent = {
    termsOfUse: [
      {
        id: "official-info",
        title: "1. Accuracy of Information",
        content: "While we strive to keep all legislative news and event details accurate, the information on this site is for general public awareness. Official parliamentary records should be verified via the Federal Parliament Secretariat."
      },
      {
        id: "user-conduct",
        title: "2. Communication Standards",
        content: "By using the contact form, you agree to provide truthful information. Spamming, abusive language, or use of the platform for solicitation is strictly prohibited."
      },
      {
        id: "intellectual-property",
        title: "3. Media Usage",
        content: "Photographs in the Gallery and official speeches are the property of Madhav Sapkota's office. Unauthorized commercial use of this media is prohibited without written consent."
      }
    ],
    privacyPolicy: [
      {
        id: "data-collection",
        title: "1. Information We Collect",
        content: "When you use our Contact Form, we collect your Full Name, Email, and Message content. We do not collect sensitive data like location or financial details."
      },
      {
        id: "data-usage",
        title: "2. How We Use Your Data",
        content: "Your data is used solely to respond to your inquiries or grievances. We do not sell your personal information to third-party marketing firms."
      },
      {
        id: "data-security",
        title: "3. Security Protocols",
        content: "We implement standard encryption to protect your messages. However, users should be aware that no transmission over the internet is 100% secure."
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-red-600 font-black text-xs uppercase tracking-widest mb-4"
          >
            Compliance & Transparency
          </motion.h4>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
            Legal <span className="text-slate-400 italic">Governance</span>
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100 p-2 rounded-2xl flex gap-2">
            <button 
              onClick={() => setActiveTab("terms")}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === "terms" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Terms of Use
            </button>
            <button 
              onClick={() => setActiveTab("privacy")}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === "privacy" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {(activeTab === "terms" ? legalContent.termsOfUse : legalContent.privacyPolicy).map((item, i) => (
              <div 
                key={item.id} 
                className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:border-red-100 hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xs">
                    0{i + 1}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {item.content}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer Note */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={16} /> Data Protection Act Compliant
          </div>
          <p className="text-center text-slate-400 text-xs max-w-lg">
            These terms are governed by the laws of Nepal. Any disputes arising will be subject to the exclusive jurisdiction of the courts of Kathmandu.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Legal;