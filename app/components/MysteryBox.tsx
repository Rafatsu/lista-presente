'use client';

import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MysteryBoxProps {
    itemText: string;
    itemImage: string; // Nova prop
    delay: number;
}

export function MysteryBox({ itemText, itemImage, delay }: MysteryBoxProps) {
    const [revealed, setRevealed] = useState(false);
    const [showCoin, setShowCoin] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/sounds/coin.mp3');
        audioRef.current.volume = 0.2;
    }, []);

    const handleBoxClick = () => {
        // Só toca som e anima moeda se estiver fechando para abrir
        if (!revealed) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {});
            }
            setShowCoin(true);
            setTimeout(() => setShowCoin(false), 500);
        }
        setRevealed(!revealed);
    };

    const floatVariants: Variants = {
        animate: {
            y: [0, -10, 0],
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay },
        },
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center font-[family-name:var(--font-pixel)]">
            <AnimatePresence>
                {showCoin && (
                    <motion.div
                        initial={{ y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ y: -120, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1] }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute z-0 flex items-center justify-center"
                    >
                        <div className="w-10 h-10 bg-yellow-400 border-4 border-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.8)]">
                           <span className="text-yellow-700 text-lg font-bold">|</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="relative z-10 w-full h-full cursor-pointer"
                whileTap={{ scale: 0.9, y: -10 }}
                onClick={handleBoxClick}
            >
                {!revealed ? (
                    <motion.div
                        className="w-full h-full bg-[#f9a800] rounded-lg border-[6px] border-[#222] shadow-[inset_-8px_-8px_0px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center"
                        variants={floatVariants}
                        animate="animate"
                    >
                        <span className="text-white text-4xl drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">?</span>
                    </motion.div>
                ) : (
                    <motion.div
                        className="w-full h-full bg-[#4a5568] rounded-lg border-[6px] border-[#222] shadow-inner flex flex-col items-center justify-between p-2 text-center overflow-hidden"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <p className="text-[8px] md:text-[10px] uppercase leading-tight text-white mb-2">{itemText}</p>
                        
                        {/* Imagem do Item */}
                        <motion.img 
                            src={itemImage} 
                            alt={itemText}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-full h-2/3 object-cover rounded border-2 border-[#222] bg-white"
                        />
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}