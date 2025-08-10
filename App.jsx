import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './src/store';
import LoginPage from './src/pages/LoginPage';
import SearchPage from './src/pages/SearchPage';
import WarPage from './src/pages/WarPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Search" component={SearchPage} />
          <Stack.Screen name="War" component={WarPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
