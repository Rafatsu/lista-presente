'use client';

import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MysteryBox } from './components/MysteryBox';
import { EasterEgg } from './components/EasterEgg';

const listaNormal = [
  { id: 1, text: 'Ssd 1tb - 300~400' },
  { id: 2, text: 'Tenis - 160~300' },
  { id: 3, text: 'Copo/garrafa stanley - 60~170' },
  { id: 4, text: 'Fone qcy n70 - 250~300' },
  { id: 5, text: 'Mouse vertical logitech/ugreen - 200~400' },
];

const listaCara = [
  { id: 1, text: 'MacBook Pro M3 - 15k+' },
  { id: 2, text: 'iPhone 15 Pro Max - 8k+' },
  { id: 3, text: 'Cadeira Herman Miller - 12k' },
  { id: 4, text: 'Monitor Odyssey G9 - 7k' },
  { id: 5, text: 'Tesla Model 3 - 300k' },
];

export default function Home() {
  const [items, setItems] = useState(listaNormal);
  const [isLuxury, setIsLuxury] = useState(false);
  const controls = useAnimation();

  const handleUnlock = () => {
    setIsLuxury(true);
    setItems(listaCara);
    // Opcional: tocar um som de vidro quebrando aqui
  };

  // Função que será chamada a cada clique na rachadura
  const triggerShake = async () => {
    await controls.start({
      x: [-4, 4, -4, 4, 0],
      y: [-2, 2, -2, 2, 0],
      transition: { duration: 0.15 }
    });
  };

  return (
    // O motion.main agora é controlado pelo 'controls'
    <motion.main 
      animate={controls}
      className={`flex min-h-screen flex-col items-center justify-start pt-20 transition-colors duration-1000 ${isLuxury ? 'bg-black' : 'bg-[#0a1128]'} text-white font-[family-name:var(--font-pixel)]`}
    >
      
      <h1 className={`text-2xl md:text-4xl font-bold mb-20 text-center drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase transition-colors ${isLuxury ? 'text-red-600' : 'text-yellow-400'}`}>
        {isLuxury ? 'Lista de Elite' : 'Minha Lista de Desejos'}
      </h1>
      
      <div className="flex flex-wrap justify-center gap-8 px-10 max-w-6xl">
        {items.map((item, index) => (
          <div key={`${isLuxury ? 'lux-' : 'norm-'}${item.id}`} className="w-40 h-40">
            <MysteryBox itemText={item.text} delay={index * 0.15} />
          </div>
        ))}
      </div>

      {/* Passamos a função de tremor para o componente EasterEgg */}
      <EasterEgg onUnlock={handleUnlock} onShake={triggerShake} />
    </motion.main>
  );
}