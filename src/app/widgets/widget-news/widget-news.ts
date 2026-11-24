import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { formatTime, localImage } from '../../core/format';
import { Basis, ContentItem, NewsStyleData } from '../../core/models';
import { SNAPSHOT_TIME } from '../../data/snapshot';

const SITE = 'https://thebell.io';

@Component({
  selector: 'app-widget-news',
  templateUrl: './widget-news.html',
  styleUrl: './widget-news.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetNews {
  readonly contentItem = input.required<ContentItem>();
  readonly basis = input.required<Basis>();

  protected readonly view = computed(() => {
    const item = this.contentItem();
    const basis = this.basis();
    const style = JSON.parse(item.widget_style.data) as NewsStyleData;
    const background = style.background_image;
    const src = typeof background === 'string' ? background : background?.src;
    const category = item.__typename === 'Post' ? item.categories[0] : item.category;

    return {
      title: style.title || item.title,
      href: item.__typename === 'Post' ? `${SITE}/${item.slug}` : item.url,
      time: item.__typename === 'Post' ? formatTime(item.published_at, SNAPSHOT_TIME) : '',
      category: category?.title ?? '',
      categoryHref: category ? `${SITE}/category/${category.slug}` : SITE,
      image: src && basis !== 25 ? localImage(src, basis, item.assets.length > 0) : null,
    };
  });
}
