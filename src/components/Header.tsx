'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/data/translations';
import { Globe, Cpu } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-cyber-bg/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between transition-colors duration-300">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 group-hover:scale-105 transition">
          <Cpu className="w-5 h-5 text-amber-500" />
        </div>
        <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white">
          WebCore<span className="text-amber-500">.dev</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
        <Link href="/" className="hover:text-amber-500 transition">{t.navHome}</Link>
        <Link href="/services" className="hover:text-amber-500 transition">{t.navServices}</Link>
        <Link href="/portfolio" className="hover:text-amber-500 transition">{t.navPortfolio}</Link>
        <Link href="/about" className="hover:text-amber-500 transition">{t.navAbout}</Link>
        <Link href="/contact" className="hover:text-amber-500 transition">{t.navContact}</Link>
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-cyber-card p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <Globe className="w-4 h-4 text-amber-500 ml-1.5 mr-0.5" />
          {(['uz', 'en', 'ru'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                language === lang
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}