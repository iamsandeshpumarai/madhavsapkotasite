import React from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Image as ImageIcon, 
  Newspaper, 
  MapPin, 
  ArrowUpRight,
  PlusCircle,
  Clock,
  Loader2 // Added for loading state
} from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import { getAllEvents, getAllNews, getGalleryData, getAllConstituencyData } from "../../../utils/function";

const AdminDashboard = () => {
  const results = useQueries({
    queries: [
      { queryKey: ["event"], queryFn: getAllEvents },
      { queryKey: ["media"], queryFn: getGalleryData },
      { queryKey: ["news"], queryFn: getAllNews },
      { queryKey: ["constituency"], queryFn: getAllConstituencyData },
    ]
  });


  // Extract data safely with fallbacks to 0 if data isn't loaded yet
const [events, media, news, constituency] = results;

const counts = {
  events: events.data?.length || 0,
  media: media.data?.length || 0,
  news: news.data?.length || 0,
  constituency: constituency.data?.[0]?.localLevels?.length || 0,
};

  // Check if any query is still loading
  const isLoading = results.some(result => result.isLoading);

  const stats = [
    { label: "Total Events", count: counts.events, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50", link: "/admindashboard/event" },
    { label: "News Articles", count: counts.news, icon: Newspaper, color: "text-emerald-600", bg: "bg-emerald-50", link: "/admindashboard/news" },
    { label: "Gallery Media", count: counts.media, icon: ImageIcon, color: "text-purple-600", bg: "bg-purple-50", link: "/admindashboard/gallery" },
    { label: "Local Levels", count: counts.constituency, icon: MapPin, color: "text-orange-600", bg: "bg-orange-50", link: "/admindashboard/constituency" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h1>
          <p className="text-gray-500 text-sm">Here is what's happening with your platform today.</p>
        </div>
        {isLoading && (
          <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
            <Loader2 className="animate-spin" size={16} />
            Updating counts...
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <Link to={stat.link} className="text-gray-400 hover:text-blue-600 transition-colors">
                <ArrowUpRight size={20} />
              </Link>
            </div>
            {/* Displaying the actual length from the API */}
            <p className="text-3xl font-bold text-gray-800">
              {isLoading && stat.count === 0 ? "..." : stat.count}
            </p>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <PlusCircle size={18} className="text-blue-600" /> Quick Actions
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm">
            <QuickActionLink to="/admindashboard/news" label="Create News Post" />
            <QuickActionLink to="/admindashboard/event" label="Schedule New Event" />
            <QuickActionLink to="/admindashboard/gallery" label="Upload to Gallery" />
            <QuickActionLink to="/admindashboard/about" label="Update Political Bio" />
          </div>
        </div>

        {/* System Status / Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Clock size={18} className="text-orange-500" /> System Overview
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm min-h-[200px]">
             <div className="flex items-center justify-between p-4 border rounded-xl bg-gray-50 mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-orange-500' : 'bg-green-500 animate-pulse'}`}></div>
                    <span className="text-sm font-semibold text-gray-700">Database Connection</span>
                </div>
                <span className={`text-xs font-bold uppercase ${isLoading ? 'text-orange-600' : 'text-green-600'}`}>
                  {isLoading ? 'Syncing' : 'Active'}
                </span>
             </div>
             <p className="text-sm text-gray-500 leading-relaxed">
                Your political profile is currently public and synchronized across all sections. 
                Last data refresh was just now.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionLink = ({ to, label }) => (
  <Link 
    to={to} 
    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group"
  >
    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{label}</span>
    <ChevronRightIcon />
  </Link>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default AdminDashboard;