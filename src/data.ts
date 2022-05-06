export enum ReportType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

export const data: Data = {
  report: [
    {
      id: 'UUID1',
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'UUID2',
      source: 'Code Coast',
      amount: 9500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'UUID3',
      source: 'Food',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};
