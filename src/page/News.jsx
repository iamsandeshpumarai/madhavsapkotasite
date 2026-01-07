import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, PlayCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "../../utils/function";

const News = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["newsdata"],
    queryFn: getAllNews
  });

  if (isLoading) return <p className="text-center py-24">Loading news...</p>;
  if (isError) return <p className="text-center py-24 text-red-600">Error loading news</p>;

  // Use the fetched data from backend
  // Sort by date descending (latest first)
  const sortedNews = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-red-600 font-black text-xs uppercase tracking-[0.3em] mb-4"
            >
              Real-time Impact
            </motion.h4>
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">
              News & <span className="text-slate-400 italic font-serif font-light">Activities</span>
            </h2>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {sortedNews.map((item, i) => (
            <motion.a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item._id} // use backend _id
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group block"
            >
              <div className="bg-slate-50 rounded-[3rem] p-10 h-full border border-slate-100 hover:border-red-100 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden">
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-red-500/10 transition-colors"></div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    item.type === 'Video' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'
                  }`}>
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                    <Calendar size={14} />
                    {item.date}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-red-600 transition-colors leading-tight relative z-10">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-grow relative z-10">
                  {item.summary}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-auto relative z-10">
                   <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                     {item.type === 'Video' ? 'Watch Speech' : 'Read Full Article'}
                   </span>
                   <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all group-hover:translate-x-1 shadow-sm">
                     {item.type === 'Video' ? <PlayCircle size={22} /> : <ExternalLink size={20} />}
                   </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
