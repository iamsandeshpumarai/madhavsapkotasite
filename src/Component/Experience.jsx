import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Experience = ({ list }) => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {list.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-red-200 hover:shadow-2xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <Briefcase size={20} />
              </div>
              <span className="text-sm font-black text-slate-400 font-mono italic">
                {item.year}
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
              {item.role}
            </h3>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-6">
              {item.organization}
            </h4>
            
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;