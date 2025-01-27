import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Board from './screens/Board';

const Stack = createStackNavigator();

function BoardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <BoardStack />
    </NavigationContainer>
  )
}

export default function App() {
  return <RootNavigator />
}

