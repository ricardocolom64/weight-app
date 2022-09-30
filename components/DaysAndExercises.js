import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Pressable, Text, Box, HStack, Spacer, ScrollView, Center, NativeBaseProvider, Button, Divider, Input, IconButton, CheckIcon, CloseIcon, ArrowForwardIcon, InfoIcon } from "native-base";
import Constants from 'expo-constants';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//import { exercises } from './AllExercises';

import ExerciseCard from './ExerciseCard';
import { Details } from './ExerciseCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// These should be global exercise definitions
const exerciseDefs = [
  {
    name: "Bench",
    nameInternal: "BenchMonday",
    id: 0,
    dayOfWeek: "Monday",
    trainingMax: 290,
    setInfoDefs: [{ reps: 8, percent: 0.65 }, { reps: 6, percent: 0.75 }, { reps: 4, percent: 0.85 }, { reps: 4, percent: 0.85 }, { reps: 4, percent: 0.85 }, { reps: 5, percent: 0.8 }, { reps: 6, percent: 0.75 }, { reps: 6, percent: 0.7 }, { reps: "8+", percent: 0.65 }]
  },
  {
    name: "Overhead Press",
    nameInternal: "OverheadPress",
    id: 1,
    dayOfWeek: "Monday",
    trainingMax: 175,
    setInfoDefs: [{ reps: 6, percent: 0.50 }, { reps: 5, percent: 0.60 }, { reps: 3, percent: 0.70 }, { reps: 5, percent: 0.70 }, { reps: 7, percent: 0.70 }, { reps: 4, percent: 0.70 }, { reps: 6, percent: 0.70 }, { reps: 8, percent: 0.70 }]
  },
  {
    name: "Squat",
    nameInternal: "Squat",
    id: 2,
    dayOfWeek: "Tuesday",
    trainingMax: 300,
    setInfoDefs: [{ reps: 5, percent: 0.75 }, { reps: 3, percent: 0.85 }, { reps: "1+", percent: 0.95 }, { reps: 3, percent: 0.90 }, { reps: 3, percent: 0.85 }, { reps: 3, percent: 0.80 }, { reps: 5, percent: 0.75 }, { reps: 5, percent: 0.70 }, { reps: "5+", percent: 0.65 }]
  }
]

const sampleMondayExercises = [
  {
    name: "Bench",
    nameInternal: "BenchMonday",
    id: 0,
    dayOfWeek: "Monday",
    trainingMax: 290,
    setInfo: [{ reps: 8, percent: 0.65, repsDone: 0 }, { reps: 6, percent: 0.75, repsDone: 0 }, { reps: 4, percent: 0.85, repsDone: 0 }, { reps: 4, percent: 0.85, repsDone: 0 }, { reps: 4, percent: 0.85, repsDone: 0 }, { reps: 5, percent: 0.8, repsDone: 0 }, { reps: 6, percent: 0.75, repsDone: 0 }, { reps: 6, percent: 0.7, repsDone: 0 }, { reps: "8+", percent: 0.65, repsDone: 0 }],
    setsCompleted: 0,
  },
  {
    name: "Overhead Press",
    nameInternal: "OverheadPress",
    id: 1,
    dayOfWeek: "Monday",
    trainingMax: 175,
    setInfo: [{ reps: 6, percent: 0.50, repsDone: 0 }, { reps: 5, percent: 0.60, repsDone: 0 }, { reps: 3, percent: 0.70, repsDone: 0 }, { reps: 5, percent: 0.70, repsDone: 0 }, { reps: 7, percent: 0.70, repsDone: 0 }, { reps: 4, percent: 0.70, repsDone: 0 }, { reps: 6, percent: 0.70, repsDone: 0 }, { reps: 8, percent: 0.70, repsDone: 0 }],
    setsCompleted: 0,
  }
]

function RoundToNearest(num) {
  var result = Math.round(num * 0.2);
  return result * 5;
}

export default function DaysAndExercises({ navigation }) {

  const [exercises, changeExercises] = React.useState(sampleMondayExercises);

  const [mondayExercises, changeMondayExercises] = React.useState(sampleMondayExercises);

  const Stack = createNativeStackNavigator();

  /*
    Even though mondayExercises does indeed update its contents like it should, ExerciseCard only re-retrieves the information on re-render.

    Meaning that it seems ExerciseCard is only being visually updated when it is forced to re-render. AKA when it is pressed or on its first load in general.

    The solution:

    *** -> Find a way to re-render ExerciseCard or maybe even MondayRoute. <- ***

    Shouldn't be an issue, except useEffect on mondayExercises is never fired, probably because changeMondayExercises isn't ever directly called.
  */

  const MondayRoute = ({ navigation }) => (
    <View style={[styles.container]}>
      <ScrollView style={styles.dayExercises}>
        <ExerciseCard navigation={navigation} exercise={mondayExercises[0]} />
        <ExerciseCard navigation={navigation} exercise={mondayExercises[1]} />
        <Button onPress={() => { console.log(mondayExercises) }} />
      </ScrollView>
    </View>
  );
  const TuesdayRoute = ({ navigation }) => (
    <View style={[styles.container]}>
      <ScrollView style={styles.dayExercises}>
        <ExerciseCard navigation={navigation} exercise={mondayExercises[1]} />
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
          return <TuesdayRoute navigation={navigation} />;
        case 'wednesday':
          return <WednesdayRoute navigation={navigation} />;
        case 'thursday':
          return <ThursdayRoute navigation={navigation} />;
        case 'friday':
          return <FridayRoute navigation={navigation} />;
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

  function ExerciseDetails(props) {

    // This hook is used for the value parameter of the Training Max input field. Without it the Training Max field won't retain any changes and will revert back to its previous number.
    const [currTrainingMax, changeCurrTrainingMax] = React.useState(props.exercise.trainingMax);

    const handleExerciseDetailsGoBack = () => {
      props.navigation.goBack();      
    }

    const handleChangeTrainingMax = (newTrainingMax) => {
      changeCurrTrainingMax(newTrainingMax);

      exercises.forEach(element => {
        if (element.id == props.exercise.id) {
          props.exercise.trainingMax = newTrainingMax;
        }

      });
    }

    // This handles the display for each working set and its respective reps for an exercise
    function SetAndReps(props) {

      return (
        props.exercise.setInfo.map((currentSet, i) => {

          const [repsCompleted, changeRepsCompleted] = React.useState(currentSet.repsDone);

          const handleChangeRepsCompleted = (text) => {
            changeRepsCompleted(text);

            if (Number.isInteger(+text)) {
              currentSet.repsDone = +text;

              var setsCompleted = 0;

              props.exercise.setInfo.forEach(element => {
                if (element.repsDone >= element.reps)
                  setsCompleted++;
              });

              props.exercise.setsCompleted = setsCompleted;
            }
          }

          function currentSetStatus() {
            if (repsCompleted > 0 && repsCompleted < currentSet.reps) {
              return "failed";
            }
            else if (repsCompleted >= currentSet.reps) {
              return "completed";
            }
            else
              return "initial";
          }

          function currentSetBackground() {
            switch (currentSetStatus()) {
              case "failed":
                return "error.500";
              case "completed":
                return "success.500";
              default:
                return "muted.200";
            }
          }

          function currentSetIcon() {
            switch (currentSetStatus()) {
              case "failed":
                return <CloseIcon color="error.500" />;
              case "completed":
                return <CheckIcon color="success.500" />;
              default:
                return <CheckIcon color="muted.200" />;
            }
          }

          function handleSetButtonPress() {
            if (currentSetStatus() == "initial") {
              changeRepsCompleted(currentSet.reps);
            }
            else {
              changeRepsCompleted(0);
            }
          }

          return (<Box flex="1" flexDirection="row" py="0" alignItems="center" bg={i % 2 ? "white" : "muted.100"} key={i}>
            <Spacer />
            <Box width="128px">
              <Text>{currentSet.reps} reps at {RoundToNearest(props.exercise.trainingMax * currentSet.percent)} lb</Text>
              <Text color="grey" fontSize="xs">{currentSet.percent * 100}% of training max</Text>
            </Box>
            <Box flex="1" width="2px" height="100%" position="absolute" left="0px" bg={currentSetBackground()} />
            <Spacer />
            <Divider orientation='vertical' thickness="0" />
            <Spacer />
            <Box width="128px" flexDirection="row" alignItems="center" justifyContent="center">
              <Input width="48px" p="2" mx="3" value={repsCompleted + ""} onChangeText={handleChangeRepsCompleted} textAlign={"center"} focusOutlineColor="success.500" keyboardType={'numeric'}
                maxLength="3" variant="outline" bg="white" />
              <IconButton position="absolute" right="-36px" size="md" icon={currentSetIcon()} onPress={() => { handleSetButtonPress() }} />
            </Box>
            <Spacer />
          </Box>)
        }

        )
      )
    }

    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <Box flex="1" alignItems="center" marginBottom={2} marginX={"6px"} bg="white" rounded="8" shadow={0} borderWidth="1" borderColor="coolGray.300" overflow="hidden">
          <Box alignItems="center" justifyContent="center" height="48px" width="100%">
            <Text fontWeight={"bold"} fontSize="md">{props.exercise.name + ""}</Text>
            <Button size="xs" position="absolute" left="2px" borderRadius={"8"} p="2" colorScheme="light" variant="ghost" onPress={() => { handleExerciseDetailsGoBack() }}>
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
                  maxLength="3" value={currTrainingMax + ""} InputRightElement={<Text mx="2">lb</Text>} mr="2" position="absolute" right="0px" onChangeText={newTrainingMax => { handleChangeTrainingMax(newTrainingMax) }} />
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
                <SetAndReps exercise={props.exercise} trainingMax={280} />
              </Box>
            </Box>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    )
  }

  function DetailsScreen({ navigation, route }) {
    return (
      <ExerciseDetails navigation={navigation} exercise={route.params.exercise} />
    );
  }

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
