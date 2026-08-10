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
    <div className="min-h-screen flex flex-col bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      <Header />

      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
            {t.heroBadge}
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent mb-6 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#calculator"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              {t.heroCtaPrimary} <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl border border-slate-800 transition"
            >
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{t.whyUsTitle}</h2>
          <p className="text-slate-400">{t.whyUsDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/40 transition group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t.feat1Title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.feat1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/40 transition group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t.feat2Title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.feat2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/40 transition group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t.feat3Title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{t.feat3Desc}</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 max-w-4xl mx-auto w-full">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {t.creatorBadge}
            </span>
            <h3 className="text-2xl font-bold">{t.creatorName}</h3>
            <p className="text-slate-400 text-sm max-w-md">{t.creatorDesc}</p>
          </div>
          <a
            href="https://azizbek-dev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition flex items-center gap-2 shrink-0 shadow-md"
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