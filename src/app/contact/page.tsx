'use client';

import { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Send, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/mgawjovz';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setErrorMessage(t.contactError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-cyber-bg text-slate-900 dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black">{t.contactTitle}</h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{t.contactSub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-4 lg:col-span-1">
            <a
              href="https://t.me/WebCoreSolutions"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-white dark:bg-cyber-card border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-amber-500/50 transition cursor-pointer"
            >
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold">{t.telegramChannel}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">@WebCoreSolutions</div>
              </div>
            </a>

            <div className="p-6 rounded-2xl bg-white dark:bg-cyber-card border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold">{t.locationTitle}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t.locationValue}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-8 rounded-2xl bg-white dark:bg-cyber-card border border-slate-200 dark:border-slate-800">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="w-16 h-16 text-amber-500 mx-auto" />
                <h3 className="text-xl font-bold">{t.contactSuccess}</h3>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-sm font-semibold rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  {t.contactResetBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-500 text-sm">
                    <AlertTriangle className="w-5 h-5" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t.contactName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t.contactEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t.contactMessage}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-amber-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? t.contactSendingBtn : <><Send className="w-4 h-4" /> {t.contactSendBtn}</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}