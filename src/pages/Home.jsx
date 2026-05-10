// src/pages/Home.jsx
import React from 'react';
import FastTravelNav from '../components/layout/FastTravelNav';
import DayCard from '../components/cards/DayCard';
import CharacterStatus from '../components/ui/CharacterStatus';
import Embers from '../components/ui/Embers';
import { tourData } from '../data/tourData';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-[#c5a87c] selection:text-black font-sans pb-20 relative">
      
      {/* Backgrounds & Embers */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      ></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/90 to-[#0a0a0a] pointer-events-none"></div>
      <Embers />

      <div className="relative z-50">
        <FastTravelNav />
      </div>

      <header className="pt-32 pb-16 text-center border-b border-[#c5a87c]/10 relative z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-[#c5a87c]/50 to-transparent"></div>
        <h1 className="text-5xl md:text-7xl text-[#c5a87c] font-serif tracking-widest uppercase drop-shadow-[0_0_15px_rgba(197,168,124,0.3)] mb-4">
          Educational Tour
        </h1>
        <p className="text-gray-500 font-serif italic tracking-wide">
          The Last Voyage
        </p>
      </header>

      <main className="container mx-auto px-4 md:px-8 mt-12 relative z-10">
        {tourData.map((dayObj) => (
          <DayCard 
            key={dayObj.id}
            id={dayObj.id} // Added id prop to pass the raw number
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
    </div>
  );
};

export default Home;