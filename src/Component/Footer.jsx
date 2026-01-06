import React from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from "qrcode.react"; // ✅ named export


const Footer = () => {
  const currentYear = new Date().getFullYear();

  // The link you want the QR code to open
  const websiteUrl = "https://share.google/5XS9ry1KKUlUhnl6F";

  return (
    <footer className="bg-[#0f172a] text-slate-400 border-t border-slate-800">
      {/* Main Container - Extra wide for better breathing room */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          
          {/* Column 1: Identity & Socials */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/20">
                MS
              </div>
              <div>
                <h2 className="text-xl font-black text-white leading-none tracking-tight">MADHAV SAPKOTA</h2>
                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em] mt-1">Official Portal</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Dedicated to progress, transparency, and public service. Building a stronger constituency through community engagement and legislative excellence.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-6 pt-2">
              <a href="https://www.facebook.com/madhav.subodh/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-all transform hover:-translate-y-1">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://x.com/Subodhsindhu1" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-400 transition-all transform hover:-translate-y-1">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8 underline underline-offset-8 decoration-blue-600">Resources</h3>
            <ul className="grid grid-cols-1 gap-4 text-sm font-medium">
              {['Home', 'About', 'Constituency', 'News', 'Events', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8 underline underline-offset-8 decoration-blue-600">Contact Info</h3>
            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <span className="p-2 bg-slate-800 rounded text-blue-500">📍</span>
                <p>Singha Durbar, Kathmandu<br />Federal Parliament Office</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="p-2 bg-slate-800 rounded text-blue-500">📞</span>
                <p>+977 9851334035</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="p-2 bg-slate-800 rounded text-blue-500">✉️</span>
                <p>maoistbagmati@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Column 4: Official QR Code */}
          <div className="flex flex-col items-center lg:items-end">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Connect Digitally</h3>
            <div className="bg-white p-3 rounded-xl shadow-2xl transition-transform hover:rotate-3 duration-300">
              <QRCodeSVG 
                value={websiteUrl}
                size={120}
                level={"H"}
                renderAs={"svg"}
              />
            </div>
            <p className="mt-4 text-[10px] text-slate-500 font-bold uppercase text-center lg:text-right">
              Scan to view website
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="bg-slate-950/80 py-8 border-t border-slate-800/50">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-[0.15em] font-bold">
          <p className="text-slate-500">© {currentYear} Madhav Sapkota. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;