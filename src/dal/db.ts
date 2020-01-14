import mongoose from 'mongoose';
import {MONGODB_URI} from '../util/secrets';
import log from '../util/logger';

let client;

class DB {
  constructor() {
    if (client) {
      return client;
    }
    mongoose
      .connect(MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
      .catch(e => {
        log.info(`MongoDB connection error. Please make sure MongoDB is running. ${e}`);
        throw e;
      });
  }
}

export async function DBConnection() {
  return new DB();
}
