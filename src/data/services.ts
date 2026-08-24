export interface ServiceItem {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'ai' | 'bot';
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'web-app',
    title: 'Full-Stack Web App',
    category: 'web',
    price: '$350+',
    description: 'Next.js 15, Supabase va Tailwind CSS asosida yaratilgan zamonaviy korporativ platforma.',
    features: ['SEO Optimizatsiya', 'Admin Panel', 'Super Fast Loading', 'Responsive Design'],
    popular: true,
  },
  {
    id: 'ai-integration',
    title: 'AI Solutions & Bots',
    category: 'ai',
    price: '$200+',
    description: 'OpenAI/Claude API integratsiyasi va biznes jarayonlarini avtomatlashtiruvchi intellektual tizimlar.',
    features: ['Custom Prompting', 'Telegram Bot UI', 'Database Sync', 'Auto-Reply Tizimi'],
  },
  {
    id: 'telegram-automation',
    title: 'Telegram Automation Hub',
    category: 'bot',
    price: '$120+',
    description: "Aiogram 3.x va PostgreSQL bilan ishlaydigan murakkab to'lov va CRM botlari.",
    features: ['Click/Payme Integratsiya', 'User Analytics', 'Broadcasting Tizimi'],
  },
];