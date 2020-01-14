import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import {router} from './routes';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use;
app.use(flash());
app.use('/', router);

export default app;
