import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Constituency', path: '/constituency' },
    { name: 'News', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LEFT: Identity */}
          <Link to="/" className="flex items-center gap-3 flex-1 group">
            <div className="w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-bold shadow-sm shrink-0 transition-transform group-hover:scale-105">
              MS
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900 tracking-tighter leading-none">
                MADHAV SAPKOTA
              </span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                Official Website
              </span>
            </div>
          </Link>

          {/* MIDDLE: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center space-x-6 flex-[2]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[13px] font-bold text-slate-600 hover:text-blue-700 uppercase tracking-wide transition-all duration-300 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* RIGHT: Contact Button */}
          <div className="hidden lg:flex items-center justify-end flex-1">
            <Link 
              to="/contact"
              className="bg-[#1e3a8a] text-white px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-900 hover:shadow-lg active:scale-95 transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* MOBILE: Toggle */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-current transition duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} bg-slate-50`}>
        <div className="px-6 py-8 flex flex-col space-y-5 border-t border-slate-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-base font-bold text-slate-700 hover:text-blue-700 uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="bg-[#1e3a8a] text-white text-center py-4 rounded-lg text-sm font-bold uppercase tracking-widest"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;