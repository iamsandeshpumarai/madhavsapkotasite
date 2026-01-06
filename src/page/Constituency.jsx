import React from "react";
import { motion } from "framer-motion";
import { Map, Zap, Droplets, HardHat, TrendingUp, Users } from "lucide-react";


const ConstituencyPage = () => {
    const constituencyData = {
  stats: [
    { label: "Voter Count", value: "30,374", icon: <Users size={24} /> },
    { label: "Local Units", value: "6+", icon: <Map size={24} /> },
    { label: "Energy Impact", value: "45MW", icon: <Zap size={24} /> },
    { label: "Growth Index", value: "+12%", icon: <TrendingUp size={24} /> }
  ],
  
  projects: [
    {
      title: "Bhotekoshi River Corridor Resilience",
      category: "Climate & Infrastructure",
      status: "In Progress",
      description: "Implementing advanced embankment systems to protect downstream villages from glacial lake outburst floods (GLOFs).",
      img: "/assets/project1.jpg"
    },
    {
      title: "Arniko Highway Modernization",
      category: "Transport",
      status: "Completed",
      description: "Restoring the vital trade link with China, improving the road surface from Bahrabise to Tatopani.",
      img: "/assets/project2.jpg"
    },
    {
      title: "Sindhupalchok Hydropower Hub",
      category: "Economy",
      status: "Ongoing",
      description: "Supporting local shareholding in new hydropower projects to ensure villagers benefit directly from natural resources.",
      img: "/assets/project3.jpg"
    }
  ],

  localLevels: [
    { name: "Bahrabise", type: "Municipality" },
    { name: "Bhotekoshi", type: "Rural Municipality" },
    { name: "Jugal", type: "Rural Municipality" },
    { name: "Tripurasundari", type: "Rural Municipality" },
    { name: "Sunkoshi", type: "Rural Municipality" },
    { name: "Lisankhu Pakhar", type: "Rural Municipality" }
  ]
};
  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="mb-16">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Sindhupalchok <span className="text-red-600">Unit 1</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl font-light">
            From the high Himalayan passes of Tatopani to the fertile valleys of Sunkoshi, 
            driving sustainable development for the gateway to the North.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {constituencyData.stats.map((stat, i) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
            >
              <div className="text-red-600 mb-4">{stat.icon}</div>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* PROJECTS LIST */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <HardHat className="text-red-600" /> Key Projects & Initiatives
            </h2>
            
            {constituencyData.projects.map((project, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex gap-6 hover:shadow-xl transition-all">
                <div className="hidden md:block shrink-0 w-24 h-24 bg-slate-50 rounded-3xl overflow-hidden">
                   <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-slate-400 text-xs font-bold">{project.category}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{project.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SIDEBAR: LOCAL LEVELS */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white sticky top-28">
              <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Local Governance Units</h3>
              <ul className="space-y-6">
                {constituencyData.localLevels.map((level, i) => (
                  <li key={i} className="flex justify-between items-center group">
                    <span className="text-slate-400 group-hover:text-white transition-colors">{level.name}</span>
                    <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full uppercase">
                      {level.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstituencyPage;