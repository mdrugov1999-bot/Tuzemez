import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track, Events } from '../lib/track';

const questions = [
  { id: 'talk', label: 'Частота душевных разговоров', desc: 'Как часто вы обсуждаете что-то глубже бытовых дел?' },
  { id: 'listen', label: 'Качество слушания', desc: 'Насколько партнер чувствует себя услышанным?' },
  { id: 'shared', label: 'Совместные действия', desc: 'Как много времени вы проводите вместе за общим делом?' },
  { id: 'conflict', label: 'Уровень конфликтов', desc: 'Насколько бережно вы решаете разногласия?' },
  { id: 'touch', label: 'Нежность и прикосновения', desc: 'Как часто вы касаетесь друг друга без повода?' },
  { id: 'support', label: 'Чувство поддержки', desc: 'Насколько вы уверены, что партнер на вашей стороне?' },
  { id: 'screens', label: 'Время без телефонов', desc: 'Как часто вы откладываете гаджеты ради друг друга?' },
];

export const Calculator: React.FC = () => {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleScore = (id: string, score: number) => {
    setScores(prev => ({ ...prev, [id]: score }));
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      setIsCalculated(true);
      track(Events.CalculatorCompleted, { scores });
    }
  };

  const calculateResult = () => {
    // Fix: Use generic reduce to ensure 'sum' is typed as a number for arithmetic operations on line 34
    const sum = Object.values(scores).reduce<number>((a, b) => a + b, 0);
    const index = Math.round((sum / (questions.length * 10)) * 100);
    const potential = Math.min(100, index + 25); // Theoretical 25% boost with regular gameplay
    return { index, potential };
  };

  const { index, potential } = isCalculated ? calculateResult() : { index: 0, potential: 0 };

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display mb-4">Калькулятор близости</h2>
          <p className="text-lg text-[#3E3B39]/60">Оцените текущий уровень связи и узнайте потенциал роста за 14 дней.</p>
        </div>

        {!isCalculated ? (
          <div className="glass-card p-10 rounded-3xl shadow-sm border border-[#E5DED4]">
            <div className="mb-8">
              <div className="h-1 w-full bg-[#E5DED4] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#3E3B39]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / questions.length) * 100}%` }}
                />
              </div>
              <p className="text-right text-xs mt-2 font-medium uppercase tracking-widest text-[#3E3B39]/40">
                Шаг {step + 1} из {questions.length}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={questions[step].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-2xl font-display mb-2">{questions[step].label}</h3>
                <p className="text-[#3E3B39]/60 mb-8">{questions[step].desc}</p>
                
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                    <button
                      key={val}
                      onClick={() => handleScore(questions[step].id, val)}
                      className="aspect-square flex items-center justify-center rounded-xl border border-[#E5DED4] hover:bg-[#3E3B39] hover:text-white transition-all text-sm font-medium"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-[#FDFBF7] p-12 rounded-3xl border border-[#E5DED4]"
          >
            <div className="flex justify-around mb-12">
              <div>
                <div className="text-5xl font-display mb-2">{index}%</div>
                <div className="text-xs uppercase tracking-widest text-[#3E3B39]/40 font-bold">Текущий индекс</div>
              </div>
              <div className="text-[#3E3B39]/20 self-center text-3xl">→</div>
              <div>
                <div className="text-5xl font-display text-green-700 mb-2">{potential}%</div>
                <div className="text-xs uppercase tracking-widest text-green-700/60 font-bold">Ваш потенциал</div>
              </div>
            </div>

            <div className="space-y-6 text-left mb-12">
              <div className="p-4 bg-white rounded-xl border border-[#E5DED4]">
                <h4 className="font-bold text-sm mb-1 uppercase tracking-wider text-[#3E3B39]">Рекомендация по общению</h4>
                <p className="text-[#3E3B39]/70 text-sm">Ваш индекс разговоров можно усилить 10-минутным вечерним ритуалом 'Одна карта за чаем'.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E5DED4]">
                <h4 className="font-bold text-sm mb-1 uppercase tracking-wider text-[#3E3B39]">Конфликтология</h4>
                <p className="text-[#3E3B39]/70 text-sm">Внедрите правило 'Я-сообщений'. Это снижает защитную реакцию партнера на 40%.</p>
              </div>
            </div>

            <button 
              onClick={() => setIsCalculated(false)} 
              className="text-[#3E3B39]/40 text-sm hover:underline"
            >
              Пройти заново
            </button>
          </motion.div>
        )}

        <p className="mt-8 text-center text-xs text-[#3E3B39]/30 leading-relaxed italic">
          *Данный расчет является эмпирической моделью, основанной на психологических опросниках. Он не заменяет профессиональную психотерапию.
        </p>
      </div>
    </section>
  );
};