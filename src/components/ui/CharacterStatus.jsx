// src/components/ui/CharacterStatus.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profileData';

const CharacterStatus = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto my-24 bg-[#050505] border border-[#c5a87c]/30 p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative font-serif text-gray-300"
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/background.jpg')] opacity-5 mix-blend-screen pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Basic Info */}
        <div className="space-y-6">
          <div className="border-b border-[#c5a87c]/20 pb-4">
            <h2 className="text-3xl text-[#c5a87c] tracking-widest uppercase mb-1">{profileData.name}</h2>
            <p className="text-sm text-gray-500 tracking-widest uppercase">Character Status</p>
          </div>
          
          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <span className="text-gray-500">Level</span>
              <span className="text-gray-200">{profileData.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Class</span>
              <span className="text-gray-200">{profileData.archetype}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Covenant</span>
              <span className="text-gray-200">{profileData.covenant}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-[#c5a87c]/20">
            <div className="flex justify-between items-center">
              <span className="text-[#c5a87c] tracking-widest text-sm">Runes Held</span>
              <span className="text-xl">{profileData.runes}</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Attributes (Skills) */}
        <div className="md:border-l md:border-r border-[#c5a87c]/20 md:px-8 space-y-1">
          <h3 className="text-[#c5a87c] tracking-widest uppercase text-sm border-b border-[#c5a87c]/20 pb-2 mb-4">Attribute Points</h3>
          
          {profileData.attributes.map((attr, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 group cursor-default">
              <div className="flex flex-col">
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors">{attr.name}</span>
                <span className="text-xs text-[#c5a87c]/0 group-hover:text-[#c5a87c]/70 transition-colors absolute -mt-4 bg-[#050505] pl-1 z-10 hidden md:group-hover:block">
                  {attr.description}
                </span>
              </div>
              <span className="text-xl group-hover:text-[#c5a87c] transition-colors">{attr.value}</span>
            </div>
          ))}
        </div>

        {/* Right Column: Key Items (Projects) */}
        <div className="space-y-4">
          <h3 className="text-[#c5a87c] tracking-widest uppercase text-sm border-b border-[#c5a87c]/20 pb-2 mb-4">Key Items / Projects</h3>
          
          {profileData.keyItems.map((item, idx) => (
            <div key={idx} className="bg-[#12110f] border border-[#c5a87c]/10 p-4 hover:border-[#c5a87c]/40 transition-colors">
              <h4 className="text-gray-200 text-lg mb-1">{item.name}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default CharacterStatus;