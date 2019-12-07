import {Response} from 'express';
import {Forecast as IForecast} from '../../types/forecast';
import {ValidationError} from '../../util/errors';
import {ErrorCodes} from '../../types/error';
import {createForecast} from '../../controllers/forecast';

const DAY_MILISECONDS = 86400000;

const Messages = {
  combinedDates: 'Date range and exect date used together',
  dateInPast: 'Date is in the past, forecast not valid',
  emptyText: 'No forecast to store in database'
};

export async function createForecastHandler(req, res) {
  const {text, exectDate, dateFrom, dateTo} = req.body;
  await validateCreation({text, exectDate, dateFrom, dateTo, res});
  await createForecast({text, exectDate, dateFrom, dateTo});
}

async function validateCreation({
  text,
  exectDate,
  dateFrom,
  dateTo,
  res
}: {
  text: string;
  exectDate: string;
  dateFrom: string;
  dateTo: string;
  res: Response;
}): Promise<void> {
  if (!text || !text.length) {
    await sendMessage(res, Messages.emptyText);
    throw new ValidationError(ErrorCodes.emptyText, Messages.emptyText);
  }

  if (exectDate && (dateFrom || dateTo)) {
    await sendMessage(res, Messages.combinedDates);
    throw new ValidationError(ErrorCodes.combinedDates, Messages.combinedDates);
  }

  if (exectDate) {
    if (new Date().getTime() - DAY_MILISECONDS > new Date(exectDate).getTime()) {
      await sendMessage(res, Messages.dateInPast);
      throw new ValidationError(ErrorCodes.dateInPast, Messages.dateInPast);
    }
  }
}

async function sendMessage(res: Response, message: string): Promise<Response> {
  return res.status(400).send({message});
}
