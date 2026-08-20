import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTransactionStore } from '../store/useTransactionStore';
import { FilterType } from '../types/transaction';
import { getTranslation } from '../utils/i18n';

export const FilterChips: React.FC = () => {
  const filterType = useTransactionStore((state) => state.filterType);
  const setFilterType = useTransactionStore((state) => state.setFilterType);
  const language = useTransactionStore((state) => state.language);
  const t = getTranslation(language);

  const filters: { key: FilterType; label: string; activeColor: string }[] = [
    { key: 'ALL', label: t.filterAll, activeColor: '#0F172A' },
    { key: 'INCOME', label: t.filterIncome, activeColor: '#10B981' },
    { key: 'EXPENSE', label: t.filterExpense, activeColor: '#EF4444' },
  ];

  return (
    <View style={styles.container}>
      {filters.map((item) => {
        const isActive = filterType === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.7}
            onPress={() => setFilterType(item.key)}
            style={[
              styles.chip,
              isActive
                ? { backgroundColor: item.activeColor, borderColor: item.activeColor }
                : styles.inactiveChip,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                isActive ? styles.activeChipText : styles.inactiveChipText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  inactiveChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  inactiveChipText: {
    color: '#475569',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
});
