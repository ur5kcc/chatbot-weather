import {ViberClient} from 'messaging-api-viber';
import {get, toLower} from 'lodash';
import {BASE_URL, VIBER_TOKEN} from '../util/secrets';
import {ROUTES_URLS} from '../routes';
import {
  PAYLOAD_NOW_SPLITTER,
  REPLIES_PAYLOAD,
  defaultKeyboard,
  getWeatherNowKeyboard
} from './helpers';
import {dal} from '../dal';
import log from '../util/logger';
import LOCALIZATION, {excuseMapping} from '../localization';
import {CUSTOM_IDS} from '../dal/create';

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

  public async sendIntroGetNowWeatherMessage(id: string, text: string): Promise<void> {
    return this.client.sendText(id, text, getWeatherNowKeyboard);
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

  private getCorrectId(referer) {
    const idsMapping = {
      [REPLIES_PAYLOAD.getTodayWeather]: {
        id: CUSTOM_IDS.today,
        excuse: excuseMapping.exectForecastNotFound
      },
      [REPLIES_PAYLOAD.getWeather3Days]: {
        id: CUSTOM_IDS.threeDays,
        excuse: excuseMapping.rangeForecastNotFound
      },
      [REPLIES_PAYLOAD.storm]: {id: CUSTOM_IDS.storm, excuse: excuseMapping.stormForecastNotFound},
      [REPLIES_PAYLOAD.getInfo]: {id: CUSTOM_IDS.info, excuse: excuseMapping.infoNotFound},
      [REPLIES_PAYLOAD.getLegalInfo]: {id: CUSTOM_IDS.legalInfo, excuse: excuseMapping.infoNotFound}
    };
    const correctMapping = idsMapping[referer];

    if (!correctMapping) {
      const hash = `${new Buffer(new Date().toISOString()).toString('base64')}`;

      return {id: hash, excuse: excuseMapping.illegalPayload};
    }

    return correctMapping;
  }
  public async handle(req, res) {
    let forecast;
    res.status(200).send();
    const event = get(req, 'body.event', null);
    const payload = get(req, 'body.message.text');
    const userId = get(req, 'body.sender.id', null) || get(req, 'body.user.id', null);

    if (!userId) {
      return res.status(200).send();
    }

    if (event === 'conversation_started') {
      log.debug('Found new user, sending hello message');

      return this.sendMessage(userId, LOCALIZATION.helloMessage);
    }

    if (payload === REPLIES_PAYLOAD.getNowWeather) {
      log.debug('Sending getWeatherNow keyboard set');

      return this.sendIntroGetNowWeatherMessage(userId, LOCALIZATION.introGetWeatherNow);
    }

    if (
      [
        REPLIES_PAYLOAD.getNowWeatherDubno,
        REPLIES_PAYLOAD.getNowWeatherRivne,
        REPLIES_PAYLOAD.getNowWeatherSarni
      ].includes(payload)
    ) {
      const city = toLower(payload.split(PAYLOAD_NOW_SPLITTER)[1]);
      log.debug('Got mysql request to get current weather, exceptional case, parsed payload is ');
      forecast = await dal.getNowWeatherByCity(city);

      return this.sendMessage(userId, forecast || LOCALIZATION.empty);
    }

    if (payload === REPLIES_PAYLOAD.extremeTemperatures) {
      log.debug('Extreme weather exception');
      forecast = await dal.getExtrimeWeatherForToday();

      return this.sendMessage(userId, forecast || LOCALIZATION.empty);
    }

    const {id: legalId, excuse} = this.getCorrectId(payload);

    forecast = await dal.getForecastById(legalId);
    if (!forecast) {
      return this.sendMessage(userId, excuse);
    }

    return this.sendMessage(userId, forecast.text);
  }

  public async newUserEnrollment({id, name, language, country, api_version: apiVersion}) {
    return 'not implemented';
  }
}

export function getClient() {
  return client || new ViberBot();
}
