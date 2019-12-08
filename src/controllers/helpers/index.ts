import {Button} from '../../types/viber';

export enum Replies {
  'getTodayWeather' = 'sgdksjglsjnoiir1orh128414'
}

export const defaultKeyboard: {
  keyboard: {Type: string; DefaultHeight: boolean; BgColor: string; Buttons: Button[]};
} = {
  keyboard: {
    Type: 'keyboard',
    DefaultHeight: true,
    BgColor: '#FFFFFF',
    Buttons: [
      {
        Columns: 6,
        Rows: 1,
        BgColor: '#2db9b9',
        BgLoop: true,
        ActionType: 'reply',
        ActionBody: Replies.getTodayWeather,
        Text: 'Погода за сьогодні',
        TextSize: 'regular',
        TextVAlign: 'middle',
        TextHAlign: 'center',
        TextOpacity: 60
      }
    ]
  }
};
