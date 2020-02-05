import momentTz from 'moment-timezone';
import log from './logger';

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

export function convertToUkraineTime(
  day: number | string,
  hours: number | string
): {day: string; time: string} {
  const momentKiev = momentTz().tz('Europe/Kiev');
  const possibleDayValues = [`${day}`, `0${day}`]; // returning database format for day is strange and can be in random format as 04 or 4
  const currentDate = momentKiev.format('DD');
  const correctDate =
    (possibleDayValues.includes(currentDate) && momentKiev.format('YYYY-MM-DD')) ||
    new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]; // ToDo: getting date for rfc format, there is absolutly better solution
  // so we need calculate offset date, eg if we are past new day

  if (`${hours}`.length != 2) {
    hours = `0${hours}`;
  }
  log.info({correctDate});
  const kievDate = momentTz().tz(`${correctDate}T${`${hours}`}:00:00Z`, 'Europe/Kiev');
  const debugInfo = {day: kievDate.format('DD'), time: kievDate.format('HH:mm')};
  log.info(debugInfo);

  return {day: kievDate.format('DD'), time: kievDate.format('HH:mm')};
}
