export type Basis = 25 | 33 | 50 | 100;

export interface Category {
  id: number;
  title: string;
  slug: string;
  __typename: 'Category';
}

export interface Asset {
  id: string;
  src: string;
  version: number;
  width: number | null;
  role: number;
  height: number | null;
  isOrigin: boolean;
  mimeType: string | null;
  mode: string;
  params: string | null;
  subject: string;
  __typename: 'Asset';
}

export interface WidgetStyle {
  name: string;
  data: string;
  allowed_widget_sizes?: string;
  __typename: 'WidgetStyle';
}

export interface NewsStyleData {
  title: string;
  background?: string;
  main_image_as_background?: boolean;
  background_image: string | Asset | null;
  background_image_id?: string;
  additionalCategory?: string | null;
  advertising?: string | null;
  advertising_image?: string | null;
  advertising_link?: string | null;
  __type?: 'news';
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  published_at: number;
  updated_at: number;
  allowed_widget_sizes: string | null;
  categories: Category[];
  assets: Asset[];
  show_on_main: boolean;
  widget_style: WidgetStyle;
  __typename: 'Post';
}

export interface ExternalPost {
  id: string;
  title: string;
  assets: Asset[];
  category: Category;
  url: string;
  blank: boolean;
  widget_style: WidgetStyle;
  __typename: 'ExternalPost';
}

export type ProductSlug = 'news' | 'tech' | 'invest' | 'unlimited';

export interface SubscriptionList {
  id: string;
  products: ProductSlug[];
  __typename: 'SubscriptionList';
}

export type ParentProduct = ProductSlug | 'chat';

export interface Webinar {
  id: string;
  title: string;
  speaker: string;
  speaker_about: string;
  starts_at: number;
  registration_ends_at: number;
  url: string;
  parent_product: ParentProduct;
  __typename: 'Webinar';
}

export interface EventList {
  id: string;
  webinars: Webinar[];
  __typename: 'EventList';
}

export type ContentItem = Post | ExternalPost | SubscriptionList | EventList;

export interface LayoutWidget {
  id: string;
  slug: string;
  basis: Basis;
  __typename: 'LayoutWidget';
}

export interface LayoutLine {
  id: string;
  slug: string;
  widgets: LayoutWidget[];
  __typename: 'LayoutLine';
}

export interface LayoutThemeItem {
  id: string;
  sort: number;
  isRepeatable: boolean;
  isSmall: boolean;
  layoutItemId: string;
  layoutItem: LayoutLine;
  __typename: 'LayoutThemeItem';
}

export interface LayoutPresetItem {
  id: string;
  layoutPresetId: string;
  position: number;
  fixedModelName: string;
  fixedModelId: string;
  isRepeatable: boolean;
  layoutThemeItemId: string;
  contentItem: ContentItem;
  __typename: 'LayoutPresetItem';
}

export interface LayoutPreset {
  id: string;
  slug: string;
  items: LayoutPresetItem[];
}

export interface LayoutTheme {
  id: string;
  type: number;
  slug: string;
  title: string;
  style: string | null;
  items: LayoutThemeItem[];
  routePresetId: string;
  preset: LayoutPreset;
}

export interface LayoutDataItem {
  position: number;
  source: string;
  fixedModelName: string;
  contentItem: ContentItem;
}

export interface GridCell {
  basis: Basis;
  contentItem: ContentItem | null;
}

export interface GridLine {
  id: string;
  basis: Basis;
  minHeight: number;
  cells: GridCell[];
}
