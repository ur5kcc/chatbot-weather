export interface Button {
        Columns: number;
        Rows: number;
        ActionType: string;
        ActionBody: string;
        Image?: string;
        Text: string;
        TextSize?: string;
        TextVAlign?: string;
        TextHAlign?: string;
        BgColor?: string;
        BgMediaType?: string;
        BgLoop?: boolean;
        TextOpacity?: number;
}