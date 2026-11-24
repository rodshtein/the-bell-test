import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Viewer {
  readonly isSubscribed = new URLSearchParams(inject(DOCUMENT).location.search).get('subscribed') === '1';
}
