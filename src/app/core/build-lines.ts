import { Basis, ContentItem, GridLine, LayoutDataItem, LayoutTheme } from './models';

const MIN_HEIGHT: Record<Basis, number> = { 25: 175, 33: 300, 50: 300, 100: 500 };

const isSmall = (item: ContentItem) => item.__typename === 'Post' && item.allowed_widget_sizes === '25';

export function buildLines(theme: LayoutTheme, feed: LayoutDataItem[]): GridLine[] {
  const pinned = new Map(
    theme.preset.items.map((item) => [`${item.layoutThemeItemId}:${item.position}`, item.contentItem]),
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
