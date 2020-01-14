import {Request, Response} from 'express';
import log from '../../util/logger';
import {dal} from '../../dal';
import {getCurrentUnixDay, getUnixTimeFromString} from '../../util/time';

export async function getForecastForTodayHandler(req: Request, res: Response): Promise<Response> {
  const forecast = await dal.getForecastByTimestampExect(getCurrentUnixDay());
  log.info('Fetched forecast');

  return res.status(200).send(forecast);
}

export async function getForecastForDateHandler(req: Request, res: Response): Promise<Response> {
  const {
    query: {date}
  } = req;
  const forecast = await dal.getForecastByTimestampExect(getUnixTimeFromString(date as string));
  log.info('Fetched forecast');

  return res.status(200).send(forecast);
}

export async function getForecastInRangeHandler(req: Request, res: Response): Promise<Response> {
  const {
    query: {dateFrom, dateTo}
  } = req;
  const forecast = await dal.getForecastInRange(
    getUnixTimeFromString(dateFrom),
    getUnixTimeFromString(dateTo)
  );
  log.info('Fetched forecast');

  return res.status(200).send(forecast);
}
