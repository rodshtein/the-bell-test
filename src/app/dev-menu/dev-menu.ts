import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Basis } from '../core/models';
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

  protected link(change: { subscription?: Basis; event?: Basis; subscribed?: boolean }): string {
    const params = new URLSearchParams({
      subscription: String(change.subscription ?? this.viewer.subscriptionBasis),
      event: String(change.event ?? this.viewer.eventBasis),
    });
    if (change.subscribed ?? this.viewer.isSubscribed) params.set('subscribed', '1');
    return `/?${params}`;
  }
}
