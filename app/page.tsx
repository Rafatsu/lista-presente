'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { MysteryBox } from './components/MysteryBox';
import { EasterEgg } from './components/EasterEgg';
import { FireParticles } from './components/FireParticles';

const listaNormal = [
  { id: 1, text: 'Ssd 1tb - R$400', image: '/images/ssd.png' },
  { id: 2, text: 'Tenis - R$250', image: '/images/tenis.png' },
  { id: 3, text: 'Copo/garrafa stanley - R$170', image: '/images/stanley.jpg' },
  { id: 4, text: 'Fone qcy n70 - R$300', image: '/images/fone.jpg' },
  { id: 5, text: 'Mouse vertical logitech/ugreen - R$400', image: '/images/mouse.jpg' },
];

const listaCara = [
  { id: 1, text: 'MacBook Air - R$7000', image: '/images/macbook.jpg' },
  { id: 2, text: 'iPhone 15 Pro Max - R$8000', image: '/images/iphone.jpg' },
  { id: 3, text: 'RTX 5090 - R$12000', image: '/images/rtx5090.jpg' },
  { id: 4, text: 'Steam Deck - R$5000', image: '/images/steamdeck.jpg' },
  { id: 5, text: 'PS5 - R$3000', image: '/images/ps5.jpg' },
];

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [items, setItems] = useState(listaNormal);
  const [isLuxury, setIsLuxury] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showFinalBox, setShowFinalBox] = useState(false);
  
  const controls = useAnimation();
  const normalAudioRef = useRef<HTMLAudioElement | null>(null);
  const epicAudioRef = useRef<HTMLAudioElement | null>(null);
  const finalBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    normalAudioRef.current = new Audio('/sounds/normalsoundtrack.mp3');
    epicAudioRef.current = new Audio('/sounds/epicsoundtrack.mp3');
    if (normalAudioRef.current && epicAudioRef.current) {
      normalAudioRef.current.loop = true;
      epicAudioRef.current.loop = true;
      normalAudioRef.current.volume = 0.3;
      epicAudioRef.current.volume = 0.3;
    }
  }, []);

  // Timer para o botão de scroll após entrar no modo Luxury
  useEffect(() => {
    if (isLuxury) {
      const timer = setTimeout(() => {
        setShowScrollButton(true);
      }, 12000); // 12 segundos
      return () => clearTimeout(timer);
    }
  }, [isLuxury]);

  useEffect(() => {
    if (!hasStarted) return;
    if (isLuxury) {
      normalAudioRef.current?.pause();
      epicAudioRef.current?.play().catch(() => {});
    } else {
      epicAudioRef.current?.pause();
      normalAudioRef.current?.play().catch(() => {});
    }
  }, [isLuxury, hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
    normalAudioRef.current?.play().catch(() => {});
  };

  const handleUnlock = () => {
    setIsLuxury(true);
    setItems(listaCara);
  };

  const scrollToFinal = () => {
    setShowFinalBox(true);
    setTimeout(() => {
      finalBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const triggerShake = async () => {
    await controls.start({
      x: [-4, 4, -4, 4, 0],
      y: [-2, 2, -2, 2, 0],
      transition: { duration: 0.15 }
    });
  };

  return (
    <motion.main 
      animate={controls}
      className={`flex min-h-screen w-full flex-col items-center justify-start transition-colors duration-1000 ${
        isLuxury ? 'bg-black' : 'bg-[#0a1128]'
      } text-white font-[family-name:var(--font-pixel)] pb-40`}
    >
      {isLuxury && <FireParticles />}
      
      <AnimatePresence>
        {!hasStarted ? (
          <motion.div key="start-screen" exit={{ opacity: 0, scale: 1.5 }} className="flex flex-col items-center gap-10 mt-40">
            <h1 className="text-3xl md:text-5xl text-yellow-400 text-center uppercase p-4">
              Lista de presentes misteriosa da pessoa mais incrível do mundo
            </h1>
            <button onClick={handleStart} className="px-8 py-4 bg-yellow-500 border-b-8 border-r-8 border-yellow-700 font-bold text-xl uppercase active:border-0">
              Começar
            </button>
          </motion.div>
        ) : (
          <motion.div key="game-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full">
            <AnimatePresence>
              {isLuxury && (
                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1.5 }} className="fixed inset-0 bg-white z-[110] pointer-events-none" />
              )}
            </AnimatePresence>
            
            <h1 className={`text-2xl md:text-4xl font-bold mt-20 mb-20 text-center uppercase ${isLuxury ? 'text-red-600' : 'text-yellow-400'}`}>
              {isLuxury ? 'Lista de Presentes Plus' : 'Lista de Presentes'}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-8 px-10 max-w-6xl">
              {items.map((item, index) => (
                <div key={`${isLuxury ? 'lux-' : 'norm-'}${item.id}`} className="w-40 h-40">
                  <MysteryBox itemText={item.text} itemImage={item.image} delay={index * 0.15} />
                </div>
              ))}
            </div>

            {/* BOTÃO DE SCROLL APÓS 5 SEGUNDOS */}
            <AnimatePresence>
              {showScrollButton && !showFinalBox && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={scrollToFinal}
                  className="mt-20 px-6 py-3 bg-red-600 text-white font-bold rounded-full animate-bounce shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                >
                  ↓
                </motion.button>
              )}
            </AnimatePresence>

            {/* ÚLTIMA CAIXA MISTERIOSA */}
            {showFinalBox && (
              <div ref={finalBoxRef} className="mt-[40vh] mb-60 flex flex-col items-center">
                <h2 className="text-red-600 text-3xl mb-10 animate-pulse">O Último item misterioso</h2>
                <div className="w-64 h-64">
                   <MysteryBox 
                     itemText="⭐⭐Safira⭐⭐" 
                     itemImage="/images/safira.webp" 
                     delay={0} 
                   />
                </div>
              </div>
            )}

            <EasterEgg onUnlock={handleUnlock} onShake={triggerShake} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}