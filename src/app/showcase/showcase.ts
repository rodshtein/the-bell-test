import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Basis, ContentItem, EventList, GridLine } from '../core/models';
import { LAYOUT_THEMES_RESPONSE } from '../data/layout-themes.response';
import { Line } from '../grid/line/line';

const ROWS: { basis: Basis; cells: number; minHeight: number }[] = [
  { basis: 33, cells: 3, minHeight: 300 },
  { basis: 50, cells: 2, minHeight: 300 },
  { basis: 100, cells: 1, minHeight: 500 },
];

const EVENTS = LAYOUT_THEMES_RESPONSE[0].preset.items
  .map((item) => item.contentItem)
  .find((item): item is EventList => item.__typename === 'EventList');

function buildRows(name: string, create: (id: string) => ContentItem | null): GridLine[] {
  return ROWS.map(({ basis, cells, minHeight }) => ({
    id: `${name}-${basis}`,
    basis,
    minHeight,
    cells: Array.from({ length: cells }, (_, index) => ({
      basis,
      contentItem: create(`${name}-${basis}-${index}`),
    })),
  }));
}

@Component({
  selector: 'app-showcase',
  imports: [Line],
  templateUrl: './showcase.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase {
  protected readonly lines = [
    ...buildRows('subscription', (id) => ({
      id,
      products: ['news', 'tech', 'invest', 'unlimited'],
      __typename: 'SubscriptionList',
    })),
    ...buildRows('event', (id) => (EVENTS ? { ...EVENTS, id } : null)),
  ];
}
