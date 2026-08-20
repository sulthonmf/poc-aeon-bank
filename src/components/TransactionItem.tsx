import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Transaction } from '../types/transaction';
import { formatCurrencyMYR, formatDate } from '../utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  const { formattedText, isIncome } = formatCurrencyMYR(transaction.amount);
  const formattedDate = formatDate(transaction.transferDate);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(transaction)}
      style={styles.card}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.transferName} numberOfLines={1}>
          {transaction.transferName}
        </Text>
        <Text style={styles.recipientName} numberOfLines={1}>
          {transaction.recipientName}
        </Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text
          style={[
            styles.amountText,
            isIncome ? styles.incomeText : styles.expenseText,
          ]}
        >
          {formattedText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  leftContainer: {
    flex: 1,
    paddingRight: 12,
  },
  transferName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  recipientName: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 15,
    fontWeight: '700',
  },
  incomeText: {
    color: '#10B981', // Green for income (pemasukan)
  },
  expenseText: {
    color: '#EF4444', // Red for expense (pengeluaran)
  },
});
