'use client';

import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MysteryBoxProps {
  itemText: string;
  delay: number;
}

export function MysteryBox({ itemText, delay }: MysteryBoxProps) {
    const [revealed, setRevealed] = useState(false);
    const [showCoin, setShowCoin] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio('/sounds/coin.mp3');
        
        audio.volume = 0.2; 
        
        audioRef.current = audio;
        audioRef.current.load();
    }, []);

    const handleBoxClick = () => {
        if (!revealed) {
            if (!audioRef.current) {
                audioRef.current = new Audio('/sounds/coin.mp3');
            }
            
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.log("Erro ao tocar som:", e));


            setShowCoin(true);
            setTimeout(() => setShowCoin(false), 500);
        }
        setRevealed(!revealed);
    };

    const floatVariants: Variants = {
        animate: {
        y: [0, -10, 0],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
        },
        },
    };

    const coinVariants: Variants = {
        initial: { y: 0, opacity: 0 },
        animate: { 
        y: -80, 
        opacity: [0, 1, 0],
        transition: { duration: 0.5, ease: "easeOut" } 
        },
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center font-[family-name:var(--font-pixel)]">
        <AnimatePresence>
            {showCoin && (
            <motion.div
                variants={coinVariants}
                initial="initial"
                animate="animate"
                className="absolute -top-10 z-0 text-3xl drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
            >
                🪙
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
                className="w-full h-full bg-[#f9a800] rounded-lg border-[6px] border-[#222] shadow-[inset_-8px_-8px_0px_rgba(0,0,0,0.2)] flex items-center justify-center"
                variants={floatVariants}
                animate="animate"
            >
                <span className="text-white text-4xl drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">?</span>
            </motion.div>
            ) : (
            <motion.div
                className="w-full h-full bg-[#4a5568] rounded-lg border-[6px] border-[#222] shadow-inner flex items-center justify-center p-2 text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <p className="text-[10px] uppercase leading-tight">{itemText}</p>
            </motion.div>
            )}
        </motion.div>
        </div>
    );
}