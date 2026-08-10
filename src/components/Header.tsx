'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/data/translations';
import { Globe } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-extrabold text-blue-500 tracking-wider">
        WebCore<span className="text-white">.dev</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <Link href="/" className="hover:text-blue-400 transition">{t.navHome}</Link>
        <Link href="/services" className="hover:text-blue-400 transition">{t.navServices}</Link>
        <Link href="/portfolio" className="hover:text-blue-400 transition">{t.navPortfolio}</Link>
        <Link href="/about" className="hover:text-blue-400 transition">{t.navAbout}</Link>
        <Link href="/contact" className="hover:text-blue-400 transition">{t.navContact}</Link>
      </nav>

      <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
        <Globe className="w-4 h-4 text-slate-400 ml-1" />
        {(['uz', 'en', 'ru'] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-2 py-1 text-xs font-bold rounded-md transition ${
              language === lang ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}