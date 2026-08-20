import { useTransactionStore, getGroupedTransactions } from '../useTransactionStore';

describe('Zustand useTransactionStore tests', () => {
  beforeEach(() => {
    // Reset state before each test
    useTransactionStore.setState({
      transactions: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      filterType: 'ALL',
      language: 'en',
    });
  });

  it('should initialize with default values', () => {
    const state = useTransactionStore.getState();
    expect(state.transactions).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.searchQuery).toBe('');
    expect(state.filterType).toBe('ALL');
    expect(state.language).toBe('en');
  });

  it('should fetch transactions and populate state', async () => {
    const { fetchTransactions } = useTransactionStore.getState();
    await fetchTransactions();

    const state = useTransactionStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.transactions.length).toBeGreaterThan(0);
    expect(state.error).toBeNull();
  });

  it('should update search query state', () => {
    const { setSearchQuery } = useTransactionStore.getState();
    setSearchQuery('Salary');
    expect(useTransactionStore.getState().searchQuery).toBe('Salary');
  });

  it('should update filter type state', () => {
    const { setFilterType } = useTransactionStore.getState();
    setFilterType('INCOME');
    expect(useTransactionStore.getState().filterType).toBe('INCOME');
  });

  it('should toggle language between English and Bahasa Melayu', () => {
    const { toggleLanguage } = useTransactionStore.getState();
    
    expect(useTransactionStore.getState().language).toBe('en');
    toggleLanguage();
    expect(useTransactionStore.getState().language).toBe('ms');
    toggleLanguage();
    expect(useTransactionStore.getState().language).toBe('en');
  });

  it('should group transactions by month correctly', async () => {
    const { fetchTransactions } = useTransactionStore.getState();
    await fetchTransactions();

    const state = useTransactionStore.getState();
    const groups = getGroupedTransactions(state.transactions, state.searchQuery, state.filterType);
    
    expect(groups.length).toBeGreaterThan(0);
    expect(groups[0]).toHaveProperty('title'); // e.g. "October 2024"
    expect(groups[0]).toHaveProperty('dateKey'); // e.g. "2024-10"
    expect(Array.isArray(groups[0].data)).toBe(true);
    expect(groups[0].title).toContain('2024');
  });
});
