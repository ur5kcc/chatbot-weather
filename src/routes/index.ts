import express from 'express';
import {authorizeRequest} from './middlewares';
import {createForecastHandler} from './post';
import {
  getForecastForDateHandler,
  getForecastForTodayHandler,
  getForecastInRangeHandler
} from './get';
import {updateExectForecastHandler, updateRangeForecastHandler} from './put';
import {viberHander} from './webhooks';

export const ROUTES_URLS = {
  viber: '/viber/webhook',
  facebook: '/facebook/webhook',
  importForecasts: '/forecasts',
  getForecast: '/forecasts/:id',
  getForecastNow: '/forecasts/today',
  forecastByDate: '/forecasts/exect',
  forecastByRange: '/forecasts/range'
};

export const router = express.Router();

router.post(ROUTES_URLS.importForecasts, authorizeRequest, createForecastHandler);

router.get(ROUTES_URLS.getForecastNow, authorizeRequest, getForecastForTodayHandler);

router.get(ROUTES_URLS.forecastByDate, authorizeRequest, getForecastForDateHandler);
router.put(ROUTES_URLS.forecastByDate, authorizeRequest, updateExectForecastHandler);

router.get(ROUTES_URLS.forecastByRange, authorizeRequest, getForecastInRangeHandler);
router.put(ROUTES_URLS.forecastByRange, authorizeRequest, updateRangeForecastHandler);

router.post(ROUTES_URLS.viber, viberHander);
