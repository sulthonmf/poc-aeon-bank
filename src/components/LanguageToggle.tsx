import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTransactionStore } from '../store/useTransactionStore';

export const LanguageToggle: React.FC = () => {
  const language = useTransactionStore((state) => state.language);
  const toggleLanguage = useTransactionStore((state) => state.toggleLanguage);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleLanguage}
      style={styles.container}
    >
      <View style={[styles.badge, language === 'en' && styles.activeBadge]}>
        <Text style={[styles.text, language === 'en' && styles.activeText]}>EN</Text>
      </View>
      <View style={[styles.badge, language === 'ms' && styles.activeBadge]}>
        <Text style={[styles.text, language === 'ms' && styles.activeText]}>MS</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 3,
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  activeBadge: {
    backgroundColor: '#0F172A',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeText: {
    color: '#FFFFFF',
  },
});
