import {Request, Response} from 'express';
import log from '../../util/logger';
import {dal} from '../../dal';
import {validateForecast} from '../post';
import {getUnixTimeFromString} from '../../util/time';

export async function updateExectForecastHandler(req: Request, res: Response): Promise<Response> {
  const {text, exectDate} = req.body;
  const forecast = await validateForecast({text, exectDate, res});
  log.info('Validated forecast');

  await dal.updateForecastByExectDate(getUnixTimeFromString(exectDate), forecast);
  log.info(`Updated forecast for ${exectDate}`);

  return res.status(200).send(forecast);
}

export async function updateRangeForecastHandler(req: Request, res: Response): Promise<Response> {
  const {text, dateFrom, dateTo} = req.body;
  const forecast = await validateForecast({text, dateFrom, dateTo, res});
  log.info('Validated forecast');

  await dal.updateForecastByDateRange(
    getUnixTimeFromString(dateFrom),
    getUnixTimeFromString(dateTo),
    forecast
  );
  log.info(`Updated forecast from ${dateFrom} to ${dateTo}`);

  return res.status(200).send(forecast);
}
