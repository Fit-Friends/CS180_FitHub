import * as React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import MainPage from './main';
import LeaderboardPage from './leaderboard';
import ProfilePage from './profile';
import HistoryPage from './history';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: '#075EEC', 
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainPage}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardPage}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="weight-lifter" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryPage}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;