import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DevMenu } from './dev-menu/dev-menu';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  imports: [RouterOutlet, Header, Footer, DevMenu],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly isBare = inject(DOCUMENT).location.pathname.startsWith('/showcase');

  protected readonly topBanner = {
    href: 'https://youtu.be/hiQbCXVqiYA',
    image: 'assets/media/top-banner-desktop.webp',
    imageMobile: 'assets/media/top-banner-mobile.webp',
  };
}
