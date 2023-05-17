// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, Alert, Platform } from 'react-native';
import { useImageDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications


const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const DisplayData = async () => {
    try {
      let isLoggedIn1 = await AsyncStorage.getItem('isLoggedIn');
      let isTrueSet = (isLoggedIn1 === 'true');

      setisLoggedIn(isTrueSet);
    }
    catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    DisplayData();
  }, []);

  return (

    <View style={{ flex: 1 }}>
      {/* <Routes></Routes> */}
      {/* <Navbar></Navbar> */}
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen
            name="Welcome"
            // component={isLoggedIn ? HomePage : WelcomeScreen}
            component={WelcomeScreen}
            options={{ title: 'Welcome' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
}