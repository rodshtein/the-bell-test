import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Basis, ProductSlug } from '../core/models';
import { Viewer } from '../core/viewer';

const SIZES: { basis: Basis; label: string }[] = [
  { basis: 33, label: '1/3' },
  { basis: 50, label: '1/2' },
  { basis: 100, label: '1/1' },
];

@Component({
  selector: 'app-dev-menu',
  templateUrl: './dev-menu.html',
  styleUrl: './dev-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevMenu {
  protected readonly viewer = inject(Viewer);
  protected readonly sizes = SIZES;
  protected readonly isCollapsed = signal(false);

  protected toggle(): void {
    this.isCollapsed.update((value) => !value);
  }

  protected readonly products: { slug: ProductSlug; label: string }[] = [
    { slug: 'news', label: 'Новости' },
    { slug: 'tech', label: 'Tech' },
    { slug: 'invest', label: 'Invest' },
    { slug: 'unlimited', label: 'Unlimited' },
  ];

  protected link(change: { subscription?: Basis; event?: Basis; toggle?: ProductSlug }): string {
    const params = new URLSearchParams({
      subscription: String(change.subscription ?? this.viewer.subscriptionBasis),
      event: String(change.event ?? this.viewer.eventBasis),
    });
    const current = this.viewer.subscriptions;
    const toggle = change.toggle;
    const next = !toggle ? current : current.includes(toggle) ? current.filter((slug) => slug !== toggle) : [...current, toggle];
    if (next.length > 0) params.set('subscribed', next.join(','));
    return `/?${params}`;
  }
}
