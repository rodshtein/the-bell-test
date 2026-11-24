import { Basis } from './models';

const HOUR = 3_600_000;
const HOUR_WORDS = ['', '', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'];
const IMAGE_SIZE: Record<Basis, string> = { 25: '632_500', 33: '812_600', 50: '1264_600', 100: '632_500' };
const DATE = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Moscow',
});

function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export function formatTime(publishedAt: number, now: number): string {
  const diff = now - publishedAt;
  if (diff >= 0 && diff < HOUR) {
    const minutes = Math.max(1, Math.floor(diff / 60_000));
    return `${minutes} ${plural(minutes, 'минуту', 'минуты', 'минут')} назад`;
  }
  if (diff >= HOUR && diff < 24 * HOUR) {
    const hours = Math.floor(diff / HOUR);
    const word = plural(hours, 'час', 'часа', 'часов');
    if (hours === 1) return `${word} назад`;
    return `${HOUR_WORDS[hours] ?? hours} ${word} назад`;
  }
  return DATE.format(publishedAt).replace(/\s*г\.$/, '');
}

export function localImage(src: string, basis: Basis, resized: boolean): string {
  const file = src.split('/').pop() ?? '';
  if (!resized) return `assets/media/${file}`;
  return `assets/media/${file.replace(/\.\w+$/, '')}_${IMAGE_SIZE[basis]}.webp`;
}

const EVENT_DAY = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', timeZone: 'Etc/GMT-1' });
const EVENT_TIME = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Etc/GMT-1' });

export function formatEventDate(startsAt: number): string {
  return `${EVENT_DAY.format(startsAt)}, ${EVENT_TIME.format(startsAt)} CET`;
}
