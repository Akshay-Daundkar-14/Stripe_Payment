import { StripeProvider } from '@stripe/stripe-react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Payment from './components/Payment';

export default function App() {
  return (
    <View style={styles.container}>
      
      <StripeProvider publishableKey='pk_test_51NLoNwSCASBx8o4yKN1N0ggD9yG8F1jeWtTcfBtFcKqU0Rg5AYcbV9CHWhQcGONx0ydbwjhwz1QQQThEondwvhLE00D0qWAJGD'>
        <Payment/>
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
