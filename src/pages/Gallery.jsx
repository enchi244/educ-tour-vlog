// src/pages/Gallery.jsx
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tourData } from '../data/tourData';

const Gallery = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300); // Increased delay slightly to allow page transition to finish
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } }}
      transition={{ duration: 0.8 }}
      className="relative z-10"
    >

      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-[#c5a87c]/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="text-[#c5a87c] font-serif text-sm tracking-[0.3em] uppercase">The Grand Archives</span>
          <Link to="/" className="text-gray-400 hover:text-[#c5a87c] font-sans text-lg tracking-widest transition-colors duration-300">
            &#8592; Return to Grace
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-8 pt-32 relative z-10">
        
        {/* 3. GOLDEN ORDER TEXT REVEAL */}
        <motion.h1 
          initial={{ letterSpacing: "0em", opacity: 0 }}
          animate={{ letterSpacing: "0.15em", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl text-center text-[#c5a87c] font-serif uppercase drop-shadow-[0_0_15px_rgba(197,168,124,0.3)] mb-16"
        >
          Visions of the Past
        </motion.h1>

        {tourData.map((dayObj) => (
          <section 
            key={dayObj.id} 
            id={`gallery-day-${dayObj.id}`} 
            className="mb-24 scroll-mt-32 border-t border-[#c5a87c]/10 pt-8"
          >
            <div className="mb-8">
              <h3 className="text-[#c5a87c] font-sans text-sm tracking-[0.3em] uppercase mb-1 opacity-80">
                {dayObj.day}
              </h3>
              <h2 className="text-3xl md:text-4xl text-gray-200 font-serif tracking-wide">
                {dayObj.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dayObj.images.map((img, idx) => (
                /* 6. INTERACTIVE VIGNETTE EFFECT */
                /* The shadow-[inset...] creates the dark edges that fade on hover */
                <div key={idx} className="group relative overflow-hidden border border-[#c5a87c]/20 bg-[#12110f] aspect-[4/3] shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] transition-shadow duration-700">
                  <img 
                    src={img} 
                    alt={`${dayObj.title} - fragment ${idx + 1}`}
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out relative z-0"
                  />
                  <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10"></div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </motion.div>
  );
};

export default Gallery;