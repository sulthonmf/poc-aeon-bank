import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './src/types/transaction';
import { HomeScreen } from './src/screens/HomeScreen';
import { TransactionDetailScreen } from './src/screens/TransactionDetailScreen';
import { useTransactionStore } from './src/store/useTransactionStore';
import { getTranslation } from './src/utils/i18n';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const language = useTransactionStore((state) => state.language);
  const t = getTranslation(language);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTitleStyle: {
              fontWeight: '700',
              color: '#0F172A',
            },
            headerTintColor: '#0F172A',
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: '#F8FAFC',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetailScreen}
            options={{
              title: t.transactionDetails,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
