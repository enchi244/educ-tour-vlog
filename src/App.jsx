// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Embers from './components/ui/Embers'; // <-- 1. IMPORT EMBERS HERE

const AnimatedRoutes = () => {
  const location = useLocation();
  const { scrollY, scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 3000], ['0%', '30%']);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const healthScaleX = useTransform(smoothProgress, [0, 1], [1, 0]);

  return (
    <>
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y: backgroundY, backgroundImage: "url('/background.jpg')" }}
        className="fixed inset-[-20%] z-0 opacity-15 pointer-events-none mix-blend-screen bg-center bg-cover bg-no-repeat"
      />
      
      {/* Global Shadow Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/90 to-[#0a0a0a] pointer-events-none"></div>

      {/* 2. PLACE EMBERS GLOBALLY HERE */}
      <Embers />

      {/* THE BOSS HEALTH BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-2 bg-[#1a0000] border border-[#c5a87c]/40 z-50 pointer-events-none shadow-[0_0_15px_rgba(153,27,27,0.4)]">
        <motion.div 
          className="w-full h-full bg-gradient-to-r from-red-600 to-red-900 origin-left"
          style={{ scaleX: healthScaleX }}
        />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#c5a87c] font-serif text-xs md:text-sm tracking-[0.3em] uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,1)] whitespace-nowrap">
          Educational Tour, The Final Requirement
        </div>
      </div>

      {/* CINEMATIC PAGE TRANSITIONS */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-[#c5a87c] selection:text-black font-sans pb-20 relative overflow-hidden">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;