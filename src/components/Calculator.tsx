'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import { Calculator as CalcIcon, Send, CheckCircle } from 'lucide-react';

export default function Calculator() {
  const { language, t } = useLanguage();

  const [serviceType, setServiceType] = useState('landing');
  const [pages, setPages] = useState(1);
  const [needBot, setNeedBot] = useState(false);
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Telegram API Error Response:', data);
      }
    } catch (err) {
      console.error('Telegram notification error:', err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const estimatedPrice = `$${calculatePrice()}`;
    try {
      await sendTelegramNotification(estimatedPrice);

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
        console.error('Supabase Error:', error);
      }

      setSubmitted(true);
      setFullName('');
      setContactInfo('');
    } catch (err) {
      console.error('Submit Error:', err);
      alert(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-6 w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl text-white shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <CalcIcon className="text-blue-500 w-7 h-7" />
        <h2 className="text-2xl font-bold">{t.calcTitle}</h2>
      </div>

      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h3 className="text-xl font-semibold">{t.successTitle}</h3>
          <p className="text-slate-400">{t.successDesc}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 rounded-lg transition"
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
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
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
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bot"
              checked={needBot}
              onChange={(e) => setNeedBot(e.target.checked)}
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
            <label htmlFor="bot" className="text-sm cursor-pointer select-none">
              {t.telegramBotOption}
            </label>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center justify-between">
            <span className="text-slate-400">{t.estimatedPriceLabel}</span>
            <span className="text-3xl font-extrabold text-blue-400">${calculatePrice()}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t.namePlaceholder}
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isSubmitting}
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
            />
            <input
              type="text"
              placeholder={t.contactPlaceholder}
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              disabled={isSubmitting}
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? t.submittingBtn : <><Send className="w-5 h-5" /> {t.submitBtn}</>}
          </button>
        </form>
      )}
    </section>
  );
}