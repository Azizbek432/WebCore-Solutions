'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';

export default function PortfolioPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-cyber-bg text-slate-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {t.navPortfolio}
          </div>

          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            {t.portfolioTitle}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
            {t.portfolioSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-amber-500 border border-amber-500/20">
                    {project.category}
                  </span>
                  <FolderGit2 className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> {t.previewBtn}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ml-auto"
                    >
                      <Sparkles className="w-4 h-4" /> {t.githubBtn}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}