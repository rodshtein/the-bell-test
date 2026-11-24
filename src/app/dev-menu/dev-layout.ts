import { Basis, ContentItem, LayoutPresetItem, LayoutTheme } from '../core/models';

type Slot = Pick<LayoutPresetItem, 'layoutThemeItemId' | 'position'>;

const SUBSCRIPTION_SLOTS: Partial<Record<Basis, Slot>> = {
  33: { layoutThemeItemId: '4679', position: 2 },
  50: { layoutThemeItemId: '4621', position: 2 },
  100: { layoutThemeItemId: '4677', position: 1 },
};

const EVENT_SLOTS: Partial<Record<Basis, Slot>> = {
  33: { layoutThemeItemId: '4644', position: 2 },
  50: { layoutThemeItemId: '4674', position: 2 },
  100: { layoutThemeItemId: '4669', position: 1 },
};

function move(items: LayoutPresetItem[], typename: ContentItem['__typename'], slot: Slot | undefined) {
  if (!slot) return items;
  const widget = items.find((item) => item.contentItem.__typename === typename);
  if (!widget) return items;
  const from: Slot = { layoutThemeItemId: widget.layoutThemeItemId, position: widget.position };
  return items.map((item) => {
    if (item === widget) return { ...item, ...slot };
    const isDisplaced = item.layoutThemeItemId === slot.layoutThemeItemId && item.position === slot.position;
    return isDisplaced ? { ...item, ...from } : item;
  });
}

export function applyDevLayout(theme: LayoutTheme, subscriptionBasis: Basis, eventBasis: Basis): LayoutTheme {
  let items = theme.preset.items;
  items = move(items, 'SubscriptionList', SUBSCRIPTION_SLOTS[subscriptionBasis]);
  items = move(items, 'EventList', EVENT_SLOTS[eventBasis]);
  return { ...theme, preset: { ...theme.preset, items } };
}
