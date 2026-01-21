'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/* ===============================
   Background de Estrelas
================================ */
export function StarBackground() {
  const [stars, setStars] = useState<
    { id: number; top: string; left: string; size: number }[]
  >([]);
  const [shootingStars, setShootingStars] = useState<number[]>([]);

  /* Estrelas estáticas */
  useEffect(() => {
    const newStars = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
    }));
    setStars(newStars);
  }, []);

  /* Estrelas cadentes com frequência natural */
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const spawnShootingStar = () => {
      const id = Date.now();
      setShootingStars(prev => [...prev, id]);

      // Remove depois da animação
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star !== id));
      }, 3000);

      // Chance de cluster (chuva rápida)
      if (Math.random() > 0.75) {
        setTimeout(() => {
          setShootingStars(prev => [...prev, Date.now() + 1]);
        }, 250);
      }

      // Próxima estrela entre 1.5s e 4s
      const next = Math.random() * 2500 + 1500;
      timeout = setTimeout(spawnShootingStar, next);
    };

    spawnShootingStar();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Estrelas Estáticas */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: '0 0 6px rgba(255,255,255,0.8)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
