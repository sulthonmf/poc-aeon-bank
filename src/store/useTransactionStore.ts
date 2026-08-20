import { create } from 'zustand';
import { Transaction, FilterType, Language } from '../types/transaction';
import { fetchTransactionsFromApi } from '../services/api';

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

export const useTransactionStore = create<TransactionState>((set, get) => ({
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

/**
 * Custom hook to retrieve filtered transactions based on searchQuery and filterType.
 */
export const useFilteredTransactions = (): Transaction[] => {
  const transactions = useTransactionStore((state) => state.transactions);
  const searchQuery = useTransactionStore((state) => state.searchQuery).toLowerCase().trim();
  const filterType = useTransactionStore((state) => state.filterType);

  return transactions.filter((item) => {
    // Filter by type: Income (> 0) vs Expense (< 0)
    if (filterType === 'INCOME' && item.amount <= 0) return false;
    if (filterType === 'EXPENSE' && item.amount >= 0) return false;

    // Filter by Search Query (refId, recipientName, transferName)
    if (searchQuery) {
      const matchRef = item.refId.toLowerCase().includes(searchQuery);
      const matchRecipient = item.recipientName.toLowerCase().includes(searchQuery);
      const matchTransfer = item.transferName.toLowerCase().includes(searchQuery);
      return matchRef || matchRecipient || matchTransfer;
    }

    return true;
  });
};
