
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../lib/content';
import { track, Events } from '../lib/track';


export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
    if (openIndex !== i) track(Events.FaqOpened, { index: i });
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-display text-center mb-16">Частые вопросы</h2>
        <div className="space-y-4">
          {content.faq?.items.map((item, i) => (
            <div key={i} className="border-b border-[#E5DED4] last:border-0">
              <button 
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-6 text-left hover:text-[#3E3B39]/60 transition-colors"
              >
                <span className="text-lg font-medium">{item.q}</span>
                <span className={`text-2xl transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[#3E3B39]/60 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
