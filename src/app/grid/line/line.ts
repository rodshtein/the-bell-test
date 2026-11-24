import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { GridLine } from '../../core/models';
import { WidgetNews } from '../../widgets/widget-news/widget-news';

@Component({
  selector: 'app-line',
  imports: [WidgetNews],
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
