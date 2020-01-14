export type Forecast = {
    _id?: string;
    text: string;
    upvotes?: number;
    downvotes?: number;
    score?: number;
    deletedAt?: Date;
  } & (
    {exectDate: number} | {
      dateFrom: number;
      dateTo: number;
    }
   );

