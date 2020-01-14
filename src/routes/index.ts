import express from 'express';
import {authorizeRequest} from './middlewares';
import {
  createForecastHandler,
  createForecastStormHandler,
  createForecastThreeDaysHandler,
  createForecastTodayHandler
} from './post';
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
  importForecastsNow: '/forecasts/now',
  importForecasts3Days: '/forecasts/three-days',
  importForecastsStorm: '/forecasts/storms',
  getForecast: '/forecasts/:id',
  getForecastNow: '/forecasts/today',
  forecastByDate: '/forecasts/exect',
  forecastByRange: '/forecasts/range'
};

export const router = express.Router();

router.post(ROUTES_URLS.importForecasts, authorizeRequest, createForecastHandler);
router.post(ROUTES_URLS.importForecastsNow, authorizeRequest, createForecastTodayHandler);
router.post(ROUTES_URLS.importForecasts3Days, authorizeRequest, createForecastThreeDaysHandler);
router.post(ROUTES_URLS.importForecastsStorm, authorizeRequest, createForecastStormHandler);

router.get(ROUTES_URLS.getForecastNow, authorizeRequest, getForecastForTodayHandler);

router.get(ROUTES_URLS.forecastByDate, authorizeRequest, getForecastForDateHandler);
router.put(ROUTES_URLS.forecastByDate, authorizeRequest, updateExectForecastHandler);

router.get(ROUTES_URLS.forecastByRange, authorizeRequest, getForecastInRangeHandler);
router.put(ROUTES_URLS.forecastByRange, authorizeRequest, updateRangeForecastHandler);

router.post(ROUTES_URLS.viber, viberHander);
