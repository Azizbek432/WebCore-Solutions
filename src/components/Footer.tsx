'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Cpu } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-cyber-bg py-10 px-6 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Link href="/" className="flex items-center gap-2 group">
            <Cpu className="w-5 h-5 text-amber-500" />
            <span className="text-xl font-extrabold tracking-wider text-slate-900 dark:text-white">
              WebCore<span className="text-amber-500">.dev</span>
            </span>
          </Link>
          <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
            {t.footerDesc}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-medium text-slate-700 dark:text-slate-300">
          <Link href="/" className="hover:text-amber-500 transition">{t.navHome}</Link>
          <Link href="/services" className="hover:text-amber-500 transition">{t.navServices}</Link>
          <Link href="/portfolio" className="hover:text-amber-500 transition">{t.navPortfolio}</Link>
          <Link href="/about" className="hover:text-amber-500 transition">{t.navAbout}</Link>
          <Link href="/contact" className="hover:text-amber-500 transition">{t.navContact}</Link>
        </div>

        <div className="text-center md:text-right text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} WebCore Solutions. {t.footerRights}</p>
          <p className="mt-1">
            Built by{' '}
            <a
              href="https://azizbek-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 font-semibold hover:underline"
            >
              Azizbek Abdullayev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}