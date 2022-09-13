import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Constants from 'expo-constants';

const MondayRoute = () => (
  <View style={[styles.container, { backgroundColor: 'crimson' }]} />
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

export default class Example extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'monday', title: 'Monday' },
      { key: 'tuesday', title: 'Tuesday' },
      { key: 'wednesday', title: 'Wednesday' },
      { key: 'thursday', title: 'Thursday' },
      { key: 'friday', title: 'Friday' },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'monday':
        return <View><Text>Cat</Text><MondayRoute />
        </View>;
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

  render() {
    return (
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          tabBarPosition='bottom'
          style={styles.tabView}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 0,
  },
  tabView: {
    flex: 1,
    backgroundColor: 'red',
  }
});
