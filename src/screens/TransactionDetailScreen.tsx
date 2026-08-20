import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Share,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/transaction';
import { useTransactionStore } from '../store/useTransactionStore';
import { getTranslation } from '../utils/i18n';
import { formatCurrencyMYR, formatDate } from '../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

export const TransactionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { transaction } = route.params;
  const language = useTransactionStore((state) => state.language);
  const t = getTranslation(language);

  const { formattedText, isIncome } = formatCurrencyMYR(transaction.amount);
  const formattedDate = formatDate(transaction.transferDate);

  const handleShare = async () => {
    try {
      const shareMessage = `${t.shareHeader}\n` +
        `${t.refId}: ${transaction.refId}\n` +
        `${t.recipientName}: ${transaction.recipientName}\n` +
        `${t.transferName}: ${transaction.transferName}\n` +
        `${t.transferDate}: ${formattedDate}\n` +
        `${t.amount}: ${formattedText}\n` +
        `------------------------------------`;

      await Share.share({
        title: t.shareTitle,
        message: shareMessage,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Could not share details');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Amount Card */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>
            {isIncome ? t.incomeType : t.expenseType}
          </Text>
          <Text
            style={[
              styles.amountValue,
              isIncome ? styles.incomeText : styles.expenseText,
            ]}
          >
            {formattedText}
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>✓ {t.statusCompleted}</Text>
          </View>
        </View>

        {/* Details Table Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionHeader}>{t.transactionDetails}</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t.refId}</Text>
            <Text style={[styles.detailValue, styles.monoText]}>{transaction.refId}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t.recipientName}</Text>
            <Text style={styles.detailValue}>{transaction.recipientName}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t.transferName}</Text>
            <Text style={styles.detailValue}>{transaction.transferName}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t.transferDate}</Text>
            <Text style={styles.detailValue}>{formattedDate}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Share Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleShare}
          style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}>{t.shareButton}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
  },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  amountLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  incomeText: {
    color: '#10B981',
  },
  expenseText: {
    color: '#EF4444',
  },
  statusBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  monoText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  shareButton: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
