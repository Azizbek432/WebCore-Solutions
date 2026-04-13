const i18n = {
  uz: {
    "nav-home": "Bosh sahifa",
    "nav-services": "Xizmatlar",
    "nav-contact": "Bog'lanish",
    "hero-title": "Biznesingizni Onlayn dunyoga olib chiqing!",
    "hero-desc": "Noldan yozilgan, tez va xavfsiz veb-saytlar faqat bizda.",
    "hero-btn": "Buyurtma berish",
    "service-lp-title": "Landing Page",
    "service-lp-desc": "Tezkor va sifatli bir sahifali saytlar.",
    "service-port-title": "Portfolio",
    "service-port-desc": "Shaxsiy brendingiz uchun maxsus dizayn.",
    "service-eco-title": "E-commerce",
    "service-eco-desc": "Savdo-sotiq uchun onlayn do'konlar.",
    "contact-title": "Biz bilan bog'laning 📩",
    "contact-desc":
      "Loyihangiz haqida yozing, biz sizga tez orada javob beramiz.",
    "form-name": "Ismingiz",
    "form-email": "Emailingiz",
    "form-msg": "Xabaringiz...",
    "form-btn": "Xabar yuborish",
  },
  ru: {
    "nav-home": "Главная",
    "nav-services": "Услуги",
    "nav-contact": "Контакт",
    "hero-title": "Выведите свой бизнес в Онлайн мир!",
    "hero-desc": "Быстрые и безопасные сайты, написанные с нуля.",
    "hero-btn": "Заказать сейчас",
    "service-lp-title": "Landing Page",
    "service-lp-desc": "Быстрые и качественные одностраничные сайты.",
    "service-port-title": "Портфолио",
    "service-port-desc": "Специальный дизайн для вашего бренда.",
    "service-eco-title": "E-commerce",
    "service-eco-desc": "Онлайн-магазины для ваших продаж.",
    "contact-title": "Свяжитесь с нами 📩",
    "contact-desc": "Напишите о проекте, мы ответим в ближайшее время.",
    "form-name": "Ваше имя",
    "form-email": "Ваш Email",
    "form-msg": "Ваше сообщение...",
    "form-btn": "Отправить сообщение",
  },
  en: {
    "nav-home": "Home",
    "nav-services": "Services",
    "nav-contact": "Contact",
    "hero-title": "Take your business to the Online world!",
    "hero-desc": "Fast and secure websites written from scratch.",
    "hero-btn": "Order now",
    "service-lp-title": "Landing Page",
    "service-lp-desc": "Fast and quality single-page websites.",
    "service-port-title": "Portfolio",
    "service-port-desc": "Custom design for your personal brand.",
    "service-eco-title": "E-commerce",
    "service-eco-desc": "Online stores for your sales.",
    "contact-title": "Contact us 📩",
    "contact-desc": "Write about your project, we will reply soon.",
    "form-name": "Your name",
    "form-email": "Your Email",
    "form-msg": "Your message...",
    "form-btn": "Send message",
  },
};

function changeLanguage(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang][key]) {
      if (el.querySelector("span")) {
        const spanText = el.querySelector("span").innerText;
        const template = i18n[lang][key];
        const highlightWords = ["Onlayn", "Онлайн", "Online"];
        let resultHTML = template;

        highlightWords.forEach((word) => {
          if (template.includes(word)) {
            resultHTML = template.replace(word, `<span>${word}</span>`);
          }
        });
        el.innerHTML = resultHTML;
      } else {
        el.innerText = i18n[lang][key];
      }
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (i18n[lang][key]) {
      el.placeholder = i18n[lang][key];
    }
  });
}

window.onload = () => {
  const savedLang = localStorage.getItem("lang") || "uz";
  changeLanguage(savedLang);
};
