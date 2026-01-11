import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Award } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Herosection = ({ data }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-md">
              {data.party}
            </span>
            <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-md">
              {data.constituency}
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-6">
            {data.name} <br />
            <span className="text-red-600 italic font-serif font-light text-5xl md:text-7xl">"{data.nickname}"</span>
          </h1>

          <p className="text-lg text-slate-500 max-w-lg font-medium leading-relaxed mb-10">
            {data.tagline}
          </p>

          {/* New Stats Row */}
          <div className="flex flex-wrap gap-8 mb-10 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
            {data.stats.map((stat, i) => (
              <div key={i}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                <p className="text-xl font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button onClik={()=>navigate("/contact")} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-600 transition-all active:scale-95">
              Contact Office
            </button>
          </div>
        </motion.div>

        {/* Image Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-red-600/5 rounded-[4rem] blur-2xl group-hover:bg-red-600/10 transition-all"></div>
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-200 shadow-2xl border-[12px] border-white">
             <img 
               src={data.images[0]} 
               alt={data.name} 
               className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Herosection;
