import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import HomePage from './page/HomePage';
import About from './page/About';
import Contact from './page/Contact';
import Gallery from './page/Gallery';
import Event from './page/Event';
import News from './page/News';
import ConstituencyPage from './page/Constituency';
import Legal from './page/Legal';
import ScrollToTop from './Component/ScrollTop';
import AdminLogin from './page/AdminPanel';

// Import your pages;

const App = () => {
const location =   useLocation()

const isAdmin = location.pathname.startsWith('/admin')
  return (

    <div className="flex flex-col min-h-screen">
{ !isAdmin &&   <Header />}
<ScrollToTop/>
      <main className="flex-grow">
        <Routes>
      {/* Main content area */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Event />} />
          <Route path="/news" element={<News/>} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/constituency" element={<ConstituencyPage />} />
          <Route path="/admin" element={<AdminLogin />} />

        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;
