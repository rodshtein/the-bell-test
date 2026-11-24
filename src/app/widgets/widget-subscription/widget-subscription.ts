import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Basis, SubscriptionList } from '../../core/models';
import { Rotation } from '../../core/rotation';

const PRODUCTS = [
  {
    slug: 'news',
    title: 'Читайте новости и\u00a0аналитику The\u00a0Bell без\u00a0ограничений',
    lead: 'Новостные рассылки «Утро», «Вечер» и\u00a0«Итоги недели»',
    url: 'https://thebell.io/paywall',
    image: 'assets/media/offer-news-cover.png',
  },
  {
    slug: 'tech',
    title: 'Читайте материалы The\u00a0Bell.Tech без\u00a0ограничений',
    lead: 'О\u00a0технологиях и\u00a0IT‑компаниях в\u00a0мире и\u00a0в\u00a0России',
    url: 'https://subscription.thebell.site/tech',
    image: 'assets/media/promo-tech.webp',
  },
  {
    slug: 'invest',
    title: 'Читайте материалы The\u00a0Bell.Invest без\u00a0ограничений',
    lead: 'Фондовый рынок глазами долгосрочного инвестора',
    url: 'https://thebell.io/invest',
    image: 'assets/media/promo-invest.webp',
  },
  {
    slug: 'unlimited',
    title: 'Весь The\u00a0Bell в\u00a0одной подписке',
    lead: 'Неограниченный доступ ко\u00a0всем материалам The\u00a0Bell',
    url: 'https://subscription.thebell.io/unlimited',
    image: 'assets/media/offer-unlimited-cover.png',
  },
];

@Component({
  selector: 'app-widget-subscription',
  templateUrl: './widget-subscription.html',
  styleUrl: './widget-subscription.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetSubscription {
  private readonly rotation = inject(Rotation);

  readonly contentItem = input.required<SubscriptionList>();
  readonly basis = input.required<Basis>();

  protected readonly product = computed(() => {
    const { id } = this.contentItem();
    return PRODUCTS[this.rotation.pick(`subscription:${id}`, PRODUCTS.length)];
  });
}
