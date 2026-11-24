import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Basis } from './models';

const WIDE: Basis[] = [33, 50, 100];

function parseBasis(value: string | null, fallback: Basis): Basis {
  const basis = Number(value) as Basis;
  return WIDE.includes(basis) ? basis : fallback;
}

@Injectable({ providedIn: 'root' })
export class Viewer {
  private readonly params = new URLSearchParams(inject(DOCUMENT).location.search);

  readonly isSubscribed = this.params.get('subscribed') === '1';
  readonly subscriptionBasis = parseBasis(this.params.get('subscription'), 50);
  readonly eventBasis = parseBasis(this.params.get('event'), 33);
}
