import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Pressable, Text, Box, HStack, Spacer, ScrollView, Badge, Center, NativeBaseProvider } from "native-base";
import Constants from 'expo-constants';

import BenchExercise from './BenchExercise';

const MondayRoute = () => (
  <View style={[styles.container, { backgroundColor: 'white' }]}>
    <ScrollView style={styles.dayExercises}>
      <BenchExercise/>
      <BenchExercise/>
      <BenchExercise/>
      <BenchExercise/>
      <BenchExercise/>
      <BenchExercise/>
      <BenchExercise/>
    </ScrollView>

  </View>
);
const TuesdayRoute = () => (
  <View style={[styles.container, { backgroundColor: 'darkseagreen' }]} />
);
const WednesdayRoute = () => (
  <View style={[styles.container, { backgroundColor: 'dodgerblue' }]} />
);
const ThursdayRoute = () => (
  <View style={[styles.container, { backgroundColor: 'darksalmon' }]} />
);
const FridayRoute = () => (
  <View style={[styles.container, { backgroundColor: 'khaki' }]} />
);

export default function DaysAndExercises() {

  //const handleIndexChange = (index) => setState({ index });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'monday', title: 'M' },
    { key: 'tuesday', title: 'T' },
    { key: 'wednesday', title: 'W' },
    { key: 'thursday', title: 'T' },
    { key: 'friday', title: 'F' },
  ])

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      labelStyle={styles.tabLabel}
      style={styles.tabBar}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'monday':
        return <MondayRoute />;
      case 'tuesday':
        return <TuesdayRoute />;
      case 'wednesday':
        return <WednesdayRoute />;
      case 'thursday':
        return <ThursdayRoute />;
      case 'friday':
        return <FridayRoute />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      tabBarPosition='bottom'
      style={styles.tabView}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayExercises: {
    marginHorizontal: 6,
  },
  tabBar: {
    backgroundColor: 'lightblue',
  },
  tabIndicator: {
    backgroundColor: 'white',

  },
  tabLabel: {
    fontSize: 12,
    textTransform: 'capitalize',
    margin: 0,
    padding: 0,
  },
  tabView: {
    flex: 1,
  }
});
