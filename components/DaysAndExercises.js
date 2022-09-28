import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Pressable, Text, Box, HStack, Spacer, ScrollView, Center, NativeBaseProvider, Button, Divider, Input, IconButton, CheckIcon, CloseIcon, ArrowForwardIcon, InfoIcon } from "native-base";
import Constants from 'expo-constants';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { exercises } from './AllExercises';

import ExerciseCard from './ExerciseCard';
import { Details } from './ExerciseCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

const MondayRoute = ({ navigation }) => (
  <View style={[styles.container]}>
    <ScrollView style={styles.dayExercises}>
      <ExerciseCard navigation={navigation} exercise={exercises[0]} done={3} />
      <ExerciseCard navigation={navigation} exercise={exercises[1]} done={0} />
    </ScrollView>
  </View>
);
const TuesdayRoute = ({ navigation }) => (
  <View style={[styles.container]}>
    <ScrollView style={styles.dayExercises}>
      <ExerciseCard navigation={navigation} exercise={exercises[2]} done={5} />
    </ScrollView>
  </View>
);
const WednesdayRoute = ({ navigation }) => (
  <View style={[styles.container, { backgroundColor: 'dodgerblue' }]} />
);
const ThursdayRoute = ({ navigation }) => (
  <View style={[styles.container, { backgroundColor: 'darksalmon' }]} />
);
const FridayRoute = ({ navigation }) => (
  <View style={[styles.container, { backgroundColor: 'khaki' }]} />
);

function DaysAndExercisesScreen({ navigation }) {
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
        return <MondayRoute navigation={navigation} />;
      case 'tuesday':
        return <TuesdayRoute navigation={navigation}/>;
      case 'wednesday':
        return <WednesdayRoute navigation={navigation}/>;
      case 'thursday':
        return <ThursdayRoute navigation={navigation}/>;
      case 'friday':
        return <FridayRoute navigation={navigation}/>;
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

function RoundToNearest(props) {
  var result = Math.round(props * 0.2);
  return result * 5;
}

function ExerciseDetails(props) {

  const [trainingMax, changeTrainingMax] = React.useState(props.exercise.trainingMax);

  function SetAndReps(props) {
    return (
      props.exercise.repsAndMaxPercents.map((curr, i) => <Box flex="1" flexDirection="row" py="0" alignItems="center" bg={i % 2 ? "white" : "muted.100"} key={i}>
        <Spacer />
        <Box width="128px">
          <Text>{curr.reps} reps at {RoundToNearest(trainingMax * curr.percent)} lb</Text>
          <Text color="grey" fontSize="xs">{curr.percent * 100}% of training max</Text>
        </Box>
        <Box flex="1" width="2px" height="100%" position="absolute" left="0px" bg="success.500" />
        <Spacer />
        <Divider orientation='vertical' thickness="0" />
        <Spacer />
        <Box width="128px" flexDirection="row" alignItems="center" justifyContent="center">
          <Input width="48px" p="2" mx="3" textAlign={"center"} focusOutlineColor="success.500" keyboardType={'numeric'}
            maxLength="3" variant="outline" bg="white" />
          <IconButton position="absolute" right="-36px" size="md" icon={<CheckIcon color="success.500" />} />
        </Box>
        <Spacer />
      </Box>)
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <Box flex="1" alignItems="center" marginBottom={2} marginX={"6px"} bg="white" rounded="8" shadow={0} borderWidth="1" borderColor="coolGray.300" overflow="hidden">
        <Box alignItems="center" justifyContent="center" height="48px" width="100%">
          <Text fontWeight={"bold"} fontSize="md">{props.exercise.name + ""}</Text>
          <Button size="xs" position="absolute" left="2px" borderRadius={"8"} p="2" colorScheme="light" variant="ghost" onPress={props.navigation.goBack}>
            <Box flexDir={"row"} alignItems="center" justifyContent={"center"} width="92px" height="28px">
              <Box position="absolute" left="-6px" flexDirection={"row"} alignItems="center" justifyContent="center">
                <MaterialCommunityIcons name={"chevron-left"} size={24} />
                <Text fontSize={16} lineHeight="18px">Back</Text>
              </Box>
            </Box>
          </Button>
        </Box>
        <Divider />
        <Box flex="1" alignItems="center">
          <Box flexDirection="row" m="4" my="2" py="1" alignItems="center">
            <Spacer />
            <Box width="128px">
              <Text>Training Max</Text>
            </Box>
            <Spacer />
            <Spacer />
            <Box flexDirection="row" alignItems="center" justifyContent="center" width="128px">
              <Input width="72px" p="2" pr="0" textAlign={"center"} keyboardType={'numeric'}
                maxLength="4" value={trainingMax + ""} InputRightElement={<Text mx="2">lb</Text>} mr="2" position="absolute" right="0px" onChangeText={changeTrainingMax} />
              <IconButton position="absolute" right="-40px" size="sm" icon={<InfoIcon color="black" />} />
            </Box>
            <Spacer />
          </Box>
          <Box flex="1" alignItems="center">
            <Box flexDirection="row" mb="1" alignItems="center">
              <Spacer />
              <Box width="128px">
                <Text textAlign="center" color="grey" fontSize="xs">WORKING SETS</Text>
              </Box>
              <Spacer />
              <Divider orientation='vertical' />
              <Spacer />
              <Box width="128px">
                <Text textAlign="center" color="grey" fontSize="xs">REPS</Text>
              </Box>
              <Spacer />
            </Box>
            <Box alignItems="center" flex="1" height="600px" flexDirection="column" bg="red.300">
              <SetAndReps exercise={props.exercise} trainingMax={trainingMax} />
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  )
}

function DetailsScreen({ navigation, route }) {
  {console.log("AHHHH")}
  return (
    <ExerciseDetails navigation={navigation} exercise={route.params.exercise} />
  );
}

export default function DaysAndExercises({ navigation }) {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='DaysAndExercisesScreen'>
        <Stack.Screen name="DaysAndExercisesScreen" component={DaysAndExercisesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
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
