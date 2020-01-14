import {ViberBot} from '../../controllers/viber';

export async function viberHander(req, res) {
  const bot = await new ViberBot();

  return bot.handle(req, res);
}
