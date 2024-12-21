import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack here
import CreateAccountScreen from './screen/CreateAccountScreen';

const Stack = createStackNavigator(); // Create the Stack Navigator

function App() {
  return (
    <CreateAccountScreen/>

  );
}

export default App;
