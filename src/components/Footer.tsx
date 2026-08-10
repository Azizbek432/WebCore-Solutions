'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 px-6 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Link href="/" className="text-xl font-extrabold text-blue-500 tracking-wider">
            WebCore<span className="text-white">.dev</span>
          </Link>
          <p className="mt-2 text-slate-400 max-w-sm">{t.footerDesc}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-slate-300">
          <Link href="/" className="hover:text-blue-400 transition">{t.navHome}</Link>
          <Link href="/services" className="hover:text-blue-400 transition">{t.navServices}</Link>
          <Link href="/portfolio" className="hover:text-blue-400 transition">{t.navPortfolio}</Link>
          <Link href="/about" className="hover:text-blue-400 transition">{t.navAbout}</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">{t.navContact}</Link>
        </div>

        <div className="text-center md:text-right text-xs text-slate-400">
          <p>© {new Date().getFullYear()} WebCore Solutions. {t.footerRights}</p>
          <p className="mt-1">
            Built by{' '}
            <a
              href="https://azizbek-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 font-semibold hover:underline"
            >
              Azizbek Abdullayev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}