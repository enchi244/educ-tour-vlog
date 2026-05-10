// src/components/layout/FastTravelNav.jsx
import React, { useState, useEffect } from 'react';
import { tourData } from '../../data/tourData';

const FastTravelNav = () => {
  const [scrolled, setScrolled] = useState(false);

  // Detect when the user scrolls down to apply the frosted glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#c5a87c]/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex flex-wrap justify-center gap-6 items-center">
        <span className="text-[#c5a87c] font-serif text-xs tracking-[0.3em] uppercase hidden md:block mr-4 opacity-70">
          Fast Travel
        </span>
        
        {/* Generate a link for every day in your tour data */}
        {tourData.map((day) => (
          <a 
            key={day.id} 
            href={`#day-${day.id}`} 
            onClick={(e) => handleScrollTo(e, `day-${day.id}`)}
            className="text-gray-400 hover:text-[#c5a87c] font-serif text-sm md:text-base tracking-widest transition-colors duration-300"
          >
            {day.day}
          </a>
        ))}
        
        {/* Divider */}
        <div className="w-[1px] h-4 bg-[#c5a87c]/30 mx-2"></div>
        
        {/* Link to your portfolio section */}
        <a 
          href="#status" 
          onClick={(e) => handleScrollTo(e, 'status')}
          className="text-gray-400 hover:text-[#c5a87c] font-serif text-sm md:text-base tracking-widest transition-colors duration-300"
        >
          Status
        </a>
      </div>
    </nav>
  );
};

export default FastTravelNav;