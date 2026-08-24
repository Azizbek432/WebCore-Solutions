'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { servicesData } from '@/data/services';
import { Check, ArrowRight, Sparkles, Zap, Bot, Globe, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const { t } = useLanguage();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return <Globe className="w-6 h-6 text-amber-500" />;
      case 'mobile': return <Smartphone className="w-6 h-6 text-amber-500" />;
      case 'ai': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'bot': return <Bot className="w-6 h-6 text-amber-500" />;
      default: return <Zap className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-cyber-bg text-slate-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> {t.profSolutions}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
            {t.navServices}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            {t.servicesSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`relative flex flex-col justify-between p-8 rounded-2xl bg-white dark:bg-cyber-card border ${
                service.popular
                  ? 'border-amber-500 shadow-xl shadow-amber-500/10'
                  : 'border-slate-200 dark:border-slate-800'
              } transition-all duration-300 hover:-translate-y-1`}
            >
              {service.popular && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider">
                  {t.popularBadge}
                </div>
              )}

              <div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 w-fit mb-6 border border-slate-200 dark:border-slate-800">
                  {getCategoryIcon(service.category)}
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="text-3xl font-extrabold text-amber-500 mb-6">
                  {service.price}
                </div>

                <ul className="space-y-3 border-t border-slate-100 dark:border-slate-800/80 pt-6 mb-8">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/#calculator"
                className="w-full py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-amber-600 transition cursor-pointer"
              >
                {t.orderBtn} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}