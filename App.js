import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RestaurantScreen from "./screens/RestaurantScreen"
import { HomeScreen } from './screens/HomeScreen';
import { ThemeProvider } from "styled-components/native";
import { theme } from './infrastructure/theme/index';
import { useFonts as UsePoppins,Poppins_400Regular,Poppins_500Medium,Poppins_600SemiBold,Poppins_700Bold,Poppins_800ExtraBold,} from '@expo-google-fonts/poppins';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import CallScreen from './screens/CallScreen';


const Stack = createNativeStackNavigator();
export default function App() {
  const [PoppinsLoaded] = UsePoppins({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  if (!PoppinsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Basket" component={BasketScreen} 
        options={{presentation:"modal", headerShown: false}} />
        <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} 
        options={{presentation:"fullScreenModal" , headerShown: false}}/>
         <Stack.Screen name="Delivery" component={DeliveryScreen} 
        options={{presentation:"fullScreenModal" , headerShown: false}}/>
        <Stack.Screen name="Call" component={CallScreen} 
        options={{presentation:"fullScreenModal" , headerShown: false}}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    </Provider>
    </ThemeProvider>
  );
}

