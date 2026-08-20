import { fetchTransactionsFromApi } from '../api';

describe('services/api tests', () => {
  it('should fetch mock transactions successfully from backend endpoint', async () => {
    const data = await fetchTransactionsFromApi();
    
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    const firstItem = data[0];
    expect(firstItem).toHaveProperty('refId');
    expect(firstItem).toHaveProperty('recipientName');
    expect(firstItem).toHaveProperty('transferName');
    expect(firstItem).toHaveProperty('amount');
    expect(firstItem).toHaveProperty('transferDate');
  });
});
