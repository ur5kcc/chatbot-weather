import {ViberClient} from 'messaging-api-viber';
import {get} from 'lodash';
import {BASE_URL, VIBER_TOKEN} from '../util/secrets';
import {ROUTES_URLS} from '../routes';
import {defaultKeyboard} from './helpers';

let client;
export class ViberBot {
  client: any;
  constructor() {
    this.client = client;
    if (!this.client) {
      this.client = ViberClient.connect(VIBER_TOKEN);
      this.client
        .setWebhook(`${BASE_URL}${ROUTES_URLS.viber}`, ['message_recieved'])
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
    const event = get(req, 'body', null);
    console.log(event);
    const id = get(req, 'body.sender.id', null);

    if (!id) {
      return res.status(200).send();
    }

    return this.sendMessage(
      id,
      'hello, just wait a bit more and we will implement all weather forecast functionality ;)'
    );
  }

  public async newUserEnrollment({id, name, language, country, api_version: apiVersion}) {
    return 'not implemented';
  }
}

export function getClient() {
  return client || new ViberBot();
}
