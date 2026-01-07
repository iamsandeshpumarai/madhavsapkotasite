import React, { useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import AdminLayout from './Component/Admin/AdminLayout';
import HomeAdmin from './Component/Admin/Home';
import EventsAdmin from './Component/Admin/AdminEvents';
import GalleryAdmin from './Component/Admin/AdminGallery';
import AboutAdmin from './Component/Admin/AdminAbout';
import NewsAdmin from './Component/Admin/AdminNews';
import ConstituencyAdmin from './Component/Admin/AdminConsituency';
import AdminDashboard from './Component/Admin/AdminDashboard';
import AdminContact from './Component/Admin/AdminContact';
import AdminMessages from './Component/Admin/AdminMessage';
import { DataContext } from './Context/CreateContext';
import ProtectedRoute from './Component/ProtectRoute';
import { Toaster } from 'react-hot-toast';

// Import your pages;

const App = () => {
const {user,isLoading,error}  =  useContext(DataContext)

const location =   useLocation()

const isAdmin = location.pathname.startsWith('/admin')
  return (

    <div className="flex flex-col min-h-screen">
{ !isAdmin &&   <Header />}
 <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
          },
        }}
      />
      
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
          <Route element={<ProtectedRoute/>}>
<Route path='/admindashboard'  element={<AdminLayout/>} >
          <Route index element={<AdminDashboard />}/>
          <Route path='event' element={<EventsAdmin/>}/>
          <Route path='Messages' element={<AdminMessages/>}/>
          <Route path='home' element={<HomeAdmin/>}/>
          <Route path='contact' element={<AdminContact/>}/>
          <Route path='gallery' element={<GalleryAdmin/>}/>
          <Route path='about' element={<AboutAdmin/>}/>
          <Route path='news' element={<NewsAdmin/>}/>
          <Route path='constituency' element={<ConstituencyAdmin/>}/>
          </Route>

</Route>



        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;
