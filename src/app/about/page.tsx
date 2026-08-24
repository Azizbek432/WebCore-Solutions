'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Code2, Rocket } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-cyber-bg text-slate-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black">{t.aboutTitle || t.navAbout}</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            {t.aboutSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-cyber-card border border-slate-200 dark:border-slate-800 space-y-4">
            <Code2 className="w-8 h-8 text-amber-500" />
            <h3 className="text-xl font-bold">{t.stackTitle}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {t.stackDesc}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-cyber-card border border-slate-200 dark:border-slate-800 space-y-4">
            <Rocket className="w-8 h-8 text-amber-500" />
            <h3 className="text-xl font-bold">{t.fastTitle}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {t.fastDesc}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}