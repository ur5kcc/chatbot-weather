import {Request, Response} from 'express';
import log from '../../util/logger';
import {Forecast} from '../../types/forecast';
import {ValidationError} from '../../util/errors';
import {ErrorCodes} from '../../types/error';
import {dal} from '../../dal';
import {DAY_MILISECONDS, getUnixCurrentTime, getUnixTimeFromString} from '../../util/time';

const Messages = {
  combinedDates: 'Date range and exect date used together',
  dateInPast: 'Date is in the past, forecast not valid',
  emptyText: 'No forecast to store in database',
  invalidDates: 'One or more of the providen dates is invalid'
};

export async function createForecastHandler(req: Request, res: Response): Promise<Response> {
  const {text, exectDate, dateFrom, dateTo} = req.body;
  const forecast = await validateForecast({text, exectDate, dateFrom, dateTo, res});
  log.info('Validated forecast');

  await dal.createForecast(forecast);
  log.info('Created new forecast');

  return res.status(200).send({message: 'ok', text});
}

export async function createForecastTodayHandler(req: Request, res: Response): Promise<Response> {
  const {text} = req.body;

  await dal.updateTodayForecast(text);
  log.info('Created new forecast');

  return res.status(200).send({message: 'ok', text});
}

export async function createForecastThreeDaysHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const {text} = req.body;

  await dal.update3Days(text);
  log.info('Created new forecast');

  return res.status(200).send({message: 'ok', text});
}

export async function createForecastStormHandler(req: Request, res: Response): Promise<Response> {
  const {text} = req.body;

  await dal.updateStorm(text);
  log.info('Created new forecast');

  return res.status(200).send({message: 'ok', text});
}

export async function validateForecast({
  text,
  exectDate,
  dateFrom,
  dateTo,
  res
}: {
  text: string;
  exectDate?: string;
  dateFrom?: string;
  dateTo?: string;
  res: Response;
}): Promise<Forecast> {
  if (!text || !text.length) {
    await sendResponseError(res, Messages.emptyText);
    throw new ValidationError(ErrorCodes.emptyText, Messages.emptyText);
  }

  if (exectDate && (dateFrom || dateTo)) {
    await sendResponseError(res, Messages.combinedDates);
    throw new ValidationError(ErrorCodes.combinedDates, Messages.combinedDates);
  }

  if (exectDate) {
    const exectDateUnix = getUnixTimeFromString(exectDate);

    if (getUnixCurrentTime() - DAY_MILISECONDS > exectDateUnix) {
      await sendResponseError(res, Messages.dateInPast);
      throw new ValidationError(ErrorCodes.dateInPast, Messages.dateInPast);
    }

    return {text, exectDate: exectDateUnix};
  }

  const dateFromUnix = getUnixTimeFromString(dateFrom);
  const dateToUnix = getUnixTimeFromString(dateTo);
  console.log(dateToUnix, dateFromUnix, dateTo, dateFrom);
  if (!dateFromUnix || !dateToUnix) {
    await sendResponseError(res, Messages.invalidDates);
    throw new ValidationError(ErrorCodes.invalidDates, Messages.invalidDates);
  }

  return {text, dateFrom: dateFromUnix, dateTo: dateToUnix};
}

async function sendResponseError(res: Response, message: string): Promise<Response> {
  return res.status(400).send({message});
}

export async function createInfoContentHandler(req: Request, res: Response): Promise<Response> {
  const {text} = req.body;

  await dal.upsertInfo(text);
  log.info('Created new casual info entry');

  return res.status(200).send({message: 'ok', text});
}

export async function createLegalInfoContentHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const {text} = req.body;

  await dal.upsertLegalInfo(text);
  log.info('Created new legal info entry');

  return res.status(200).send({message: 'ok', text});
}
