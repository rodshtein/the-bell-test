import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Basis, ParentProduct, ProductSlug } from './models';

const WIDE: Basis[] = [33, 50, 100];
const PRODUCTS: ProductSlug[] = ['news', 'tech', 'invest', 'unlimited'];

function parseBasis(value: string | null, fallback: Basis): Basis {
  const basis = Number(value) as Basis;
  return WIDE.includes(basis) ? basis : fallback;
}

export function hasProduct(subscriptions: ProductSlug[], product: ParentProduct): boolean {
  if (product === 'chat') return false;
  return subscriptions.includes('unlimited') || subscriptions.includes(product);
}

@Injectable({ providedIn: 'root' })
export class Viewer {
  private readonly params = new URLSearchParams(inject(DOCUMENT).location.search);

  readonly subscriptions = PRODUCTS.filter((slug) => (this.params.get('subscribed') ?? '').split(',').includes(slug));
  readonly subscriptionBasis = parseBasis(this.params.get('subscription'), 50);
  readonly eventBasis = parseBasis(this.params.get('event'), 33);

  has(product: ParentProduct): boolean {
    return hasProduct(this.subscriptions, product);
  }
}
