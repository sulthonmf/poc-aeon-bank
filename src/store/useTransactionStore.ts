import { create } from 'zustand';
import { Transaction, FilterType, Language } from '../types/transaction';
import { fetchTransactionsFromApi } from '../services/api';
import { formatMonthHeader } from '../utils/formatters';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filterType: FilterType;
  language: Language;

  // Actions
  fetchTransactions: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilterType: (filter: FilterType) => void;
  toggleLanguage: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  filterType: 'ALL',
  language: 'en',

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchTransactionsFromApi();
      set({ transactions: data, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to load transactions', isLoading: false });
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  
  setFilterType: (filter: FilterType) => set({ filterType: filter }),
  
  toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'ms' : 'en' })),
}));

export interface TransactionGroup {
  title: string;
  dateKey: string;
  data: Transaction[];
}

/**
 * Pure function to filter transactions based on search query and filter type.
 */
export const getFilteredTransactions = (
  transactions: Transaction[],
  searchQuery: string,
  filterType: FilterType
): Transaction[] => {
  const query = searchQuery.toLowerCase().trim();

  return transactions.filter((item) => {
    if (filterType === 'INCOME' && item.amount <= 0) return false;
    if (filterType === 'EXPENSE' && item.amount >= 0) return false;

    if (query) {
      const matchRef = item.refId.toLowerCase().includes(query);
      const matchRecipient = item.recipientName.toLowerCase().includes(query);
      const matchTransfer = item.transferName.toLowerCase().includes(query);
      return matchRef || matchRecipient || matchTransfer;
    }

    return true;
  });
};

/**
 * Pure function to group filtered transactions by month descending (e.g. October 2024).
 */
export const getGroupedTransactions = (
  transactions: Transaction[],
  searchQuery: string,
  filterType: FilterType
): TransactionGroup[] => {
  const filtered = getFilteredTransactions(transactions, searchQuery, filterType);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.transferDate).getTime() - new Date(a.transferDate).getTime()
  );

  const groupsMap = new Map<string, Transaction[]>();

  sorted.forEach((tx) => {
    const monthKey = tx.transferDate.substring(0, 7); // e.g. "2024-10"
    if (!groupsMap.has(monthKey)) {
      groupsMap.set(monthKey, []);
    }
    groupsMap.get(monthKey)!.push(tx);
  });

  const groups: TransactionGroup[] = [];
  groupsMap.forEach((txList, monthKey) => {
    groups.push({
      title: formatMonthHeader(txList[0].transferDate),
      dateKey: monthKey,
      data: txList,
    });
  });

  return groups;
};

/**
 * React hook to retrieve filtered transactions.
 */
export const useFilteredTransactions = (): Transaction[] => {
  const transactions = useTransactionStore((state) => state.transactions);
  const searchQuery = useTransactionStore((state) => state.searchQuery);
  const filterType = useTransactionStore((state) => state.filterType);

  return getFilteredTransactions(transactions, searchQuery, filterType);
};

/**
 * React hook to retrieve grouped transactions by month.
 */
export const useGroupedTransactions = (): TransactionGroup[] => {
  const transactions = useTransactionStore((state) => state.transactions);
  const searchQuery = useTransactionStore((state) => state.searchQuery);
  const filterType = useTransactionStore((state) => state.filterType);

  return getGroupedTransactions(transactions, searchQuery, filterType);
};
