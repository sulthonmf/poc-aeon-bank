export interface Transaction {
  refId: string;
  transferDate: string; // ISO String (e.g., "2024-10-15T12:34:56Z")
  recipientName: string;
  transferName: string;
  amount: number; // Positive for Income, Negative for Expense
}

export type FilterType = 'ALL' | 'INCOME' | 'EXPENSE';

export type Language = 'en' | 'ms';

export type RootStackParamList = {
  Home: undefined;
  TransactionDetail: { transaction: Transaction };
};
