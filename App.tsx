
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { content, isMissing } from './lib/content';
import { track, Events } from './lib/track';
import { AlertMissing } from './components/ui/AlertMissing';
import { Header } from './components/Header';
import { Scene3D } from './components/Scene3D';
import { LeadMagnet } from './components/LeadMagnet';
import { Calculator } from './components/Calculator';
import { FAQ } from './components/FAQ';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setCurrentProgress(v));
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div className="relative overflow-x-hidden">
      {content.isDev && (
        <div className="fixed top-0 left-0 w-full bg-orange-500 text-white text-[10px] py-1 text-center z-[9999] uppercase tracking-widest font-bold">
          Внимание: Режим разработчика. Некоторые данные являются заглушками.
        </div>
      )}

      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
        <Scene3D scrollProgress={currentProgress} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl md:text-9xl font-display mb-6 tracking-tight">
            {content.brandName}
          </h1>
          <p className="text-lg md:text-2xl text-[#3E3B39]/70 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            {content.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#purchase" 
              onClick={() => track(Events.HeroCtaClicked)}
              className="w-full sm:w-auto bg-[#3E3B39] text-white px-10 py-4 rounded-full text-lg font-medium shadow-xl hover:bg-black transition-all"
            >
              Купить за {isMissing(content.price) ? <AlertMissing label="Цена" /> : `${content.price} ${content.currency}`}
            </a>
            <a 
              href="#lead-magnet" 
              className="w-full sm:w-auto bg-white/50 border border-[#E5DED4] text-[#3E3B39] px-10 py-4 rounded-full text-lg font-medium backdrop-blur-sm hover:bg-white transition-all"
            >
              Попробовать бесплатно
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-10 animate-bounce opacity-20">
          <div className="w-px h-12 bg-black"></div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-display mb-12">Как это работает</h2>
              <div className="space-y-12">
                {[
                  { step: "01", title: "Создайте атмосферу", desc: "Приглушите свет, отложите телефоны. Игра — это ваше время." },
                  { step: "02", title: "Выберите глубину", desc: "Три уровня сложности вопросов: от легкого смеха до сокровенных тайн." },
                  { step: "03", title: "Слушайте сердцем", desc: "Близость рождается не только в словах, но и в умении по-настоящему слышать." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <span className="text-sm font-bold text-[#3E3B39]/20 pt-1">{item.step}</span>
                    <div>
                      <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">{item.title}</h3>
                      <p className="text-[#3E3B39]/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-2xl group">
              <iframe 
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                src={content.links.youtubeVideo}
                title="Product Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <AlertMissing label="Видео" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section id="inside" className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-display mb-16">Что внутри коробки</h2>
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {[
              { label: "Карточек", val: content.boxDetails.cardsCount },
              { label: "Уровня", val: content.boxDetails.decksCount },
              { label: "Материал", val: content.boxDetails.materials },
              { label: "Статус", val: content.stockStatus }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-[#E5DED4] rounded-2xl">
                <div className="text-2xl font-display mb-2">
                  {isMissing(item.val) ? <AlertMissing label={item.label} /> : item.val}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3E3B39]/40">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-center text-left">
            <div className="flex-1">
              <img 
                src="https://picsum.photos/1200/800" 
                alt="Product" 
                className="rounded-3xl shadow-lg border-8 border-white"
              />
              <AlertMissing label="Галерея" />
            </div>
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-display">Комплектация</h3>
              <ul className="space-y-4">
                {content.boxDetails.included.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#3E3B39]/80">
                    <span className="w-1.5 h-1.5 bg-[#3E3B39] rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div id="purchase" className="pt-8">
                <div className="mb-4">
                  <span className="text-3xl font-display">{content.price} {content.currency}</span>
                  <span className="text-lg text-[#3E3B39]/30 line-through ml-3">{content.oldPrice} {content.currency}</span>
                </div>
                <div className="flex gap-4">
                  <a href={content.links.ozon} className="flex-1 bg-blue-600 text-white py-4 rounded-xl text-center font-bold hover:bg-blue-700 transition-all">OZON</a>
                  <a href={content.links.wildberries} className="flex-1 bg-purple-600 text-white py-4 rounded-xl text-center font-bold hover:bg-purple-700 transition-all">WB</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-display mb-6">Говорят о нас</h2>
              <p className="text-[#3E3B39]/50 leading-relaxed mb-8">
                Каждая история уникальна. Мы благодарны за то, что вы доверяете нам самое ценное — ваше общение.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">4.9/5</span>
                <div className="flex text-orange-400">★★★★★</div>
              </div>
            </div>
            <div className="md:w-2/3 flex gap-6 overflow-x-auto pb-8 snap-x">
              {content.reviews.map((rev, i) => (
                <div key={i} className="min-w-[300px] bg-[#FDFBF7] p-8 rounded-3xl border border-[#E5DED4] snap-start">
                  <div className="text-orange-400 mb-4">{"★".repeat(rev.rating)}</div>
                  <p className="text-[#3E3B39]/70 italic mb-6">"{rev.text}"</p>
                  <p className="font-bold text-sm uppercase tracking-widest">{rev.name}</p>
                </div>
              ))}
              <AlertMissing label="Реальные отзывы" />
            </div>
          </div>
        </div>
      </section>

      <LeadMagnet />
      <Calculator />
      <FAQ />

      {/* Footer */}
      <footer className="bg-[#3E3B39] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <h2 className="text-3xl font-display mb-6">{content.brandName}</h2>
              <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
                Помогаем парам строить глубокую связь через честные разговоры и осознанные действия.
              </p>
              <div className="flex gap-4">
                <a href={content.links.instagram} className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#3E3B39] transition-all">Inst</a>
                <a href={content.links.telegram} className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#3E3B39] transition-all">TG</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-6 opacity-40">Навигация</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#how-it-works" className="hover:text-white/60 transition-colors">Как это работает</a></li>
                <li><a href="#inside" className="hover:text-white/60 transition-colors">Комплектация</a></li>
                <li><a href="#calculator" className="hover:text-white/60 transition-colors">Калькулятор</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-6 opacity-40">Контакты</h4>
              <div className="text-sm space-y-2 opacity-60">
                <p>{content.legal.inn}</p>
                <p>support@onethread.game</p>
                <a href={content.legal.privacyLink} className="block hover:underline">Политика приватности</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 text-[10px] uppercase tracking-widest opacity-30 text-center">
            {content.legal.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
