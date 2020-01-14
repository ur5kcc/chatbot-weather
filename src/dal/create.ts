import uuid from 'uuid/v1';
import {ForecastDocument, ForecastMongo} from '../models/Forecast';
import {Forecast as IForecast} from '../types/forecast';

export const CUSTOM_IDS = {
  today: 'today',
  threeDays: 'threedays',
  storm: 'storm',
  legalInfo: 'legalInfo',
  info: 'info'
};
export async function createForecast(forecast: IForecast): Promise<ForecastDocument> {
  const _id = uuid();

  return ForecastMongo.create({...forecast, _id});
}

export async function updateTodayForecast(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: CUSTOM_IDS.today}, {text}, {upsert: true});
}

export async function update3Days(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: CUSTOM_IDS.threeDays}, {text}, {upsert: true});
}

export async function updateStorm(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: CUSTOM_IDS.storm}, {text}, {upsert: true});
}

export async function upsertLegalInfo(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: CUSTOM_IDS.legalInfo}, {text}, {upsert: true});
}

export async function upsertInfo(text: IForecast): Promise<ForecastDocument> {
  return ForecastMongo.updateOne({_id: CUSTOM_IDS.info}, {text}, {upsert: true});
}
