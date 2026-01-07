import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../../utils/function";

const Event = () => {
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["eventsdata"],
    queryFn: getAllEvents
  });

  // ✅ Use backend data as legit events
  const legitEvents = Array.isArray(data) ? data : [];

  // ---- Loading state ----
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold">
        Loading events...
      </div>
    );
  }

  // ---- Error state ----
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
        {error?.message || "Failed to load events"}
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-600 font-black text-xs uppercase tracking-[0.4em] mb-4"
          >
            Public Calendar
          </motion.h4>

          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
            Events &{" "}
            <span className="text-slate-400 italic font-serif">
              Engagements
            </span>
          </h1>

          <p className="text-slate-500 max-w-xl font-medium">
            Tracking the legislative impact and grassroots activities of
            Madhav Sapkota across Nepal and the international stage.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legitEvents.map((event, i) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[3rem] p-10 border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Top bar */}
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-slate-900 text-white rounded-2xl group-hover:bg-red-600 transition-colors">
                  <Calendar size={24} />
                </div>

                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
                  {event.status}
                </span>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">
                  {event.category}
                </p>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:underline decoration-red-600 underline-offset-8">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                {event.description}
              </p>

              {/* Meta */}
              <div className="space-y-4 pt-8 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
                  <Clock size={16} className="text-slate-900" />
                  {event.date}
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
                  <MapPin size={16} className="text-slate-900" />
                  {event.location}
                </div>
              </div>

              {/* External link */}
              <a
                href={event.link}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest hover:text-red-600 transition-colors"
              >
                View Official Record <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {legitEvents.length === 0 && (
          <div className="text-center text-slate-400 font-bold mt-20">
            No events available.
          </div>
        )}

      </div>
    </div>
  );
};

export default Event;
