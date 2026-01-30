
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../lib/content';
import { track, Events } from '../lib/track';

export const LeadMagnet: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'names' | 'questions' | 'finished'>('intro');
  const [names, setNames] = useState({ p1: '', p2: '' });
  const [qIndex, setQIndex] = useState(0);

  const startMagnet = () => {
    setStep('names');
    track(Events.LeadMagnetStarted);
  };

  const handleDownload = () => {
    // Simulate PDF generation
    const docText = `
      ОДНОЙ НИТЬЮ: ПРАКТИКА БЛИЗОСТИ
      Партнеры: ${names.p1} и ${names.p2}
      
      Ваши 7 вопросов для глубокого разговора:
      ${content.leadMagnet.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
      
      Рекомендация: Выберите 15 минут, когда вас никто не потревожит.
      Слушайте, не перебивая. Близость — это внимание.
    `;
    const blob = new Blob([docText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'one-thread-practice.txt';
    a.click();
    track(Events.LeadMagnetCompleted);
  };

  return (
    <section id="lead-magnet" className="py-24 luxury-gradient">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-4xl font-display mb-6">{content.leadMagnet.title}</h2>
              <p className="text-lg text-[#3E3B39]/60 mb-10">{content.leadMagnet.description}</p>
              <button 
                onClick={startMagnet}
                className="bg-[#3E3B39] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-black transition-all"
              >
                Попробовать сейчас
              </button>
            </motion.div>
          )}

          {step === 'names' && (
            <motion.div key="names" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 rounded-3xl">
              <h3 className="text-2xl font-display mb-6">Как вас зовут?</h3>
              <div className="space-y-4 mb-8">
                <input 
                  type="text" 
                  placeholder="Твое имя" 
                  className="w-full bg-white/50 border border-[#E5DED4] p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3E3B39]"
                  onChange={(e) => setNames(prev => ({ ...prev, p1: e.target.value }))}
                />
                <input 
                  type="text" 
                  placeholder="Имя партнера" 
                  className="w-full bg-white/50 border border-[#E5DED4] p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3E3B39]"
                  onChange={(e) => setNames(prev => ({ ...prev, p2: e.target.value }))}
                />
              </div>
              <button 
                onClick={() => setStep('questions')}
                disabled={!names.p1 || !names.p2}
                className="w-full bg-[#3E3B39] text-white py-4 rounded-xl font-medium disabled:opacity-30"
              >
                Продолжить
              </button>
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="p-12 glass-card rounded-3xl shadow-xl min-h-[300px] flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3E3B39]/40 mb-4 block">
                  Вопрос {qIndex + 1} из {content.leadMagnet.questions.length}
                </span>
                <p className="text-2xl md:text-3xl font-display leading-relaxed">
                  "{content.leadMagnet.questions[qIndex]}"
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => qIndex === content.leadMagnet.questions.length - 1 ? setStep('finished') : setQIndex(qIndex + 1)}
                  className="flex-1 bg-[#3E3B39] text-white py-4 rounded-full font-medium shadow-md"
                >
                  {qIndex === content.leadMagnet.questions.length - 1 ? 'Завершить' : 'Следующий вопрос'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 'finished' && (
            <motion.div key="finished" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
              <h3 className="text-3xl font-display mb-4">Близость — это навык</h3>
              <p className="text-[#3E3B39]/60 mb-10">
                Вы сделали первый шаг. Мы подготовили PDF-гайд с расширенным списком вопросов и практиками для ваших уютных вечеров.
              </p>
              <button 
                onClick={handleDownload}
                className="bg-[#3E3B39] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-black transition-all mb-4 block w-full"
              >
                Скачать PDF-гайд
              </button>
              <p className="text-[10px] text-[#3E3B39]/40 leading-tight">
                {content.leadMagnet.consentText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
