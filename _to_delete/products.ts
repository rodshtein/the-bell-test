import { ProductSlug } from './models';

export interface Product {
  slug: ProductSlug;
  title: string;
  promoTitle: string;
  lead: string;
  url: string;
  image: string;
  eventBackground: string;
}

export const PRODUCTS: Record<ProductSlug, Product> = {
  news: {
    slug: 'news',
    title: 'Новости и аналитика',
    promoTitle: 'Читайте новости и аналитику The Bell без ограничений',
    lead: 'Новостные рассылки «Утро», «Вечер» и «Итоги недели»',
    url: 'https://thebell.io/paywall',
    image: 'assets/media/offer-news-cover.png',
    eventBackground: 'rgb(235, 51, 35)',
  },
  tech: {
    slug: 'tech',
    title: 'The Bell.Tech',
    promoTitle: 'Читайте материалы The Bell.Tech без ограничений',
    lead: 'О технологиях и IT‑компаниях в мире и в России',
    url: 'https://subscription.thebell.site/tech',
    image: 'assets/media/promo-tech.webp',
    eventBackground: 'rgb(26, 100, 225)',
  },
  invest: {
    slug: 'invest',
    title: 'The Bell.Invest',
    promoTitle: 'Читайте материалы The Bell.Invest без ограничений',
    lead: 'Фондовый рынок глазами долгосрочного инвестора',
    url: 'https://thebell.io/invest',
    image: 'assets/media/promo-invest.webp',
    eventBackground: 'linear-gradient(315deg, rgb(235, 51, 35) 0%, rgb(53, 53, 53) 60%)',
  },
  unlimited: {
    slug: 'unlimited',
    title: 'The Bell.Unlimited',
    promoTitle: 'Весь The Bell в одной подписке',
    lead: 'Неограниченный доступ ко всем материалам The Bell',
    url: 'https://subscription.thebell.io/unlimited',
    image: 'assets/media/offer-unlimited-cover.png',
    eventBackground: 'rgb(28, 28, 28)',
  },
};

export const PRODUCT_LIST: Product[] = [PRODUCTS.news, PRODUCTS.tech, PRODUCTS.invest, PRODUCTS.unlimited];
