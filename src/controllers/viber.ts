import {ViberClient} from 'messaging-api-viber';
import {get} from 'lodash';
import {BASE_URL, VIBER_TOKEN} from '../util/secrets';
import {ROUTES_URLS} from '../routes';
import {Replies, defaultKeyboard} from './helpers';
import {dal} from '../dal';
import log from '../util/logger';
import LOCALIZATION from '../localization';

let client;
export class ViberBot {
  client: any;
  constructor() {
    this.client = client;
    if (!this.client) {
      this.client = ViberClient.connect(VIBER_TOKEN);
      this.client
        .setWebhook(`${BASE_URL}${ROUTES_URLS.viber}`, ['subscribed', 'conversation_started'])
        .catch(e => console.log(e));
      // eslint-disable-next-line prefer-destructuring
      client = this.client;
    }
  }

  public async sendCustomMessage(id: string, message: {[key: string]: any}): Promise<void> {
    return this.client.sendMessage(id, message, defaultKeyboard);
  }
  public async sendMessage(id: string, text: string): Promise<void> {
    return this.client.sendText(id, text, defaultKeyboard);
  }
  public async sendCarousel(id: string, buttons: any[]): Promise<void> {
    return this.client.sendCarouselContent(id, {
      Type: 'rich_media',
      ButtonsGroupColumns: 6,
      ButtonsGroupRows: 7,
      BgColor: '#FFFFFF',
      Buttons: buttons
    });
  }

  public async sendBroadcustMessage(ids: string[], text: string): Promise<void> {
    return this.client.broadcastText(ids, text);
  }

  public async handle(req, res) {
    res.status(200).send();
    const event = get(req, 'body', null);
    log.debug(event);
    const id = get(req, 'body.sender.id', null);

    if (!id) {
      return res.status(200).send();
    }

    if (get(req, 'body.message.text', '') == Replies.getTodayWeather) {
      const forecast = await dal.getForecastById('today');
      log.info('Fetched forecast');
      if (!forecast) {
        return this.sendMessage(id, 'Прогноз погоди на вказану дату не знайдено');
      }

      return this.sendMessage(id, forecast.text);
    }

    if (get(req, 'body.message.text', '') == Replies.getWeather3Days) {
      const forecast = await dal.getForecastById('threedays');
      log.info('Fetched forecast');
      if (!forecast) {
        return this.sendMessage(id, 'Прогноз погоди на вказані дати не знайдено');
      }

      return this.sendMessage(id, forecast.text);
    }

    if (get(req, 'body.message.text', '') == Replies.storm) {
      const forecast = await dal.getForecastById('storm');
      log.info('Fetched forecast');
      if (!forecast) {
        return this.sendMessage(id, 'Прогноз погоди на вказану дату не знайдено');
      }

      return this.sendMessage(id, forecast.text.trim() || LOCALIZATION.empty);
    }

    if (get(req, 'body.message.text', '') == Replies.getNowWeather) {
      const forecast = await dal.getNowWeather();
      log.info('Fetched now weather', forecast);
      if (!forecast) {
        return this.sendMessage(id, 'Прогноз погоди на вказану дату не знайдено');
      }

      return this.sendMessage(id, forecast.text.trim() || LOCALIZATION.empty);
    }

    return this.sendMessage(id, 'Скористайтесь меню для того що б дізнатися погоду)');
  }

  public async newUserEnrollment({id, name, language, country, api_version: apiVersion}) {
    return 'not implemented';
  }
}

export function getClient() {
  return client || new ViberBot();
}
