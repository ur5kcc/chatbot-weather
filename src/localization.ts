const common = {
  empty: 'Відсутні'
};

export default {
  introGetWeatherNow: 'Оберіть місто',
  tommorow: 'Прогноз погоди на завтра',
  threeDays: 'Прогноз погоди по м. Рівне та області',
  storms: 'Штормові попередження',
  empty: common.empty,
  getNowWeather: 'Фактична погода',
  helloMessage:
    'Привіт ;) Погода Бот вітає вас!\nТільки тут справжні прогнози від синоптиків по Рівненщині ;)',
  legalInfo: 'Важлива інформація !',
  info: 'Корисна інформація',
  extremeTemperatures: 'Температурні рекорди',
  rivne: 'Рівне',
  sarni: 'Сарни',
  dubno: 'Дубно',
  lutsk: 'Луцьк'
};

export const excuseMapping = {
  exectForecastNotFound: 'Прогноз погоди на вказану дату не знайдено',
  rangeForecastNotFound: 'Прогноз погоди на вказані дати не знайдено',
  stormForecastNotFound: common.empty,
  illegalPayload: 'Скористайтесь меню для того, щоб дізнатися погоду)',
  infoNotFound: 'Наразі у нас немає для вас корисної інформації, загляньте пізніше ^_^'
};
