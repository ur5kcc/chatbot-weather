export type Forecast = {
    _id?: string;
    text: string;
    exectDate?: Date;
    upvotes?: number;
    downvotes?: number;
    score?: number;
    deletedAt?: Date;
  } & (
    {exectDate: Date} | {
      dateFrom: Date;
      dateTo: Date;
    }
   );

