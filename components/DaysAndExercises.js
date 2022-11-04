import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Pressable, Text, Box, HStack, Spacer, ScrollView, Center, NativeBaseProvider, Button, Divider, Input, IconButton, CheckIcon, CloseIcon, ArrowForwardIcon, InfoIcon } from "native-base";
import Constants from 'expo-constants';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import ExerciseCard from './ExerciseCard';
import { Details } from './ExerciseCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalExerciseDefs } from './AllExercises';

function RoundToNearest(num) {
  var result = Math.round(num * 0.2);
  return result * 5;
}

export default function DaysAndExercises(props) {

  const globalExerciseDefs = props.globalExerciseDefs;

  const handleChangeGlobalExerciseDefs = (newGlobalExerciseDefs) => {
    props.changeGlobalExerciseDefs(newGlobalExerciseDefs);
  }

  const thisWeeksExercises = props.week.exercises

  //console.log(JSON.stringify(thisWeeksExercises, null, 4));

  function getExercisesForThisWeekday(day) {

    //console.log("Getting exercises for " + day + ": ")

    var result = [];

    thisWeeksExercises.forEach(element => {
      if(element.dayOfWeek == day)
      {
        //console.log(element.name + "...")
        result.push(element)
      }
    })
    
    return result;
  }

  const [mondayExercises, changeMondayExercises] = React.useState(getExercisesForThisWeekday("Monday"));

  //console.log(JSON.stringify(mondayExercises, null, 4));

  const [tuesdayExercises, changeTuesdayExercises] = React.useState(getExercisesForThisWeekday("Tuesday"));

  const [wednesdayExercises, changeWednesdayExercises] = React.useState(getExercisesForThisWeekday("Wednesday"));

  const [thursdayExercises, changeThursdayExercises] = React.useState(getExercisesForThisWeekday("Thursday"));

  const [fridayExercises, changeFridayExercises] = React.useState(getExercisesForThisWeekday("Friday"));


  const Stack = createNativeStackNavigator();

  const MondayRoute = ({ navigation }) => (
    <View flex="1">
      <ScrollView mx="6px">
        {mondayExercises.map((currExercise, i) => {
          return (<ExerciseCard navigation={navigation} exercise={currExercise} key={i} />)
        })}
        {/* <Button onPress={() => { console.log(mondayExercises) }} /> */}
      </ScrollView>
    </View>
  );

  const TuesdayRoute = ({ navigation }) => (
    <View flex="1">
      <ScrollView mx="6px">
        {tuesdayExercises.map((currExercise, i) => {
          return (<ExerciseCard navigation={navigation} exercise={currExercise} key={i} />)
        })}
      </ScrollView>
    </View>
  );
  const WednesdayRoute = ({ navigation }) => (
    <View flex="1">
      <ScrollView mx="6px">
        {wednesdayExercises.map((currExercise, i) => {
          return (<ExerciseCard navigation={navigation} exercise={currExercise} key={i} />)
        })}
      </ScrollView>
    </View>
  );
  const ThursdayRoute = ({ navigation }) => (
    <View flex="1">
      <ScrollView mx="6px">
        {thursdayExercises.map((currExercise, i) => {
          return (<ExerciseCard navigation={navigation} exercise={currExercise} key={i} />)
        })}
      </ScrollView>
    </View>
  );
  const FridayRoute = ({ navigation }) => (
    <View flex="1">
      <ScrollView mx="6px">
        {fridayExercises.map((currExercise, i) => {
          return (<ExerciseCard navigation={navigation} exercise={currExercise} key={i} />)
        })}
      </ScrollView>
    </View>
  );

  function DaysAndExercisesScreen({ navigation }) {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'monday', title: 'Mon' },
      { key: 'tuesday', title: 'tue' },
      { key: 'wednesday', title: 'wed' },
      { key: 'thursday', title: 'thu' },
      { key: 'friday', title: 'fri' },
    ])


    /*    
    This forces the DaysAndExercisesScreen to re-render whenever it is navigated back to.

    This is useful because the exersice card data now visually updates when it should.

    The dummy state hook literally just exists for the purpose of reloading this entire component.
    */

    const [dummy, changeDummy] = React.useState(0);

    const forceUpdate = navigation.addListener('focus', () => {
      changeDummy(dummy + 1);
    })

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

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={styles.tabIndicator}
        labelStyle={styles.tabLabel}
        style={styles.tabBar}
      />
    );



    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        tabBarPosition='bottom'
        style={{ backgroundColor: "transparent" }}
      />
    );

  }

  function ExerciseDetails(props) {

    // This hook is used for the value parameter of the Training Max input field. Without it the Training Max field won't retain any changes and will revert back to its previous number.
    const [currTrainingMax, changeCurrTrainingMax] = React.useState(props.exercise.trainingMax);

    const handleExerciseDetailsGoBack = () => {
      props.navigation.goBack();
    }

    // Iterate through the appropriate day's exercise hook (such as mondayExercises) to find the specific exercise that needs its trainingMax changed.
    const handleChangeTrainingMax = (newTrainingMax) => {
      changeCurrTrainingMax(newTrainingMax);

      //TODO: If Bench, change for all Benches and OHP, if squat, change for all squats, etc.
      
      globalExerciseDefs.forEach(element => {
        if(element.id == props.exercise.id)
        {
          console.log("Should change training max to " + newTrainingMax + " for " + props.exercise.name);

          element.trainingMax = newTrainingMax;
          //console.log(element);
        }
      })

      handleChangeGlobalExerciseDefs(globalExerciseDefs);

      if (props.exercise.dayOfWeek == "Monday") {
        mondayExercises.forEach(element => {
          if (element.id == props.exercise.id) {
            element.trainingMax = newTrainingMax;
          }
        });
      }
      else if (props.exercise.dayOfWeek == "Tuesday") {
        tuesdayExercises.forEach(element => {
          if (element.id == props.exercise.id) {
            element.trainingMax = newTrainingMax;
          }
        });
      }
      else if (props.exercise.dayOfWeek == "Wednesday") {
        wednesdayExercises.forEach(element => {
          if (element.id == props.exercise.id) {
            element.trainingMax = newTrainingMax;
          }
        });
      }
      else if (props.exercise.dayOfWeek == "Thursday") {
        thursdayExercises.forEach(element => {
          if (element.id == props.exercise.id) {
            element.trainingMax = newTrainingMax;
          }
        });
      }
      else if (props.exercise.dayOfWeek == "Friday") {
        fridayExercises.forEach(element => {
          if (element.id == props.exercise.id) {
            element.trainingMax = newTrainingMax;
          }
        });
      }
    }

    // This handles the display for each working set and its respective reps for an exercise
    function SetAndReps(props) {

      return (
        props.exercise.setInfo.map((currentSet, i) => {

          const [repsCompleted, changeRepsCompleted] = React.useState(currentSet.repsDone);

          const [currentSetStatus, changeCurrentSetStatus] = React.useState("initial")

          const handleChangeRepsCompleted = (text) => {
            changeRepsCompleted(text);

            //console.log("text: " + text + "\trepsCompleted: " + repsCompleted)
          }

          function currentSetBackground() {
            //console.log(i + "\tFiring currentSetBackground")

            var bg_color = "muted.200";
            if (currentSetStatus == "failed")
              bg_color = "error.500"
            else if (currentSetStatus == "completed")
              bg_color = "success.500";

            return (<Box flex="1" width="2px" height="100%" position="absolute" left="0px" bg={bg_color} />)
          }

          function currentSetIcon() {
            //console.log(i + "\tFiring currentSetIcon")

            if (currentSetStatus == "failed")
              return (<IconButton position="absolute" right="-36px" size="md" icon={<CloseIcon color="error.500" />} onPress={() => { handleSetButtonPress() }} />)
            else if (currentSetStatus == "completed")
              return (<IconButton position="absolute" right="-36px" size="md" icon={<CheckIcon color="success.500" />} onPress={() => { handleSetButtonPress() }} />)
            else
              return (<IconButton position="absolute" right="-36px" size="md" icon={<CheckIcon color="muted.200" />} onPress={() => { handleSetButtonPress() }} />)
          }

          // When reps completed is changed...
          React.useEffect(() => {

            if (typeof currentSet.reps === 'string') {

              //console.log("repsCompleted: " + repsCompleted + "\tcurrentSet.reps: " + (currentSet.reps).replace("+", ""))

              if (repsCompleted >= parseInt((currentSet.reps).replace("+", ""))) {
                changeCurrentSetStatus("completed")
              }
              else if (repsCompleted > 0 && repsCompleted < parseInt((currentSet.reps).replace("+", ""))) {
                changeCurrentSetStatus("failed")
              }
              else
                changeCurrentSetStatus("initial")
            }
            else {
              //console.log("repsCompleted: " + repsCompleted + "\tcurrentSet.reps: " + currentSet.reps)

              if (repsCompleted >= currentSet.reps) {
                changeCurrentSetStatus("completed")
              }
              else if (repsCompleted > 0 && repsCompleted < currentSet.reps) {
                changeCurrentSetStatus("failed")
              }
              else
                changeCurrentSetStatus("initial")
            }

            if (!isNaN(repsCompleted)) {

              // Update the repsDone key of the currentSet
              currentSet.repsDone = repsCompleted;
              //console.log(currentSet.repsDone);
              var setsCompleted = 0;

              // Iterates through all of the setInfo again to change the number of sets completed
              props.exercise.setInfo.forEach(element => {

                // If the type is string, meaning it's a progression set like "1+"
                if (typeof element.reps === 'string' && element.repsDone >= parseInt((element.reps).replace("+", ""))) {
                  console.log("PROGRESSED")
                  setsCompleted++;
                }
                // else...
                else if (element.repsDone >= element.reps) {
                  setsCompleted++;
                }
              });

              props.exercise.setsCompleted = setsCompleted;
            }
          }, [repsCompleted])

          // When the currentSetStatus ("completed", "failed", etc.) is changed...
          React.useEffect(() => {
            //console.log(i + "\tFiring useEffect")
            currentSetBackground();
            currentSetIcon();
          }, [currentSetStatus])

          function handleSetButtonPress() {
            if (currentSetStatus == "initial") {

              // If the typeof is a string for progression sets (like "1+")
              if (typeof currentSet.reps === 'string') {
                var currentSetRepsToInteger = parseInt((currentSet.reps).replace("+", ""));
                handleChangeRepsCompleted(currentSetRepsToInteger)
                changeCurrentSetStatus("completed");
              }
              // else...
              else {
                handleChangeRepsCompleted(currentSet.reps);
                changeCurrentSetStatus("completed");
              }
            }
            else {
              handleChangeRepsCompleted(0);
              changeCurrentSetStatus("initial");
            }
          }

          return (<Box flex="1" flexDirection="row" py="0" alignItems="center" bg={i % 2 ? "white" : "muted.100"} key={i}>
            <Spacer />
            <Box width="128px">
              <Text>{currentSet.reps} reps at {RoundToNearest(props.exercise.trainingMax * currentSet.percent)} lb</Text>
              <Text color="grey" fontSize="xs">{currentSet.percent * 100}% of training max</Text>
            </Box>
            {currentSetBackground()}
            <Spacer />
            <Divider orientation='vertical' thickness="0" />
            <Spacer />
            <Box width="128px" flexDirection="row" alignItems="center" justifyContent="center">
              <Input width="48px" p="2" mx="3" value={repsCompleted + ""} onChangeText={handleChangeRepsCompleted} textAlign={"center"} focusOutlineColor="success.500" keyboardType={'numeric'}
                maxLength="3" variant="outline" bg="white" />
              {currentSetIcon()}
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
    backgroundColor: 'white',
  },
  tabIndicator: {
    backgroundColor: 'black',

  },
  tabLabel: {
    fontSize: 12,
    textTransform: 'capitalize',
    color: "black",
    margin: 0,
    padding: 0,
  },
});
