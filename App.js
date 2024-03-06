import React, { useState } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/login'; 
import RegisterScreen from './components/register'; 
import HomeTabs from './components/HomeTabs';
import UserContext from './components/UserContext';

const Stack = createNativeStackNavigator();

function App() {

  const [user, setUser] = useState({ userId: null, email: null });


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
