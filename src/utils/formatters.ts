/**
 * Formats monetary value to Malaysian Ringgit (MYR / RM).
 * Example:
 *  1500 -> "+ RM 1,500.00"
 * -500  -> "- RM 500.00"
 */
export const formatCurrencyMYR = (amount: number): { formattedText: string; isIncome: boolean } => {
  const isIncome = amount >= 0;
  const absAmount = Math.abs(amount);
  
  const formattedNumber = absAmount.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const sign = isIncome ? '+' : '-';
  return {
    formattedText: `${sign} RM ${formattedNumber}`,
    isIncome,
  };
};

/**
 * Formats ISO date string (e.g. 2024-10-15T12:34:56Z) to human-readable string.
 * Example: "15 Oct 2024, 12:34"
 */
export const formatDate = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) {
      return isoDateString;
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  } catch (error) {
    return isoDateString;
  }
};

/**
 * Formats ISO date string to Month & Year Header (e.g. "October 2024").
 */
export const formatMonthHeader = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return isoDateString;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  } catch (error) {
    return isoDateString;
  }
};

/**
 * Formats ISO date string to time only (e.g. "12:34").
 */
export const formatTimeOnly = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return isoDateString;

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch (error) {
    return isoDateString;
  }
};
