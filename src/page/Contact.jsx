import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Clock, CalendarX, Send, 
  Phone, Mail, ChevronRight, ExternalLink 
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getContactData, sendMessage } from "../../utils/function";

const Contact = () => {

const {data} = useQuery({
  queryKey:['contactdata'],
  queryFn:getContactData
}
)



  const contactData = {
    offices: data?.offices || [
      {
        id: 1,
        title: "Federal Office",
        locationName: "Singha Durbar, Kathmandu",
        address: "Parliamentary Secretariat, Building I",
        phone: "+977-01-4200159",
        email: "info@madhavsapkota.com.np",
        mapQuery: "Singha Durbar, Kathmandu"
      },
      {
        id: 2,
        title: "District Office",
        locationName: "Chautara, Sindhupalchok",
        address: "District Liaison Office, Sahu Tole",
        phone: "+977-011-620133",
        email: "sindhupalchok@maoistcentre.org.np",
        mapQuery: "Chautara, Sindhupalchok"
      }
    ],
    schedule:data?.schedule || {
      summer: "10:00 AM - 5:00 PM (Feb 15 - Nov 15)",
      winter: "10:00 AM - 4:00 PM (Nov 16 - Feb 14)",
      friday: "10:00 AM - 3:00 PM (Half Day)",
      weekend: "Saturday (Closed)",
      upcomingHolidays: [
        { date: "Jan 11", name: "Prithvi Jayanti" },
        { date: "Jan 15", name: "Maghe Sankranti" },
        { date: "Jan 19", name: "Sonam Lhosar" },
        { date: "Feb 15", name: "Maha Shivaratri" },
        { date: "Feb 19", name: "Democracy Day" }
      ]
    }

  };

  const [activeOffice, setActiveOffice] = useState(contactData.offices[0]);
  const [formData, setFormData] = useState({ fullname: "", email: "", message: "", agreed: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) return alert("Please agree to the terms.");
   
    alert("Message sent successfully!");
    sendMessage(formData)
  };


  return (
    <div className="bg-slate-50 min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Get in Touch</h1>
          <p className="text-slate-500 max-w-2xl font-medium">
            Reach out to the Secretariat for legislative inquiries, district-level issues, or to schedule a meeting.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: OFFICE & SCHEDULE (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Interactive Contact Info Card */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex flex-wrap gap-4 mb-8">
                {contactData?.offices.map((office) => (
                  <button 
                    key={office.id}
                    onClick={() => setActiveOffice(office)}
                    className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
                      activeOffice.id === office.id 
                      ? "bg-slate-900 text-white border-slate-900 shadow-xl" 
                      : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {office.title}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase text-red-600 tracking-widest block mb-2">Location</span>
                    <h4 className="text-xl font-bold text-slate-900">{activeOffice.locationName}</h4>
                    <p className="text-slate-500 text-sm">{activeOffice.address}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-50 space-y-3">
                    <a href={`tel:${activeOffice.phone}`} className="flex items-center gap-3 text-slate-700 hover:text-red-600 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><Phone size={14} /></div>
                      <span className="font-bold">{activeOffice.phone}</span>
                    </a>
                    <a href={`mailto:${activeOffice.email}`} className="flex items-center gap-3 text-slate-700 hover:text-red-600 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><Mail size={14} /></div>
                      <span className="font-bold break-all">{activeOffice.email}</span>
                    </a>
                  </div>
                </div>

                <div className="rounded-[2rem] overflow-hidden h-48 md:h-full min-h-[200px] border-4 border-slate-50 shadow-inner">
                  <iframe
                    width="100%" height="100%" style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(activeOffice.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="grayscale contrast-125"
                    title="Office Map"
                  />
                </div>
              </div>
            </div>

            {/* 2. Schedule Card */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-2 text-red-600 mb-6">
                  <Clock size={20} />
                  <span className="font-black uppercase text-xs tracking-widest">Office Hours</span>
                </div>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-slate-400">Sun - Thu (Summer)</span>
                    <span className="font-bold text-slate-800">{contactData.schedule.summer.split('(')[0]}</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-slate-400">Sun - Thu (Winter)</span>
                    <span className="font-bold text-slate-800">{contactData.schedule.winter.split('(')[0]}</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-50 pb-3 text-orange-600">
                    <span className="font-medium">Friday (Short Day)</span>
                    <span className="font-bold">{contactData.schedule.friday}</span>
                  </li>
                  <li className="flex justify-between text-red-600 font-bold">
                    <span>Saturday</span>
                    <span>CLOSED</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 text-slate-900 mb-6">
                  <CalendarX size={20} />
                  <span className="font-black uppercase text-xs tracking-widest">2026 Holidays</span>
                </div>
                <div className="space-y-2">
                  {contactData.schedule.upcomingHolidays.map((h, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl text-xs">
                      <span className="font-bold text-slate-900">{h.date}</span>
                      <span className="text-slate-500">{h.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM (5 Cols) */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-red-600 rounded-[3.5rem] p-10 md:p-14 text-white shadow-2xl shadow-red-200 sticky top-24"
            >
              <h3 className="text-4xl font-black mb-2 tracking-tighter">Contact <span className="opacity-50 italic">Subodh</span></h3>
              <p className="text-red-100 text-sm mb-10 font-medium">Direct inquiry to the MP's Secretariat.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <input 
                    type="text" placeholder="Full Name" required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 placeholder:text-red-200 outline-none focus:bg-white/20 transition-all focus:border-white"
                    onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <input 
                    type="email" placeholder="Email Address" required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 placeholder:text-red-200 outline-none focus:bg-white/20 transition-all focus:border-white"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <textarea 
                    rows="4" placeholder="Your Message..." required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 placeholder:text-red-200 outline-none focus:bg-white/20 transition-all focus:border-white"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <label className="flex items-start gap-4 cursor-pointer py-2 group">
                  <input 
                    type="checkbox" required
                    className="mt-1 w-5 h-5 rounded border-none bg-white/20 text-slate-900 focus:ring-0 cursor-pointer"
                    onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
                  />
                  <span className="text-[11px] text-red-100 leading-tight group-hover:text-white transition-colors">
                    I agree to the <b>Terms of Service</b> and privacy policy regarding data handling.
                  </span>
                </label>

                <button className="w-full bg-white text-red-600 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all transform active:scale-[0.98]">
                  Submit Message <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;