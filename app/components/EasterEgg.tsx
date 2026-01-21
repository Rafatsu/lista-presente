'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface EasterEggProps {
  onUnlock: () => void;
  onShake: () => void;
}

// Sub-componente para cada partícula de "pedra/estilhaço"
const Particle = ({ x, y }: { x: number, y: number }) => {
  const randomX = (Math.random() - 0.5) * 300; // Direção aleatória
  const randomY = (Math.random() - 0.8) * 300; // Voa mais para cima
  
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: randomX, y: randomY, opacity: 0, scale: 0, rotate: 360 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute bg-gray-400 w-2 h-2"
      style={{ left: x, top: y, clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
    />
  );
};

export function EasterEgg({ onUnlock, onShake }: EasterEggProps) {
  const [clicks, setClicks] = useState(0);
  const [particles, setParticles] = useState<{ id: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    audioRef.current = new Audio('/sounds/tremor.mp3');
    audioRef.current.volume = 0.4;
  }, []);

  const handleClick = async () => {
    if (clicks >= 5) return;

    const nextClick = clicks + 1;
    setClicks(nextClick);

    // 1. Som
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    // 2. Criar partículas (id único para cada clique)
    setParticles([...Array(8)].map((_, i) => ({ id: Date.now() + i })));

    // 3. Tremer a tela
    onShake();

    if (nextClick === 5) {
      onUnlock();
    }
  };

  const crackPaths = [
    "M 100 100 L 85 85 L 90 75",
    "M 100 100 L 85 85 L 90 75 M 85 85 L 70 80 L 65 65",
    "M 100 100 L 85 85 L 90 75 M 85 85 L 70 80 L 65 65 M 70 80 L 55 90 L 40 85",
    "M 100 100 L 85 85 L 90 75 M 85 85 L 70 80 L 65 65 M 70 80 L 55 90 L 40 85 M 65 65 L 50 50 L 55 35",
    "M 100 100 L 85 85 L 90 75 M 85 85 L 70 80 L 65 65 M 70 80 L 55 90 L 40 85 M 65 65 L 50 50 L 55 35 M 50 50 L 30 45 L 20 60"
  ];

  return (
    <>
      {/* Container de tremor para o fundo */}
      <motion.div animate={controls} className="fixed inset-0 pointer-events-none z-[99]" />

      <div 
        onClick={handleClick}
        className="fixed bottom-0 right-0 w-40 h-40 cursor-pointer z-[100] flex items-end justify-end p-4 overflow-visible"
      >
        {/* Sistema de Partículas */}
        <AnimatePresence>
          {particles.map((p) => (
            <Particle key={p.id} x={80} y={80} />
          ))}
        </AnimatePresence>

        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2.5" className="drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
          <motion.path
            d={crackPaths[clicks]} 
            initial={false}
            animate={{ pathLength: 1 }}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
          />
        </svg>

        {/* Guia visual para o primeiro clique */}
        {clicks === 0 && (
          <motion.div 
            animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-6 right-6 w-6 h-6 bg-white rounded-full blur-lg pointer-events-none"
          />
        )}
      </div>
    </>
  );
}