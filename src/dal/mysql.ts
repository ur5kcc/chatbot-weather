import mysql from 'mysql2';
import {MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER} from '../util/secrets';
import log from '../util/logger';

let client;

class MYSQLDB {
  constructor() {
    if (client) {
      return client;
    }

    const connection = mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      database: MYSQL_DATABASE,
      password: MYSQL_PASSWORD
    });
    client = connection.connect(function(err) {
      if (err) {
        return log.error(`Ошибка: ${err.message}`);
      } else {
        log.info('Подключение к серверу MySQL успешно установлено');
      }
    });
  }
}

export async function DBConnection() {
  return new MYSQLDB();
}
