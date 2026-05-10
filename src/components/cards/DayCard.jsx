// src/components/cards/DayCard.jsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Notice 'id' is now included in the props here
const DayCard = ({ id, htmlId, day, title, description, images, vibe = 'standard' }) => {
  const scrollRef = useRef(null);
  
  // NEW: State to control the Fog Gate. Defaults to true (unlocked) for normal days.
  const [isUnlocked, setIsUnlocked] = useState(vibe !== 'boss');

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400; 
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const vibeConfig = {
    standard: {
      border: "border-[#c5a87c]/30",
      textAccent: "text-[#c5a87c]",
      bg: "bg-[#12110f]",
      glow: "from-transparent via-[#c5a87c]/50 to-transparent",
      button: "border-[#c5a87c]/40 text-[#c5a87c] hover:bg-[#c5a87c] hover:text-black",
      animation: { y: 100, transition: { duration: 1, ease: "easeOut" } }
    },
    siteOfGrace: {
      border: "border-yellow-200/40",
      textAccent: "text-yellow-200",
      bg: "bg-[#1a1813]",
      glow: "from-transparent via-yellow-200/70 to-transparent",
      button: "border-yellow-200/50 text-yellow-200 hover:bg-yellow-200 hover:text-black",
      animation: { y: 50, transition: { duration: 1.5, ease: "easeInOut" } }
    },
    boss: {
      border: "border-red-800/60 shadow-[0_0_30px_rgba(153,27,27,0.2)]",
      textAccent: "text-red-600",
      bg: "bg-[#0a0000]",
      glow: "from-transparent via-red-700/80 to-transparent",
      button: "border-red-700/50 text-red-600 hover:bg-red-800 hover:text-white",
      animation: { y: 150, scale: 0.95, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
    }
  };

  const activeVibe = vibeConfig[vibe] || vibeConfig.standard;

  return (
    <motion.div 
      id={htmlId}
      initial={{ opacity: 0, filter: 'blur(10px)', y: activeVibe.animation.y, scale: activeVibe.animation.scale || 1 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={activeVibe.animation.transition}
      className={`max-w-4xl mx-auto my-16 ${activeVibe.bg} border ${activeVibe.border} rounded-sm shadow-2xl overflow-hidden relative scroll-mt-32`}
    >
      {/* Top border glow */}
      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${activeVibe.glow}`}></div>

      {/* THE FOG GATE OVERLAY */}
      {!isUnlocked && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-md">
          <h2 className="text-3xl md:text-5xl text-red-600 font-serif tracking-[0.2em] mb-8 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            TRAVERSE THE MIST
          </h2>
          <button 
            onClick={() => setIsUnlocked(true)}
            className="px-10 py-4 border border-red-700 text-red-500 hover:bg-red-800 hover:text-white transition-all duration-300 uppercase tracking-widest text-sm font-bold shadow-[0_0_20px_rgba(153,27,27,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
          >
            Enter Fog Gate
          </button>
        </div>
      )}

      {/* INNER CONTENT - Blurs out if the Fog Gate is active */}
      <div className={`transition-all duration-1000 ${!isUnlocked ? 'blur-xl opacity-20 pointer-events-none' : 'blur-0 opacity-100'}`}>
        
        {/* Header Section */}
        <div className={`p-8 border-b ${activeVibe.border} text-center`}>
          <h3 className={`${activeVibe.textAccent} font-serif text-xs tracking-[0.3em] uppercase mb-3 opacity-80`}>
            {day}
          </h3>
          <h2 className="text-3xl md:text-5xl text-gray-200 font-serif tracking-wide">
            {title}
          </h2>
        </div>

        {/* Image Gallery Section */}
        <div className="relative group/gallery">
          {images.length > 1 && (
            <>
              <button 
                onClick={() => scroll('left')}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 ${activeVibe.textAccent} border ${activeVibe.border} opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 ${activeVibe.button} flex items-center justify-center font-serif text-xl z-10 cursor-pointer backdrop-blur-sm`}
              >
                &#8592;
              </button>
              <button 
                onClick={() => scroll('right')}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 ${activeVibe.textAccent} border ${activeVibe.border} opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 ${activeVibe.button} flex items-center justify-center font-serif text-xl z-10 cursor-pointer backdrop-blur-sm`}
              >
                &#8594;
              </button>
            </>
          )}

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory bg-[#050505] scroll-smooth" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, index) => (
              <div 
                key={index} 
                className={`relative min-w-[90%] md:min-w-[60%] snap-center h-72 md:h-96 shrink-0 group/img border-r ${activeVibe.border} last:border-r-0`}
              >
                <img 
                  src={img} 
                  alt={`${title} - location ${index + 1}`}
                  className="w-full h-full object-cover grayscale-[40%] group-hover/img:grayscale-0 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/30 group-hover/img:bg-transparent transition-colors duration-500"></div>
                
                <div className={`absolute bottom-4 right-4 bg-black/60 px-3 py-1 ${activeVibe.textAccent} font-serif text-xs tracking-widest border ${activeVibe.border} backdrop-blur-sm`}>
                  {index + 1} / {images.length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-8 md:px-12 ${activeVibe.bg}`}>
          <p className="text-gray-400 font-serif leading-relaxed text-lg mb-8">
            {description}
          </p>
          
          <div className="flex justify-center mt-6">
            {/* The button is now a Link component pointing to the gallery page hash */}
            <Link 
              to={`/gallery#gallery-day-${id}`}
              className={`px-8 py-3 border ${activeVibe.button} transition-all duration-300 uppercase tracking-[0.2em] text-xs font-bold cursor-pointer inline-block`}
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DayCard;