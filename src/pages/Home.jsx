// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import FastTravelNav from '../components/layout/FastTravelNav';
import DayCard from '../components/cards/DayCard';
import CharacterStatus from '../components/ui/CharacterStatus';
import { tourData } from '../data/tourData';

const Home = () => {
  return (
    /* Page Transition Wrapper */
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } }}
      transition={{ duration: 0.8 }}
      className="relative z-10"
    >

      <div className="relative z-50">
        <FastTravelNav />
      </div>

      <header className="pt-32 pb-16 text-center border-b border-[#c5a87c]/10 relative z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-[#c5a87c]/50 to-transparent"></div>
        
        {/* 3. GOLDEN ORDER TEXT REVEAL */}
        <motion.h1 
          initial={{ letterSpacing: "0em", opacity: 0, scale: 0.9 }}
          animate={{ letterSpacing: "0.1em", opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-5xl md:text-7xl text-[#c5a87c] font-serif uppercase drop-shadow-[0_0_15px_rgba(197,168,124,0.3)] mb-4"
        >
          Educational Tour
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-500 font-sans text-xl italic tracking-wide"
        >
          The Final Voyage
        </motion.p>
      </header>

      <main className="container mx-auto px-4 md:px-8 mt-12 relative z-10">
        {tourData.map((dayObj) => (
          <DayCard 
            key={dayObj.id}
            id={dayObj.id}
            htmlId={`day-${dayObj.id}`}
            day={dayObj.day}
            title={dayObj.title}
            description={dayObj.description}
            images={dayObj.images}
            vibe={dayObj.vibe}
          />
        ))}

        <div id="status" className="mt-32 mb-16 border-t border-[#c5a87c]/20 pt-16 scroll-mt-32">
          <h2 className="text-center text-4xl text-[#c5a87c] font-serif tracking-widest uppercase mb-8">Tarnished Profile</h2>
          <CharacterStatus />
        </div>
      </main>
    </motion.div>
  );
};

export default Home;