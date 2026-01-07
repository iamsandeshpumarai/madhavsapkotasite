import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Image as ImageIcon, 
  UserCircle, 
  Newspaper, 
  MapPin, 
  Menu, 
  X, 
  LogOut, Home, Contact,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Datalogout } from "../../../utils/function";
import toast from "react-hot-toast";



const AdminLayout = () => {
  const navigate = useNavigate();
  
  const queryClient = useQueryClient(); 
const logoutMutation = useMutation({
    mutationFn: Datalogout,
    onSuccess: () => {
      // 2. Clear the auth cache so ProtectedRoute redirects
      queryClient.invalidateQueries(['authdata']);
      toast.success("Logged out successfully");
      navigate("/admin");
    },
    onError: (err) => {
      toast.error("Logout failed");
      console.log(err)
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admindashboard", icon: LayoutDashboard },
    { name: "Home", href: "/admindashboard/home", icon: Home },
    { name: "Events", href: "/admindashboard/event", icon: Calendar },
    { name: "Gallery", href: "/admindashboard/gallery", icon: ImageIcon },
    { name: "About Profile", href: "/admindashboard/about", icon: UserCircle },
    { name: "Messages", href: "/admindashboard/Messages", icon: Contact },
    { name: "News", href: "/admindashboard/news", icon: Newspaper },
    { name: "Constituency", href: "/admindashboard/constituency", icon: MapPin },
    { name: "AdminContact", href: "/admindashboard/contact", icon: Contact },
  ];

  const toggleSidebar = () => setIsSidebarOpen(false);

  return (
    // 1. h-screen + overflow-hidden ensures the browser window doesn't scroll
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-6 bg-slate-800 shrink-0">
            <span className="text-xl font-bold tracking-wider text-blue-400 uppercase">Admin</span>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={toggleSidebar}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>


          <div className="p-4 border-t border-slate-800 shrink-0">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" onClick={()=>handleLogout()
            }>
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header - Fixed height */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
             <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>
             <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-tight">Admin Portal</p>
              <p className="text-xs text-gray-500">System Manager</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>


        {/* 2. Scrollable Section */}
        {/* overflow-y-auto allows this specific section to scroll */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminLayout;