import React from "react";
import { motion } from "framer-motion";
import { Landmark, Shield, User, MapPin, Award, CheckCircle, Calendar, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAboutData } from "../../utils/function";

const AboutPage = () => {
  // 1. Fetch data from TanStack Query
  const { data: aboutdata, isLoading, isError } = useQuery({
    queryKey: ['aboutdata'],
    queryFn: getAboutData
  });

  // 2. Handle Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-red-600" size={48} />
      </div>
    );
  }

  // 3. Handle Error or Empty Data State
  if (isError || !aboutdata || aboutdata.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-500">
        <p className="text-xl font-medium">Failed to load profile information.</p>
      </div>
    );
  }

  // 4. Use the first record from the database array
  const data = aboutdata[0];

  return (
    <div className="bg-white min-h-screen py-20 px-4 md:px-12 selection:bg-red-50">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-12 gap-16 mb-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-slate-50">
              <img 
                src={data.profile.photoUrl} 
                alt={`${data.profile.firstName} ${data.profile.lastName}`} 
                className="w-full object-cover aspect-[4/5]" 
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
              <p className="text-4xl font-black">{data.profile.totalVotes}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Popular Mandate 2022</p>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.h1 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6"
            >
              {data.profile.firstName} <span className="text-red-600 italic font-light font-serif">{data.profile.lastName}</span>
            </motion.h1>
            <p className="text-2xl text-slate-500 font-light leading-relaxed mb-10">
              Representing the heart of {data.profile.constituency.split('-')[0]}, {data.profile.firstName} {data.profile.lastName} ({data.profile.alias}) is a voice for sustainable growth, 
              bridging revolutionary ideals with modern parliamentary governance.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-10">
              <QuickInfo icon={<MapPin />} label="Constituency" value={data.profile.constituency} />
              <QuickInfo icon={<User />} label="Political Party" value={data.profile.party} />
              <QuickInfo icon={<Calendar />} label="Born" value={data.profile.birthDate} />
              <QuickInfo icon={<Award />} label="Status" value={data.profile.status} />
            </div>
          </div>
        </div>

        {/* POLITICAL POSITIONS SECTION */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-4xl font-black text-slate-900">Leadership <span className="text-red-600">Trajectory</span></h2>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.politicalPositions.map((pos, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-10 rounded-[3rem] hover:bg-white hover:shadow-2xl hover:shadow-red-100/40 transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {pos.level === "Federal" ? <Landmark size={24} /> : <Shield size={24} />}
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{pos.role}</h3>
                <p className="text-red-600 font-black text-[10px] uppercase tracking-widest mb-6">{pos.period}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{pos.description}</p>
                
                {/* Details Section (Margin, Assembly, etc) */}
                {pos.details && pos.details.length > 0 && (
                  <div className="space-y-3 pt-6 border-t border-slate-200">
                    {pos.details.map((d, idx) => (
                      <div key={idx} className="flex justify-between text-[10px] font-black uppercase">
                        <span className="text-slate-400">{d.label}</span>
                        <span className="text-slate-900">{d.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMPACT LIST */}
        <section className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-20 opacity-5">
              <Landmark size={300} />
          </div>
          <h3 className="text-3xl font-black mb-12">Key Contributions & Impact</h3>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
            {data.impacts.map((impact, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <CheckCircle className="text-red-500 shrink-0 mt-1" size={20} />
                <p className="text-lg text-slate-300 font-light">{impact}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

const QuickInfo = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="text-red-600">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default AboutPage;