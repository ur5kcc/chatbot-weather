import uuid from 'uuid/v1';
import {ForecastDocument, ForecastMongo} from '../models/Forecast';
import {Forecast as IForecast} from '../types/forecast';

export async function getForecastByDate(date: string): Promise<ForecastDocument> {
  return ForecastMongo.findOne({date});
}

export async function getForecastById(id: string): Promise<ForecastDocument> {
  return ForecastMongo.findOne({_id: id});
}

export async function createForecast(forecast: IForecast): Promise<ForecastDocument> {
  const _id = uuid();

  return ForecastMongo.create({...forecast, _id});
}

export async function updateForecast(_id: string, forecast: Partial<IForecast>): Promise<void> {
  return ForecastMongo.updateOne({_id}, {$set: forecast}, {new: false});
}
