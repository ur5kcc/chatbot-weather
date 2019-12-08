import {ForecastMongo} from '../models/Forecast';
import {Forecast as IForecast} from '../types/forecast';

export async function updateForecastById(_id: string, forecast: Partial<IForecast>): Promise<void> {
  return ForecastMongo.updateOne({_id}, {$set: forecast}, {new: false});
}

export async function updateForecastByExectDate(
  exectDate: number,
  forecast: Partial<IForecast>
): Promise<void> {
  return ForecastMongo.updateOne({exectDate}, {$set: forecast}, {new: false});
}

export async function updateForecastByDateRange(
  dateFrom: number,
  dateTo: number,
  forecast: Partial<IForecast>
): Promise<void> {
  return ForecastMongo.updateOne({dateFrom, dateTo}, {$set: forecast}, {new: false});
}
