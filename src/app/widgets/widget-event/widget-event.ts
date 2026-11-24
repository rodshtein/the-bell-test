import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { openWebinars } from '../../core/events';
import { formatEventDate } from '../../core/format';
import { Basis, EventList, ParentProduct } from '../../core/models';
import { Rotation } from '../../core/rotation';
import { Viewer } from '../../core/viewer';

const PARENT_TITLES: Record<ParentProduct, string> = {
  news: 'The Bell',
  tech: 'The Bell.Tech',
  invest: 'The Bell.Invest',
  unlimited: 'The Bell.Unlimited',
  chat: 'The Chat',
};

@Component({
  selector: 'app-widget-event',
  templateUrl: './widget-event.html',
  styleUrl: './widget-event.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetEvent {
  private readonly rotation = inject(Rotation);

  protected readonly isSubscribed = inject(Viewer).isSubscribed;

  readonly contentItem = input.required<EventList>();
  readonly basis = input.required<Basis>();

  protected readonly view = computed(() => {
    const list = this.contentItem();
    const webinars = openWebinars(list, Date.now());
    const webinar = webinars[this.rotation.pick(`event:${list.id}`, webinars.length)];
    return webinar
      ? { webinar, date: formatEventDate(webinar.starts_at), parentTitle: PARENT_TITLES[webinar.parent_product] }
      : null;
  });
}
