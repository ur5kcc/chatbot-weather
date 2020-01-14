/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({path: '.env'});
} else {
  logger.debug('Using .env.example file to supply config environment variables');
  dotenv.config({path: '.env.example'});
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';

export const MONGODB_URI = prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];

export const BASE_URL = process.env['BASE_URL'];
export const MYSQL_HOST = process.env['MYSQL_HOST'];
export const MYSQL_USER = process.env['MYSQL_USER'];

export const MYSQL_DATABASE = process.env['MYSQL_DATABASE'];
export const MYSQL_PASSWORD = process.env['MYSQL_PASSWORD'];
export const VIBER_TOKEN = process.env['VIBER_TOKEN'];

if (
  !MONGODB_URI ||
  !VIBER_TOKEN ||
  !BASE_URL ||
  !MYSQL_PASSWORD ||
  !MYSQL_DATABASE ||
  !MYSQL_USER ||
  !MYSQL_HOST
) {
  if (prod) {
    logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
  } else {
    logger.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
  }
  process.exit(1);
}
