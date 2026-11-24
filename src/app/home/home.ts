import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { buildLines } from '../core/build-lines';
import { Viewer } from '../core/viewer';
import { LAYOUT_DATA_RESPONSE } from '../data/layout-data.response';
import { LAYOUT_THEMES_RESPONSE } from '../data/layout-themes.response';
import { applyDevLayout } from '../dev-menu/dev-layout';
import { Line } from '../grid/line/line';

@Component({
  selector: 'app-home',
  imports: [Line],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly viewer = inject(Viewer);

  protected readonly lines = buildLines(
    applyDevLayout(LAYOUT_THEMES_RESPONSE[0], this.viewer.subscriptionBasis, this.viewer.eventBasis),
    LAYOUT_DATA_RESPONSE,
    Date.now(),
    this.viewer.isSubscribed,
  );
}
