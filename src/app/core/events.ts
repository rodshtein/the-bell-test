import { EventList, Webinar } from './models';

export function openWebinars(list: EventList, now: number): Webinar[] {
  return list.webinars
    .filter((webinar) => webinar.registration_ends_at > now)
    .sort((a, b) => a.starts_at - b.starts_at);
}
