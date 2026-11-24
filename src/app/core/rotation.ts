import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Rotation {
  private readonly transferState = inject(TransferState);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly shown = new Map<string, number>();

  pick(blockId: string, count: number): number {
    if (count <= 1) return 0;

    const stateKey = makeStateKey<number>(`rotation:${blockId}`);

    if (!this.isBrowser) {
      const index = Math.floor(Math.random() * count);
      this.transferState.set(stateKey, index);
      return index;
    }

    const entry = `${history.state?.navigationId ?? 0}:${blockId}`;
    const saved = this.shown.get(entry);
    if (saved !== undefined && saved < count) return saved;

    const index = this.transferState.hasKey(stateKey)
      ? this.transferState.get(stateKey, 0)
      : Math.floor(Math.random() * count);
    this.transferState.remove(stateKey);
    this.shown.set(entry, index);
    return index;
  }
}
