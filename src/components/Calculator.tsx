'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import { Calculator as CalcIcon, Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Calculator() {
  const { language, t } = useLanguage();

  const [serviceType, setServiceType] = useState('landing');
  const [pages, setPages] = useState(1);
  const [needBot, setNeedBot] = useState(false);
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculatePrice = () => {
    const base = serviceType === 'landing' ? 150 : serviceType === 'ecommerce' ? 400 : 300;
    const extraPages = (pages - 1) * 30;
    const botPrice = needBot ? 100 : 0;
    return base + extraPages + botPrice;
  };

  const sendTelegramNotification = async (price: string) => {
    const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '8999870201:AAFwAHi2Jpd16BBhI6DTD9aooiYQNrJbSEQ';
    const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '7974635142';

    if (!BOT_TOKEN || !CHAT_ID) return;

    const message = `🚀 <b>Yangi Buyurtma! (WebCore)</b>\n\n` +
      `👤 <b>Ism:</b> ${fullName}\n` +
      `📞 <b>Aloqa:</b> ${contactInfo}\n` +
      `📌 <b>Loyiha turi:</b> ${serviceType}\n` +
      `📄 <b>Sahifalar:</b> ${pages}\n` +
      `🤖 <b>Telegram Bot:</b> ${needBot ? 'Ha' : 'Yo\'q'}\n` +
      `💰 <b>Taxminiy qiymat:</b> ${price}\n` +
      `🌐 <b>Til:</b> ${language.toUpperCase()}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });
    } catch (err) {
      console.warn('Telegram bildirishnomasida fonda xatolik (UI ga ta\'siri yo\'q):', err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const estimatedPrice = `$${calculatePrice()}`;

    try {
      sendTelegramNotification(estimatedPrice);

      const { error } = await supabase.from('leads').insert([
        {
          full_name: fullName,
          contact_info: contactInfo,
          service_type: serviceType,
          budget_estimate: estimatedPrice,
          message: `${t.pageCountMsg}: ${pages}, ${t.telegramBotMsg}: ${needBot ? t.yes : t.no} [Lang: ${language.toUpperCase()}]`
        }
      ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
      setFullName('');
      setContactInfo('');
    } catch (err: unknown) {
      console.error('Supabase bazo xatosi:', err);
      setErrorMessage('Formani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-8 px-6 w-full max-w-3xl bg-white dark:bg-cyber-card border border-slate-200 dark:border-amber-500/20 rounded-2xl text-slate-900 dark:text-white shadow-xl transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <CalcIcon className="text-amber-500 w-7 h-7" />
        <h2 className="text-2xl font-bold">{t.calcTitle}</h2>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-500 text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <CheckCircle className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
          <h3 className="text-xl font-semibold">{t.successTitle}</h3>
          <p className="text-slate-500 dark:text-slate-400">{t.successDesc}</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setErrorMessage(null);
            }}
            className="mt-4 px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium rounded-xl transition cursor-pointer"
          >
            {t.recalculateBtn}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t.serviceTypeLabel}</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition"
            >
              <option value="landing">{t.landingOption}</option>
              <option value="corporate">{t.corporateOption}</option>
              <option value="ecommerce">{t.ecommerceOption}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.pagesLabel} {pages}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bot"
              checked={needBot}
              onChange={(e) => setNeedBot(e.target.checked)}
              className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
            />
            <label htmlFor="bot" className="text-sm cursor-pointer select-none">
              {t.telegramBotOption}
            </label>
          </div>

          <div className="p-4 bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t.estimatedPriceLabel}</span>
            <span className="text-3xl font-extrabold text-amber-500">${calculatePrice()}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t.namePlaceholder}
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isSubmitting}
              className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 disabled:opacity-50 transition"
            />
            <input
              type="text"
              placeholder={t.contactPlaceholder}
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              disabled={isSubmitting}
              className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 disabled:opacity-50 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            {isSubmitting ? t.submittingBtn : <><Send className="w-5 h-5" /> {t.submitBtn}</>}
          </button>
        </form>
      )}
    </section>
  );
}