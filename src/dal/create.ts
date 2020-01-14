import uuid from 'uuid/v1';
import {ForecastDocument, ForecastMongo} from '../models/Forecast';
import {Forecast as IForecast} from '../types/forecast';

export async function createForecast(forecast: IForecast): Promise<ForecastDocument> {
  const _id = uuid();

  return ForecastMongo.create({...forecast, _id});
}

export async function updateTodayForecast(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: 'today'}, {text}, {upsert: true});
}

export async function update3Days(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: 'threedays'}, {text}, {upsert: true});
}

export async function updateStorm(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: 'storm'}, {text}, {upsert: true});
}

export async function upsertLegalInfo(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: 'legalInfo'}, {text}, {upsert: true});
}

export async function upsertInfo(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: 'info'}, {text}, {upsert: true});
}
