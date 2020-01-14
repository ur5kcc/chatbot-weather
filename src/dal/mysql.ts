import mysql from 'mysql2';
import {MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER} from '../util/secrets';

let pool;
export const getMysqlConnection = function() {
  if (pool) return pool;
  pool = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
  });

  return pool;
};
