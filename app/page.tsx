'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { MysteryBox } from './components/MysteryBox';
import { EasterEgg } from './components/EasterEgg';

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
  const controls = useAnimation();

  const normalAudioRef = useRef<HTMLAudioElement | null>(null);
  const epicAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    normalAudioRef.current = new Audio('/sounds/normalsoundtrack.mp3');
    epicAudioRef.current = new Audio('/sounds/epicsoundtrack.mp3');

    if (normalAudioRef.current && epicAudioRef.current) {
      normalAudioRef.current.loop = true;
      epicAudioRef.current.loop = true;
      normalAudioRef.current.volume = 0.3;
      epicAudioRef.current.volume = 0.3;
    }

    // Tenta tocar a música normal assim que o usuário interagir com a página
    const startNormalMusic = () => {
      if (!isLuxury && normalAudioRef.current) {
        normalAudioRef.current.play().catch(() => {});
        // Remove o listener após o primeiro play para não rodar de novo
        window.removeEventListener('click', startNormalMusic);
      }
    };

    window.addEventListener('click', startNormalMusic);

    return () => {
      normalAudioRef.current?.pause();
      epicAudioRef.current?.pause();
      window.removeEventListener('click', startNormalMusic);
    };
  }, []);

  useEffect(() => {
    if (isLuxury) {
      // Para a normal e toca a épica
      normalAudioRef.current?.pause();
      epicAudioRef.current?.play().catch(() => {});
    } else {
      // Se por algum motivo voltar ao normal, inverte
      epicAudioRef.current?.pause();
      normalAudioRef.current?.play().catch(() => {});
    }
  }, [isLuxury]);

  const handleStart = () => {
    setHasStarted(true);
    // O play aqui funciona porque o handleStart é disparado por um clique real
    normalAudioRef.current?.play().catch(() => {});
  };

  const handleUnlock = () => {
    setIsLuxury(true);
    setItems(listaCara);
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
      className={`flex min-h-screen w-full overflow-hidden flex-col items-center justify-center transition-colors duration-1000 ${
        isLuxury ? 'bg-black' : 'bg-[#0a1128]'
      } text-white font-[family-name:var(--font-pixel)]`}
    >
      <AnimatePresence>
        {!hasStarted ? (
          // TELA INICIAL COM BOTÃO
          <motion.div
            key="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            className="flex flex-col items-center gap-10"
          >
            <h1 className="text-3xl md:text-5xl text-yellow-400 text-center drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase">
              Misterioso Lista de Presente
            </h1>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-yellow-500 border-b-8 border-r-8 border-yellow-700 hover:bg-yellow-400 active:border-b-2 active:border-r-2 active:translate-y-1 transition-all text-black font-bold text-xl uppercase"
            >
              Começar
            </button>
          </motion.div>
        ) : (
          // CONTEÚDO DO JOGO
          <motion.div 
            key="game-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full"
          >
            <AnimatePresence>
              {isLuxury && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="fixed inset-0 bg-white z-[110] pointer-events-none"
                />
              )}
            </AnimatePresence>
            
            <h1 className={`text-2xl md:text-4xl font-bold mb-20 text-center drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase transition-colors ${isLuxury ? 'text-red-600' : 'text-yellow-400'}`}>
              {isLuxury ? 'Lista de Presentes Plus' : 'Lista de Presentes'}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-8 px-10 max-w-6xl">
              {items.map((item, index) => (
                <div key={`${isLuxury ? 'lux-' : 'norm-'}${item.id}`} className="w-40 h-40">
                  <MysteryBox 
                    itemText={item.text} 
                    itemImage={item.image}
                    delay={index * 0.15} 
                  />
                </div>
              ))}
            </div>

            <EasterEgg onUnlock={handleUnlock} onShake={triggerShake} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}