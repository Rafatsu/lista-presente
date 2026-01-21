'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function FireParticles() {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Gera 40 partículas com IDs únicos
    setParticles(Array.from({ length: 40 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: '110vh', 
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ 
            opacity: [0, 0.8, 0.4, 0], 
            y: '-10vh',
            x: [
              `${Math.random() * 100}vw`, 
              `${(Math.random() * 100) + (Math.random() * 10 - 5)}vw`, 
              `${(Math.random() * 100) + (Math.random() * 20 - 10)}vw`
            ],
          }}
          transition={{ 
            duration: Math.random() * 5 + 3, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5 
          }}
          className="absolute w-1 h-2 md:w-2 md:h-3"
          style={{
            // Gradiente de fogo para as faíscas
            background: Math.random() > 0.5 
              ? 'radial-gradient(circle, #ff5f00, #ff0000)' 
              : 'radial-gradient(circle, #ffcc00, #ff5f00)',
            boxShadow: '0 0 8px #ff5f00',
            borderRadius: '20% 80% 50% 50%' // Formato de fagulha irregular
          }}
        />
      ))}
    </div>
  );
}