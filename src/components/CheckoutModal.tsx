'use client';

import { useState, FormEvent } from 'react';
import { ServiceItem } from '@/data/services';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface Props {
  service: ServiceItem | null;
  onClose: () => void;
}

export default function CheckoutModal({ service, onClose }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  if (!service) return null;

  const handleOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '8999870201:AAFwAHi2Jpd16BBhI6DTD9aooiYQNrJbSEQ';
    const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '7974635142';

    const text = 
      `🛒 **YANGI BUYURTMA (E-Commerce Hub)**\n\n` +
      `📦 **Xizmat:** ${service.title}\n` +
      `💰 **Boshlang'ich narx:** ${service.price}\n` +
      `👤 **Mijoz:** ${name}\n` +
      `📞 **Aloqa:** ${phone}\n` +
      `🆔 **Service ID:** ${service.id}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white dark:bg-cyber-card border border-slate-200 dark:border-amber-500/30 rounded-2xl p-6 shadow-2xl text-slate-900 dark:text-white transition-all">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-amber-500">
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold">Buyurtma Qabul Qilindi!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tez orada siz bilan aloqaga chiqamiz.</p>
            <button onClick={onClose} className="w-full py-2.5 bg-amber-500 text-black font-semibold rounded-xl">Yopish</button>
          </div>
        ) : (
          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">Buyurtma berish</span>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-amber-500 text-lg font-extrabold mt-1">{service.price}</p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ismingiz"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-amber-500"
              />
              <input
                type="text"
                placeholder="Telegram yoki Telefon"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {isSubmitting ? 'Yuborilmoqda...' : <><Send className="w-4 h-4" /> Instant Checkout</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}