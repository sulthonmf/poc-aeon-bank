import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Transaction } from '../types/transaction';
import { useTransactionStore, useGroupedTransactions } from '../store/useTransactionStore';
import { getTranslation } from '../utils/i18n';
import { SearchBar } from '../components/SearchBar';
import { FilterChips } from '../components/FilterChips';
import { TransactionItem } from '../components/TransactionItem';
import { LanguageToggle } from '../components/LanguageToggle';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const isLoading = useTransactionStore((state) => state.isLoading);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);
  const language = useTransactionStore((state) => state.language);
  const groupedTransactions = useGroupedTransactions();
  const t = getTranslation(language);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSelectItem = (transaction: Transaction) => {
    navigation.navigate('TransactionDetail', { transaction });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* App Top Header */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>{t.appName}</Text>
          <Text style={styles.brandSubtitle}>{t.dashboardTitle}</Text>
        </View>
        <LanguageToggle />
      </View>

      {/* Search Input */}
      <SearchBar />

      {/* Filter Chips */}
      <FilterChips />

      {/* Content Section */}
      {isLoading && groupedTransactions.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0F172A" />
          <Text style={styles.loadingText}>{t.loadingText}</Text>
        </View>
      ) : (
        <SectionList
          sections={groupedTransactions}
          keyExtractor={(item) => item.refId}
          renderItem={({ item }) => (
            <TransactionItem transaction={item} onPress={handleSelectItem} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeaderTitle}>{title}</Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={
            groupedTransactions.length === 0 ? styles.emptyListContainer : styles.listContent
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchTransactions}
              tintColor="#0F172A"
              colors={['#0F172A']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>{t.emptyStateTitle}</Text>
              <Text style={styles.emptySubtitle}>{t.emptyStateSub}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  brandContainer: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 16,
  },
  sectionHeaderContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
    backgroundColor: '#F8FAFC',
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748B',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
});
