import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/login'; 
import RegisterScreen from './components/register'; 
import MainPage from './components/main';
import LeaderboardPage from './components/leaderboard';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="Leaderboard" component={LeaderboardPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
