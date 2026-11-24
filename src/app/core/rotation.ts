import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Rotation {
  private readonly transferState = inject(TransferState);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly shown = new Map<string, number>();
  private readonly taken = new Map<string, Map<string, string>>();

  pick(blockId: string, keys: string[]): number {
    if (keys.length === 0) return 0;

    const entry = this.isBrowser ? String(history.state?.navigationId ?? 0) : 'server';
    const taken = this.taken.get(entry) ?? new Map<string, string>();
    this.taken.set(entry, taken);

    const savedKey = `${entry}:${blockId}`;
    let index = this.shown.get(savedKey);

    if (index === undefined || index >= keys.length) {
      const stateKey = makeStateKey<number>(`rotation:${blockId}`);
      if (this.isBrowser && this.transferState.hasKey(stateKey)) {
        index = this.transferState.get(stateKey, 0) % keys.length;
        this.transferState.remove(stateKey);
      } else {
        index = this.random(blockId, keys, taken);
      }
      if (!this.isBrowser) this.transferState.set(stateKey, index);
      this.shown.set(savedKey, index);
    }

    taken.set(blockId, keys[index]);
    return index;
  }

  private random(blockId: string, keys: string[], taken: Map<string, string>): number {
    const busy = new Set([...taken].filter(([id]) => id !== blockId).map(([, key]) => key));
    const all = keys.map((_, index) => index);
    const free = all.filter((index) => !busy.has(keys[index]));
    const pool = free.length > 0 ? free : all;
    return pool[Math.floor(Math.random() * pool.length)];
  }
}
