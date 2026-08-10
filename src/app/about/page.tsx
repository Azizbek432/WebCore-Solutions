'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
          <Clock className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">{t.navAbout} — {t.comingSoonTitle}</h1>
        <p className="text-slate-400 max-w-md mb-8 leading-relaxed">{t.comingSoonDesc}</p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> {t.backHomeBtn}
        </Link>
      </main>
      <Footer />
    </div>
  );
}