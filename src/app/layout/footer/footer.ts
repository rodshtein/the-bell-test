import { ChangeDetectionStrategy, Component } from '@angular/core';

const SITE = 'https://thebell.io';

interface MenuColumn {
  title: string;
  items: { title: string; href: string }[];
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly categories = [
    { title: 'Главное', href: SITE + '/' },
    { title: 'Новости', href: SITE + '/category/news' },
    { title: 'Экономика', href: SITE + '/tag/ekonomika' },
    { title: 'Финансы', href: SITE + '/tag/finansy' },
    { title: 'Технологии', href: SITE + '/tag/tehnologii' },
    { title: 'Бизнес', href: SITE + '/tag/biznes' },
    { title: 'Инвестиции', href: SITE + '/category/bell-investitsii' },
  ];

  protected readonly columns: MenuColumn[] = [
    {
      title: 'Проекты',
      items: [
        { title: 'Email-рассылки', href: SITE + '/paywall' },
        { title: 'YouTube: «Это Осетинская»', href: 'https://www.youtube.com/channel/UCo3S9OQDrM79i7yPmixnSsQ' },
        { title: 'Bell.Club', href: 'https://thebell.club/' },
        { title: 'YouTube: Bell.Club Live', href: 'https://www.youtube.com/channel/UC7_VjEuPizTvqvPWr8NLnTA' },
        { title: 'IN SCHOOL', href: 'https://inschool.ai/' },
      ],
    },
    {
      title: 'Рассылки',
      items: [
        { title: 'Утренняя', href: SITE + '/paywall' },
        { title: 'Вечерняя', href: SITE + '/paywall' },
        { title: 'Итоги недели', href: SITE + '/paywall' },
        { title: 'The Bell.Tech', href: 'https://subscription.thebell.site/tech' },
        { title: 'The Bell.Invest', href: SITE + '/invest' },
        { title: 'The Bell in English', href: 'https://pro.thebell.io' },
      ],
    },
    {
      title: 'Соцсети',
      items: [
        { title: 'Facebook', href: 'https://www.facebook.com/TheBell.io/' },
        { title: 'Instagram', href: 'https://www.instagram.com/thebell_io/' },
      ],
    },
    {
      title: 'Telegram',
      items: [
        { title: 'The Bell', href: 'https://t.me/thebell_io' },
        { title: 'The Bell.Tech', href: 'https://t.me/Bell_tech' },
        { title: 'The Bell.Invest', href: 'https://t.me/thebell_invest' },
      ],
    },
    {
      title: 'Twitter',
      items: [
        { title: 'The Bell', href: 'https://twitter.com/ru_thebell' },
        { title: 'The Bell in English', href: 'https://twitter.com/thebell_io' },
      ],
    },
    {
      title: 'О нас',
      items: [
        { title: 'Стать патроном', href: SITE + '/together' },
        { title: 'О проекте', href: SITE + '/about' },
        { title: 'Команда и контакты', href: SITE + '/team' },
        { title: 'Конфиденциальность', href: SITE + '/privacy-policy' },
        { title: 'Настройки cookie', href: '#' },
        { title: 'Оферта', href: 'https://drive.google.com/file/d/1iZPp8aB0SRN_B4uixMi-LFvBxM4DHuit/view' },
      ],
    },
    {
      title: 'Коммерция',
      items: [
        { title: 'Партнеры', href: SITE + '/category/partnery-the-bell' },
        { title: 'Рекламодателям', href: SITE + '/assets/docs/the_bell_mediakit.pdf' },
      ],
    },
  ];
}
