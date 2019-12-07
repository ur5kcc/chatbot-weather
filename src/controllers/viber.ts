import ViberClient from 'messaging-api-viber';

let client = null;
export class ViberBot {
  constructor(token: string, url: string) {
    if (client) {
      return client;
    }
    client = ViberClient.connect(token);
    client.setWebhook(url).catch(e => {
      console.log(e);
      throw e;
    });
  }
  public async sendMessage(id: string, text: string): Promise<void> {
    return client.sendMessage(id, {
      type: 'text',
      text
    });
  }

  public async sendCarousel(id: string, buttons: any[]): Promise<void> {
    return client.sendCarouselContent(id, {
      Type: 'rich_media',
      ButtonsGroupColumns: 6,
      ButtonsGroupRows: 7,
      BgColor: '#FFFFFF',
      Buttons: buttons
    });
  }

  public async sendBroadcustMessage(ids: string[], text: string): Promise<void> {
    return client.broadcastText(ids, text);
  }
}
