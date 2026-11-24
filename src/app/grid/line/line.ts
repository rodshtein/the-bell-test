import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { GridLine } from '../../core/models';
import { WidgetEvent } from '../../widgets/widget-event/widget-event';
import { WidgetNews } from '../../widgets/widget-news/widget-news';
import { WidgetSubscription } from '../../widgets/widget-subscription/widget-subscription';

@Component({
  selector: 'app-line',
  imports: [WidgetNews, WidgetSubscription, WidgetEvent],
  templateUrl: './line.html',
  styleUrl: './line.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Line {
  readonly line = input.required<GridLine>();

  protected readonly columns = computed(() =>
    this.line()
      .cells.map((cell) => `${cell.basis}fr`)
      .join(' '),
  );
}
