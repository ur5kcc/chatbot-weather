const common = {
  empty: 'Відсутні'
};

export default {
  tommorow: 'Прогноз погоди на завтра',
  threeDays: 'Прогноз погоди по м. Рівне та області',
  storms: 'Штормові попередження',
  empty: common.empty,
  getNowWeather: 'Фактична погода',
  helloMessage:
    'Привіт ;) Погода Бот вітає вас!\nТільки тут справжні прогнози від синоптиків по Рівненщині ;)',
  legalInfo: 'Інформація для юридичних осіб',
  info: 'Корисна інформація'
};

export const excuseMapping = {
  exectForecastNotFound: 'Прогноз погоди на вказану дату не знайдено',
  rangeForecastNotFound: 'Прогноз погоди на вказані дати не знайдено',
  stormForecastNotFound: common.empty,
  illegalPayload: 'Скористайтесь меню для того, щоб дізнатися погоду)',
  infoNotFound: 'Наразі у нас немає для вас корисної інформації, загляньте пізніше ^_^'
};
