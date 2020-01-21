import {Button} from '../../types/viber';
import LOCALIZATION from '../../localization';

export enum REPLIES_PAYLOAD {
  'getTodayWeather' = 'getTodayWeather',
  'getWeather3Days' = 'getWeather3Days',
  'storm' = 'shtormWeatherIncoming',
  'getNowWeather' = 'getNowWeather',
  'getInfo' = 'getInfo',
  'getLegalInfo' = 'getLegalInfo',
  'extremeTemperatures' = 'extremeTemperatures'
}

export const defaultKeyboard: {
  keyboard: {Type: string; DefaultHeight?: boolean; BgColor: string; Buttons: Button[]};
} = {
  keyboard: {
    Type: 'keyboard',
    BgColor: '#FFFFFF',
    Buttons: [
      {
        Columns: 3,
        Rows: 1,
        BgColor: '#33ccff',
        BgLoop: true,
        ActionType: 'reply',
        ActionBody: REPLIES_PAYLOAD.getNowWeather,
        Text: LOCALIZATION.getNowWeather,
        TextSize: 'regular',
        TextVAlign: 'middle',
        TextHAlign: 'center',
        TextOpacity: 60
      },
      {
        Columns: 3,
        Rows: 1,
        BgColor: '#33ccff',
        BgLoop: true,
        ActionType: 'reply',
        ActionBody: REPLIES_PAYLOAD.extremeTemperatures,
        Text: LOCALIZATION.extremeTemperatures,
        TextSize: 'regular',
        TextVAlign: 'middle',
        TextHAlign: 'center',
        TextOpacity: 60
      },
      {
        Columns: 3,
        Rows: 1,
        BgColor: '#33ccff',
        BgLoop: true,
        ActionType: 'reply',
        ActionBody: REPLIES_PAYLOAD.getWeather3Days,
        Text: LOCALIZATION.threeDays,
        TextSize: 'regular',
        TextVAlign: 'middle',
        TextHAlign: 'center',
        TextOpacity: 60
      },
      {
        Columns: 3,
        Rows: 1,
        BgColor: '#33ccff',
        BgLoop: true,
        ActionType: 'reply',
        ActionBody: REPLIES_PAYLOAD.storm,
        Text: LOCALIZATION.storms,
        TextSize: 'regular',
        TextVAlign: 'middle',
        TextHAlign: 'center',
        TextOpacity: 60
      },
      {
        Columns: 3,
        Rows: 1,
        BgColor: '#33ccff',
        BgLoop: true,
        ActionType: 'reply',
        ActionBody: REPLIES_PAYLOAD.getInfo,
        Text: LOCALIZATION.info,
        TextSize: 'regular',
        TextVAlign: 'middle',
        TextHAlign: 'center',
        TextOpacity: 60
      },
      {
        Columns: 3,
        Rows: 1,
        BgColor: '#33ccff',
        BgLoop: true,
        ActionType: 'reply',
        ActionBody: REPLIES_PAYLOAD.getLegalInfo,
        Text: LOCALIZATION.legalInfo,
        TextSize: 'regular',
        TextVAlign: 'middle',
        TextHAlign: 'center',
        TextOpacity: 60
      }
    ]
  }
};
