import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';

import { View, Text, Button, Avatar, Box } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NativeConstants from 'expo-constants';

import { NativeBaseProvider } from "native-base";

import Home from './screens/Home';

function HomeScreen() {
  return (
    <View flex="1">
      <StatusBar />
      <Home/>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings here idk</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: { height: 102.2 }, tabBarShowLabel: false, tabBarStyle: { height: 82 }
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={"black"} size={32} />
          ),
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={"black"} size={32} />
        ),
      }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>

      <NavigationContainer>
        <View style={styles.container}>
          <MyTabs />
        </View>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  statusBar: {
    height: NativeConstants.statusBarHeight,
  },
  header: {
    //backgroundColor: "green",
  },
  home: {
  },
  headerRight: {
    //backgroundColor: "red",
    flex: 1,
    alignItems: "center",
  },
  bottomBar: {
    height: 84,
    backgroundColor: 'pink',
  }
});
