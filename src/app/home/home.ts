import { ChangeDetectionStrategy, Component } from '@angular/core';
import { buildLines } from '../core/build-lines';
import { LAYOUT_DATA_RESPONSE } from '../data/layout-data.response';
import { LAYOUT_THEMES_RESPONSE } from '../data/layout-themes.response';
import { Line } from '../grid/line/line';

@Component({
  selector: 'app-home',
  imports: [Line],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly lines = buildLines(LAYOUT_THEMES_RESPONSE[0], LAYOUT_DATA_RESPONSE);
}
