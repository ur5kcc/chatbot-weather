import uuid from 'uuid/v1';
import moment from 'moment-timezone';
import {ForecastDocument, ForecastMongo} from '../models/Forecast';
import {Forecast as IForecast} from '../types/forecast';
import {DAY_MILISECONDS, convertToUkraineTime} from '../util/time';
import {getMysqlConnection} from './mysql';
import log from '../util/logger';

export async function getNowWeather(): Promise<string> {
  let message = null;
  const connection = await getMysqlConnection();
  const pCon = connection.promise();
  const weatherNow = await pCon.query(
    'SELECT * FROM meteo WHERE `station_code`= 33301 ORDER BY id DESC LIMIT 1'
  );
  const [
    {year, mouns: month, day, time, temperature, wind, wind_direction, pressure, humidity}
  ] = weatherNow[0];

  const hour = convertToUkraineTime(day, time);

  message = `${day}.${month}.${year} року\n${hour}.\nТемпература ${temperature}°.\nВітер ${wind} м/c.\nНапрямок ${wind_direction} градусів.\nТиск ${pressure} мм.рт.ст.\nВологість ${humidity}%\n\nБільше 
інформації та щоденник погоди школяра:\nhttps://pogoda.rovno.ua`;

  return message;
}

export async function getForecastByTimestampExect(timestamp: number): Promise<ForecastDocument> {
  return ForecastMongo.findOne({
    $and: [{exectDate: {$gte: timestamp}}, {exectDate: {$lte: timestamp + DAY_MILISECONDS - 1}}]
  });
}

export async function getForecastInRange(
  timestampFrom: number,
  timestampTo: number
): Promise<ForecastDocument | void> {
  const forecasts = await ForecastMongo.find({
    $or: [
      {
        $and: [
          {exectDate: {$gte: timestampFrom}},
          {exectDate: {$lte: timestampTo + DAY_MILISECONDS - 1}}
        ]
      },
      {dateFrom: {$gte: timestampFrom}}
    ]
  }).exec();
  log.info(`Fetched ${forecasts.length} forecasts from mongo`);

  return getCorrectForecast({forecasts, timestampFrom, timestampTo});
}

export async function getForecastById(id: string): Promise<ForecastDocument> {
  return ForecastMongo.findOne({_id: id});
}

export async function createForecast(forecast: IForecast): Promise<ForecastDocument> {
  const _id = uuid();

  return ForecastMongo.create({...forecast, _id});
}

function getCorrectForecast({forecasts, timestampFrom, timestampTo}): ForecastDocument | void {
  const correctForecasts = forecasts.filter(({dateFrom, dateTo, exectDate}) => {
    if (exectDate) {
      return exectDate >= timestampFrom && exectDate <= timestampTo;
    }

    if (dateFrom && dateTo) {
      return dateFrom - timestampFrom > 0 && dateTo - timestampTo > 0;
    }
  });

  if (!correctForecasts.length) {
    return;
  }

  return correctForecasts.sort(function(a, b) {
    return b.dateFrom - a.dateFrom;
  })[0];
}

export async function getExtrimeWeatherForToday(): Promise<string> {
  let message = null;
  const monthes = [
    'Січня',
    'Лютого',
    'Березня',
    'Квітня',
    'Травня',
    'Червня',
    'Липня',
    'Серпня',
    'Вересня',
    'Жовтня',
    'Листопада',
    'Грудня'
  ];
  const d = new Date();
  const connection = await getMysqlConnection();
  const pCon = connection.promise();
  const extremeWeatherNow = await pCon
    .query(
      `SELECT * FROM  temperaturs WHERE \`day\` = ${d.getDate()} AND \`month\`= ${new Date().getMonth() +
        1}`
    )
    .catch(e => log.error(e));
  log.info('Fetched records for today');
  const [{Tmin, yearTmin, Tmax, yearTmax}] = extremeWeatherNow[0];

  message = `За багаторічними даними спостережень (починаючи з 1944 року) по місту Рівне ${d.getDate()} ${
    monthes[new Date().getMonth()]
  }:\n\nНайнижча температура ${Tmin} °С була зафіксована у ${yearTmin} році.\n\nНайвища температура ${Tmax} °С була зафіксована у ${yearTmax} році.\n\nБільше інформації тут:\nhttps://pogoda.rovno.ua`;

  return message;
}
