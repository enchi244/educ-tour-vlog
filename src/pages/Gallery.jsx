// src/pages/Gallery.jsx
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { tourData } from '../data/tourData';
import Embers from '../components/ui/Embers';

const Gallery = () => {
  const { hash } = useLocation();

  // Scroll to the specific day if a hash (e.g., #gallery-day-1) is present
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Slight delay to ensure render
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-[#c5a87c] selection:text-black font-sans pb-20 relative">
      
      {/* Backgrounds */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen bg-center bg-cover bg-no-repeat fixed"
        style={{ backgroundImage: "url('/background.jpg')" }}
      ></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/95 to-[#0a0a0a] pointer-events-none"></div>

      <Embers />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-[#c5a87c]/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="text-[#c5a87c] font-serif text-sm tracking-[0.3em] uppercase">The Grand Archives</span>
          <Link to="/" className="text-gray-400 hover:text-[#c5a87c] font-serif text-sm tracking-widest transition-colors duration-300">
            &#8592; Return to Grace
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-8 pt-32 relative z-10">
        <h1 className="text-4xl md:text-6xl text-center text-[#c5a87c] font-serif tracking-widest uppercase drop-shadow-[0_0_15px_rgba(197,168,124,0.3)] mb-16">
          Visions of the Past
        </h1>

        {tourData.map((dayObj) => (
          <section 
            key={dayObj.id} 
            id={`gallery-day-${dayObj.id}`} 
            className="mb-24 scroll-mt-24 border-t border-[#c5a87c]/10 pt-8"
          >
            <div className="mb-8">
              <h3 className="text-[#c5a87c] font-serif text-xs tracking-[0.3em] uppercase mb-1 opacity-80">
                {dayObj.day}
              </h3>
              <h2 className="text-2xl md:text-3xl text-gray-200 font-serif tracking-wide">
                {dayObj.title}
              </h2>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dayObj.images.map((img, idx) => (
                <div key={idx} className="group relative overflow-hidden border border-[#c5a87c]/20 bg-[#12110f] aspect-[4/3]">
                  <img 
                    src={img} 
                    alt={`${dayObj.title} - fragment ${idx + 1}`}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Gallery;