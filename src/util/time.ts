import momentTz from 'moment-timezone';

export const DAY_MILISECONDS = 86400000;

export function getUnixTimeFromString(dateTime: string): number {
  return momentTz(dateTime, 'DD/MM/YYYY')
    .tz('Europe/Kiev')
    .unix();
}

export function getUnixCurrentTime(): number {
  return momentTz(new Date(), 'DD/MM/YYYY')
    .tz('Europe/Kiev')
    .unix();
}

export function dateFromUnix(timestamp: number): string {
  return momentTz
    .unix(timestamp)
    .tz('Europe/Kiev')
    .format('DD/MM/YYYY');
}

export function getCurrentUnixDay(): number {
  const date = momentTz()
    .tz('Europe/Kiev')
    .format('DD/MM/YYYY');

  return getUnixTimeFromString(date);
}
