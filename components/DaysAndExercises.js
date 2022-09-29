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
const defaultExercises = [
  {
    name: "Bench",
    nameInternal: "BenchMonday",
    id: 0,
    trainingMax: 290,
    repsAndMaxPercents: [{ reps: 8, percent: 0.65 }, { reps: 6, percent: 0.75 }, { reps: 4, percent: 0.85 }, { reps: 4, percent: 0.85 }, { reps: 4, percent: 0.85 }, { reps: 5, percent: 0.8 }, { reps: 6, percent: 0.75 }, { reps: 6, percent: 0.7 }, { reps: "8+", percent: 0.65 }]
  },
  {
    name: "Overhead Press",
    nameInternal: "OverheadPress",
    id: 1,
    trainingMax: 175,
    repsAndMaxPercents: [{ reps: 6, percent: 0.50 }, { reps: 5, percent: 0.60 }, { reps: 3, percent: 0.70 }, { reps: 5, percent: 0.70 }, { reps: 7, percent: 0.70 }, { reps: 4, percent: 0.70 }, { reps: 6, percent: 0.70 }, { reps: 8, percent: 0.70 }]
  },
  {
    name: "Squat",
    nameInternal: "Squat",
    id: 2,
    trainingMax: 300,
    repsAndMaxPercents: [{ reps: 5, percent: 0.75 }, { reps: 3, percent: 0.85 }, { reps: "1+", percent: 0.95 }, { reps: 3, percent: 0.90 }, { reps: 3, percent: 0.85 }, { reps: 3, percent: 0.80 }, { reps: 5, percent: 0.75 }, { reps: 5, percent: 0.70 }, { reps: "5+", percent: 0.65 }]
  }
]

const defaultMondayExercises = [
  {
    name: "Bench",
    nameInternal: "BenchMonday",
    id: 0,
    trainingMax: 290,
    done: 0,
  },
  {
    name: "Overhead Press",
    nameInternal: "OverheadPress",
    id: 1,
    trainingMax: 175,
    done: 0,
  }]

function RoundToNearest(num) {
  var result = Math.round(num * 0.2);
  return result * 5;
}

export default function DaysAndExercises({ navigation }) {

  const [exercises, changeExercises] = React.useState(defaultExercises);

  const [mondayExercises, changeMondayExercises] = React.useState(defaultMondayExercises);

  const Stack = createNativeStackNavigator();

  const MondayRoute = ({ navigation }) => (
    <View style={[styles.container]}>
      <ScrollView style={styles.dayExercises}>
        <ExerciseCard navigation={navigation} exercise={exercises[0]} done={3} />
        <ExerciseCard navigation={navigation} exercise={exercises[1]} done={7} />
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
      console.log(newTrainingMax);
      changeCurrTrainingMax(newTrainingMax);

      exercises.forEach(element => {
        if (element.id == props.exercise.id) {
          console.log("New training max for " + element.name + " -> " + newTrainingMax);
          props.exercise.trainingMax = newTrainingMax;
        }

      });
    }

    // This handles the display for each working set and its respective reps for an exercise
    function SetAndReps(props) {
      return (
        props.exercise.repsAndMaxPercents.map((currentSet, i) => {

          const [repsCompleted, changeRepsCompleted] = React.useState(0);

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

          function handleButtonPress() {
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
              <Input width="48px" p="2" mx="3" value={repsCompleted + ""} onChangeText={changeRepsCompleted} textAlign={"center"} focusOutlineColor="success.500" keyboardType={'numeric'}
                maxLength="3" variant="outline" bg="white" />
              <IconButton position="absolute" right="-36px" size="md" icon={currentSetIcon()} onPress={() => { handleButtonPress() }} />
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
