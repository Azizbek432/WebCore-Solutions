'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Calculator from '@/components/Calculator';
import { useLanguage } from '@/context/LanguageContext';
import { Zap, Layout, ShieldCheck, ArrowRight, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-cyber-bg text-slate-900 dark:text-white transition-colors duration-300">
      <Header />

      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-6 shadow-sm">
            {t.heroBadge}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#calculator"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
            >
              {t.heroCtaPrimary} <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services"
              className="px-6 py-3.5 bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-sm"
            >
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-3 tracking-tight">{t.whyUsTitle}</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">{t.whyUsDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/5 group">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t.feat1Title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.feat1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/5 group">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t.feat2Title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.feat2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/5 group">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t.feat3Title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.feat3Desc}</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 max-w-4xl mx-auto w-full">
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              {t.creatorBadge}
            </span>
            <h3 className="text-2xl font-black">{t.creatorName}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">{t.creatorDesc}</p>
          </div>
          <a
            href="https://azizbek-dev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all duration-300 flex items-center gap-2 shrink-0 shadow-md hover:scale-[1.02]"
          >
            <Code2 className="w-4 h-4" />
            {t.creatorPortfolioBtn}
          </a>
        </div>
      </section>

      <section id="calculator" className="py-16 px-6 flex justify-center">
        <Calculator />
      </section>

      <Footer />
    </div>
  );
}