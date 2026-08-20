import { formatCurrencyMYR, formatDate } from '../formatters';

describe('formatters utility tests', () => {
  describe('formatCurrencyMYR', () => {
    it('should format positive income amount correctly with green indicator flag', () => {
      const result = formatCurrencyMYR(1500.00);
      expect(result.isIncome).toBe(true);
      expect(result.formattedText).toBe('+ RM 1,500.00');
    });

    it('should format negative expense amount correctly with red indicator flag', () => {
      const result = formatCurrencyMYR(-500.00);
      expect(result.isIncome).toBe(false);
      expect(result.formattedText).toBe('- RM 500.00');
    });

    it('should format zero amount as income', () => {
      const result = formatCurrencyMYR(0);
      expect(result.isIncome).toBe(true);
      expect(result.formattedText).toBe('+ RM 0.00');
    });
  });

  describe('formatDate', () => {
    it('should format valid ISO UTC date string into clean date format', () => {
      const isoDate = '2024-10-15T12:34:56Z';
      const formatted = formatDate(isoDate);
      expect(formatted).toContain('2024');
      expect(formatted).toContain('Oct');
    });

    it('should return original string if input is invalid date', () => {
      const invalidDate = 'not-a-date';
      expect(formatDate(invalidDate)).toBe('not-a-date');
    });
  });
});
