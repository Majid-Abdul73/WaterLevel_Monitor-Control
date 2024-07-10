import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PumpControlScreen from '../screens/PumpControlScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="PumpControl" component={PumpControlScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
