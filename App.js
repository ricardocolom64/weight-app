import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import NativeConstants from 'expo-constants';

import {NativeBaseProvider} from "native-base";

import Home from './screens/Home';
import Example from './components/Example';
import TopBar from './components/TopBar';

var allWeights = [45, 25, 10, 5, 2.5];
var barWeight = 45;

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <TopBar />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: 'firebrick',
    height: NativeConstants.statusBarHeight,
  },
  container: {
    flex: 1
  },
  example: {
    height: '100%',
  }
});
