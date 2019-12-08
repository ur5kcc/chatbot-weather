import {ViberBot, getClient} from '../../controllers/viber';
import {BASE_URL, VIBER_TOKEN} from '../../util/secrets';
import {ROUTES_URLS} from '..';

export async function viberHander(req, res) {
  const bot = await new ViberBot();

  return bot.handle(req, res);
}
