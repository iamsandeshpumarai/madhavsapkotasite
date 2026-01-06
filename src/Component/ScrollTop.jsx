import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Access the current location (URL)
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to the top of the page on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Use 'smooth' if you want a sliding effect
    });
  }, [pathname]); // Trigger this every time the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;