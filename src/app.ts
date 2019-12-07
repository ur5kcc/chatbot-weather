import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import flash from 'express-flash';

const ROUTES_URLS = {
  viber: '/viber/webhook',
  facebook: '/facebook/webhook',
  importForecasts: '/forecasts',
  getForecast: '/forecasts/:id'
};
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(flash());

export default app;
