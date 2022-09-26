import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import { Text, Button, Avatar, Box } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NativeConstants from 'expo-constants';

import { NativeBaseProvider } from "native-base";

import Home from './screens/Home';

function TopBar() {
  return (
    <Button borderRadius={"8"} padding="1" colorScheme="light" variant="ghost">
      <Box justifyContent="center" alignItems="center" width="190">
        <Text fontWeight={"bold"} fontSize="md">September 24, 2022</Text>
        <Text fontSize="xs" color="grey">(Current)</Text>
      </Box>
    </Button>
  );
}

function ProfilePicture() {
  return (
    <Avatar bg="black" size={"sm"}>R</Avatar>
  )
}

function HomeScreen() {
  return (
    <View flex="1">
      <StatusBar />
      <Home />
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
      headerStyle: { height: 100 }, tabBarShowLabel: false, tabBarStyle: { height: 78 }
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <TopBar {...props} />,
          headerRight: (props) => <ProfilePicture {...props} />,
          headerTitleContainerStyle: styles.header,
          headerRightContainerStyle: styles.headerRight,
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
