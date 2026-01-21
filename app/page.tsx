'use client';

import { motion } from 'framer-motion';

const items = [
  { id: 1, text: 'Aprender Next.js' },
  { id: 2, text: 'Dominar o Framer Motion' },
  { id: 3, text: 'Hospedar na Vercel' },
  { id: 4, text: 'Criar interfaces incríveis' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Minha Lista Animada</h1>
      
      <ul className="w-full max-w-md space-y-4">
        {items.map((item) => (
          <li 
            key={item.id}
            className="p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-lg"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </main>
  );
}