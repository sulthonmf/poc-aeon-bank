import { Transaction } from '../types/transaction';

// BE Response as specified in the assessment prompt
const MOCK_BE_RESPONSE: { data: Transaction[] } = {
  data: [
    {
      refId: "123ABC",
      transferDate: "2024-10-15T12:34:56Z",
      recipientName: "John Doe",
      transferName: "Salary Payment",
      amount: 1500.00
    },
    {
      refId: "456DEF",
      transferDate: "2024-09-21T09:12:45Z",
      recipientName: "Jane Smith",
      transferName: "Invoice Payment",
      amount: 2300.75
    },
    {
      refId: "789GHI",
      transferDate: "2024-10-05T16:18:30Z",
      recipientName: "Robert Brown",
      transferName: "Refund",
      amount: -500.00
    },
    {
      refId: "101JKL",
      transferDate: "2024-08-30T11:47:22Z",
      recipientName: "Emily Davis",
      transferName: "Bonus Payment",
      amount: 1200.00
    },
    {
      refId: "202MNO",
      transferDate: "2024-10-18T08:15:00Z",
      recipientName: "AEON Mart",
      transferName: "Grocery Purchase",
      amount: -145.50
    },
    {
      refId: "303PQR",
      transferDate: "2024-10-20T14:22:10Z",
      recipientName: "Tenaga Nasional",
      transferName: "Utility Bill",
      amount: -210.00
    }
  ]
};

/**
 * Simulates a backend API call to fetch transactions list.
 */
export const fetchTransactionsFromApi = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    // Simulate network latency (600ms)
    setTimeout(() => {
      resolve(MOCK_BE_RESPONSE.data);
    }, 600);
  });
};
