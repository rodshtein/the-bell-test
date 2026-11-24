import { ChangeDetectionStrategy, Component } from '@angular/core';

const SITE = 'https://thebell.io';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly site = SITE;

  protected readonly tags = [
    { title: 'Главное', href: SITE + '/', selected: true },
    { title: 'Новости', href: SITE + '/category/news' },
    { title: 'Экономика', href: SITE + '/tag/ekonomika' },
    { title: 'Технологии', href: SITE + '/tag/tehnologii' },
    { title: 'Бизнес', href: SITE + '/tag/biznes' },
    { title: 'Инвестиции', href: SITE + '/category/bell-investitsii' },
  ];
}
