import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponent from './app/views/HomeComponent';
import SQLiteComponent from './app/views/SQLiteComponent';
import MapComponent from './app/views/MapComponent';
import ImagePickerComponent from './app/views/ImagePickerComponent';
import CameraComponent from './app/views/CameraComponent';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeComponent} />
        <Stack.Screen name="SQLite" component={SQLiteComponent} />
        <Stack.Screen name="MapComponent" component={MapComponent} />
        <Stack.Screen name="ImagePickerComponent" component={ImagePickerComponent} />
        <Stack.Screen name="CameraComponent" component={CameraComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;