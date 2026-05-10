// src/components/ui/Embers.jsx
import React, { useMemo } from 'react';

const Embers = () => {
  // Generate 35 random embers so they don't look uniform
  const particles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`, // Random horizontal position
      size: `${Math.random() * 6 + 2}px`, // Size between 2px and 8px
      duration: `${Math.random() * 10 + 5}s`, // Float up takes 5 to 15 seconds
      delay: `${Math.random() * 10}s`, // Start at different times
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ember"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Embers;