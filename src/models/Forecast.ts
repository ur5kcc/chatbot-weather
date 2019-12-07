import mongoose from 'mongoose';
import {Forecast as IForecast} from '../types/forecast';

export type ForecastDocument = mongoose.Document & IForecast;

const forecastSchema = new mongoose.Schema(
  {
    _id: {type: String, unique: true},
    text: String,
    date: Date,
    upvotes: Number,
    downvotes: Number,
    score: Number
  },
  {timestamps: true}
);
export const Forecast = mongoose.model<ForecastDocument>('Forecast', forecastSchema);
