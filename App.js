import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import MainStackNavigator from './navigation/MainStackNavigator';


// const RootStack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator>
//         <RootStack.Screen name="Main" component={MainStackNavigator} />
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;









// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { WaterLevelProvider } from './context/WaterLevelContext';

const App = () => {
  return (
    <WaterLevelProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </WaterLevelProvider>
  );
};

export default App;
