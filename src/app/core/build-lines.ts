import { openWebinars } from './events';
import { Basis, ContentItem, GridLine, LayoutDataItem, LayoutTheme, ProductSlug } from './models';
import { hasProduct } from './viewer';

const MIN_HEIGHT: Record<Basis, number> = { 25: 175, 33: 300, 50: 300, 100: 500 };

const isSmall = (item: ContentItem) => item.__typename === 'Post' && item.allowed_widget_sizes === '25';

function isVisible(item: ContentItem, now: number, subscriptions: ProductSlug[]): boolean {
  if (item.__typename === 'SubscriptionList') {
    return item.products.some((product) => !hasProduct(subscriptions, product));
  }
  if (item.__typename === 'EventList') return openWebinars(item, now).length > 0;
  return true;
}

export function buildLines(
  theme: LayoutTheme,
  feed: LayoutDataItem[],
  now: number,
  subscriptions: ProductSlug[],
): GridLine[] {
  const pinned = new Map(
    theme.preset.items
      .filter((item) => isVisible(item.contentItem, now, subscriptions))
      .map((item) => [`${item.layoutThemeItemId}:${item.position}`, item.contentItem]),
  );
  const feedItems = feed.map((item) => item.contentItem);
  const small = feedItems.filter(isSmall);
  const normal = feedItems.filter((item) => !isSmall(item));

  return [...theme.items]
    .sort((a, b) => a.sort - b.sort)
    .map((row) => {
      const widgets = row.layoutItem.widgets;
      const basis = widgets[0].basis;
      return {
        id: row.id,
        basis,
        minHeight: MIN_HEIGHT[basis],
        cells: widgets.map((widget, index) => ({
          basis: widget.basis,
          contentItem:
            pinned.get(`${row.id}:${index + 1}`) ??
            (widget.basis === 25 ? small.shift() : normal.shift()) ??
            null,
        })),
      };
    });
}
