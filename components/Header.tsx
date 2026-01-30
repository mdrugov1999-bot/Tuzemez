
import React from 'react';
import { content } from '../lib/content';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#E5DED4]/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-display font-bold tracking-tight">
          {content.brandName}
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3E3B39]/70">
          <a href="#how-it-works" className="hover:text-[#3E3B39] transition-colors">Как это работает</a>
          <a href="#inside" className="hover:text-[#3E3B39] transition-colors">Что внутри</a>
          <a href="#lead-magnet" className="hover:text-[#3E3B39] transition-colors">7 Вопросов</a>
          <a href="#calculator" className="hover:text-[#3E3B39] transition-colors">Калькулятор</a>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="#purchase" 
            className="bg-[#3E3B39] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#5A5653] transition-colors"
          >
            Купить
          </a>
        </div>
      </div>
    </header>
  );
};
