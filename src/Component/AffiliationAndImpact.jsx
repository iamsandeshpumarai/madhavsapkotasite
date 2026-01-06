import React from "react";
import { Flag, Award, CheckCircle2 } from "lucide-react";

const AffiliationsAndImpact = ({ affiliations = [], achievements = [] }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Party Affiliation */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Flag size={120} />
        </div>
        <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
          <span className="w-8 h-1 bg-red-500"></span> Party Affiliations
        </h3>
        <div className="space-y-8 relative z-10">
          {affiliations.map((aff, i) => (
            <div key={i} className="border-l-2 border-slate-700 pl-6 group">
              <h4 className="text-xl font-bold group-hover:text-red-500 transition-colors">{aff.name}</h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{aff.period}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact/Achievements */}
      <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl shadow-slate-100">
        <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
          <span className="w-8 h-1 bg-blue-600"></span> Key Impacts
        </h3>
        <div className="grid gap-4">
          {achievements.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 transition-colors">
              <CheckCircle2 className="text-blue-600 mt-1 shrink-0" size={20} />
              <p className="text-slate-600 font-medium leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AffiliationsAndImpact;