// src/app/layout.tsx
import { Press_Start_2P } from 'next/font/google';
import './globals.css';

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel' 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={pixelFont.variable}>
      <body>{children}</body>
    </html>
  );
}