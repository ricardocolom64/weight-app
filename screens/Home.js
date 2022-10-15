import * as React from 'react';

import DaysAndExercises from '../components/DaysAndExercises';
import WeightCalculator from '../components/WeightCalculator';

import NativeConstants from 'expo-constants';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, Avatar, Box, Spacer, Pressable } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalExerciseDefs } from '../components/AllExercises'

const defaultAllWeeks = [
    {
        mondayDate: "September 26, 2022",
        week_id: 0,
        exercises: [
            {
                "name": "Bench Sep 26",
                "nameInternal": "DummyOne",
                "id": 0,
                "dayOfWeek": "Monday",
                "trainingMax": 290,
                "setInfo": [
                    {
                        "reps": 8,
                        "percent": 0.65,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.75,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.85,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.85,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.85,
                        "repsDone": 0
                    },
                    {
                        "reps": 5,
                        "percent": 0.8,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.75,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": "8+",
                        "percent": 0.65,
                        "repsDone": 0
                    }
                ],
                "setsCompleted": 0
            },
            {
                "name": "OHP Sep 26",
                "nameInternal": "DummyTwo",
                "id": 1,
                "dayOfWeek": "Monday",
                "trainingMax": 175,
                "setInfo": [
                    {
                        "reps": 6,
                        "percent": 0.5,
                        "repsDone": 0
                    },
                    {
                        "reps": 5,
                        "percent": 0.6,
                        "repsDone": 0
                    },
                    {
                        "reps": 3,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 5,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 7,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 8,
                        "percent": 0.7,
                        "repsDone": 0
                    }
                ],
                "setsCompleted": 0
            }
        ]
    },
    {
        mondayDate: "October 3, 2022",
        week_id: 1,
        exercises: [
            {
                "name": "Bench Oct 3",
                "nameInternal": "DummyOne",
                "id": 0,
                "dayOfWeek": "Monday",
                "trainingMax": 290,
                "setInfo": [
                    {
                        "reps": 8,
                        "percent": 0.65,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.75,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.85,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.85,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.85,
                        "repsDone": 0
                    },
                    {
                        "reps": 5,
                        "percent": 0.8,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.75,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": "8+",
                        "percent": 0.65,
                        "repsDone": 0
                    }
                ],
                "setsCompleted": 0
            },
            {
                "name": "OHP Oct 3",
                "nameInternal": "DummyTwo",
                "id": 1,
                "dayOfWeek": "Monday",
                "trainingMax": 175,
                "setInfo": [
                    {
                        "reps": 6,
                        "percent": 0.5,
                        "repsDone": 0
                    },
                    {
                        "reps": 5,
                        "percent": 0.6,
                        "repsDone": 0
                    },
                    {
                        "reps": 3,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 5,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 7,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 8,
                        "percent": 0.7,
                        "repsDone": 0
                    }
                ],
                "setsCompleted": 0
            }
        ]
    },
    {
        mondayDate: "October 10, 2022",
        week_id: -1,
        exercises: [
            {
                "name": "Bench Oct 10",
                "nameInternal": "DummyOne",
                "id": 0,
                "dayOfWeek": "Monday",
                "trainingMax": 290,
                "setInfo": [
                    {
                        "reps": 8,
                        "percent": 0.65,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.75,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.85,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.85,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.85,
                        "repsDone": 0
                    },
                    {
                        "reps": 5,
                        "percent": 0.8,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.75,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": "8+",
                        "percent": 0.65,
                        "repsDone": 0
                    }
                ],
                "setsCompleted": 0
            },
            {
                "name": "OHP Oct 10",
                "nameInternal": "DummyTwo",
                "id": 1,
                "dayOfWeek": "Monday",
                "trainingMax": 175,
                "setInfo": [
                    {
                        "reps": 6,
                        "percent": 0.5,
                        "repsDone": 0
                    },
                    {
                        "reps": 5,
                        "percent": 0.6,
                        "repsDone": 0
                    },
                    {
                        "reps": 3,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 5,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 7,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 4,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 6,
                        "percent": 0.7,
                        "repsDone": 0
                    },
                    {
                        "reps": 8,
                        "percent": 0.7,
                        "repsDone": 0
                    }
                ],
                "setsCompleted": 0
            }
        ]
    },
]

function calcExercises(day) {
    console.log("Calculating exercises for " + day + ": ")

    var result = [];

    globalExerciseDefs.forEach(globalExerciseDefElement => {
        if (globalExerciseDefElement.dayOfWeek == day) {

            const defaultExerciseInfo = { name: "", nameInternal: "", id: 0, dayOfWeek: "", trainingMax: 0, setInfo: [], setsCompleted: 0 };

            var thisDayExercise = defaultExerciseInfo;
            thisDayExercise.name = globalExerciseDefElement.name;
            thisDayExercise.nameInternal = globalExerciseDefElement.nameInternal;
            thisDayExercise.id = globalExerciseDefElement.id;
            thisDayExercise.dayOfWeek = globalExerciseDefElement.dayOfWeek;
            thisDayExercise.trainingMax = globalExerciseDefElement.trainingMax;

            var toThisDaySetInfo = [];

            // Iterates through the globalExerciseDefs to populate this day's setInfo with the necessarry "reps", "percent" and adds a "done" of 0.
            globalExerciseDefElement.setInfoDefs.forEach(globalSetInfoDefElement => {

                const defaultSetInfoElement = { reps: 0, percent: 0.00, repsDone: 0 };

                var thisDaySetInfoElement = defaultSetInfoElement;

                thisDaySetInfoElement.reps = globalSetInfoDefElement.reps;
                thisDaySetInfoElement.percent = globalSetInfoDefElement.percent;

                toThisDaySetInfo.push(thisDaySetInfoElement)
            });

            thisDayExercise.setInfo = toThisDaySetInfo;

            result.push(thisDayExercise);

            console.log("\t-> " + thisDayExercise.name + "... ")
        }
    });

    console.log("")

    return result;
}

export default function Home() {

    const [allWeeks, changeAllWeeks] = React.useState(defaultAllWeeks)

    const [week, changeWeek] = React.useState(defaultAllWeeks[defaultAllWeeks.length - 1])

    function populateWeek() {

        const defaultWeek = { mondayDate: "", week_id: -1, exercises: [] }

        var result = defaultWeek;

        result.mondayDate = "October 10, 2022"

        result.week_id = allWeeks.length - 1;

        var exercises = [];

        calcExercises("Monday").forEach(element => {
            exercises.push(element);
        });

        calcExercises("Tuesday").forEach(element => {
            exercises.push(element);
        });

        calcExercises("Wednesday").forEach(element => {
            exercises.push(element);
        });

        calcExercises("Thursday").forEach(element => {
            exercises.push(element);
        });

        calcExercises("Friday").forEach(element => {
            exercises.push(element);
        });

        //console.log(JSON.stringify(result, null, 4));

        result.exercises = exercises;

        console.log(JSON.stringify(result, null, 4));

        return result;
    }

    function renderDaysAndExercises() {
        console.log("Week ID: " + week.week_id)

        // if (week.exercises.length == 2)
        //     changeWeek(populateWeek());
        // else
        //     return (<DaysAndExercises week={week} />)

        return (<DaysAndExercises week={week} />)
    }

    //   For some reason the Stack navigator does not support custom header heights unlike the Tab navigator so I have to make my own TopHeader...

    function MainHomeTopHeader(props) {
        return (
            <Box px="1" flexDir="row" alignItems="center" justifyContent="center" height="56px" borderBottomWidth={0.3} borderColor="muted.200" bg="white">
                <Box>
                    <Button borderRadius={"8"} padding="1" colorScheme="light" variant="ghost" onPress={() => props.navigation.navigate('SetWeekScreen')}>
                        <Box justifyContent="center" alignItems="center" width="190">
                            <Text fontWeight={"bold"} fontSize="md">{props.week.mondayDate}</Text>
                            <Text fontSize="xs" color="grey">(Current)</Text>
                        </Box>
                    </Button>
                </Box>
                <Box justifyContent="center" position="absolute" right="32px">
                    <Avatar bg="black" size={"sm"}>R</Avatar>
                </Box>
            </Box>
        );
    }

    function SetWeekTopHeader({ navigation }) {
        return (
            <Box px="1" flexDir="row" alignItems="center" justifyContent="center" height="56px" borderBottomWidth={0.2} borderColor="muted.200" bg="white">
                <Button size="xs" position="absolute" left="0px" bottom="4px" borderRadius={"8"} p="2" colorScheme="light" variant="ghost" onPress={() => { navigation.goBack() }}>
                    <Box flexDir={"row"} alignItems="center" justifyContent={"center"} width="92px" height="28px">
                        <Box position="absolute" left="-6px" flexDirection={"row"} alignItems="center" justifyContent="center">
                            <MaterialCommunityIcons name={"chevron-left"} size={32} />
                            <Text fontSize={18} lineHeight="20px" left="-2px">Back</Text>
                        </Box>
                    </Box>
                </Button>
                <Box>
                    <Box justifyContent="center" alignItems="center">
                        <Text fontWeight={"bold"} fontSize="md">Manage Week</Text>
                    </Box>
                </Box>
            </Box>
        );
    }

    const HomeStack = createNativeStackNavigator();

    function MainHomeScreen({ navigation }) {
        return (
            <View flex="1">
                <Box height={NativeConstants.statusBarHeight + "px"} bg="white" />
                <MainHomeTopHeader navigation={navigation} week={week} />
                <WeightCalculator />
                {renderDaysAndExercises()}
            </View>
        );
    }

    function SetWeekScreen({ navigation }) {
        return (
            <View flex="1" bg="light">
                <Box height={NativeConstants.statusBarHeight + "px"} bg="white" />
                <SetWeekTopHeader navigation={navigation} />
                <Box flex="1">
                    <Spacer />
                    <Text color="grey" fontSize="xs" mx="3" my="1">LATEST WEEK</Text>
                    <Pressable onPress={() => changeWeek(allWeeks[allWeeks.length - 1])}>
                        {({
                            isHovered,
                            isPressed,
                            isFocused
                        }) => {
                            return <Box width="100%" height="48px" justifyContent="center" bg={isPressed ? "coolGray.200" : "white"} borderTopWidth="0.5" borderBottomWidth="0.5" borderColor="muted.300">
                                <Box flexDir="row" mx="3">
                                    <Text>{allWeeks[allWeeks.length - 1].mondayDate}</Text>
                                    <Spacer />
                                    <Text>__%</Text>
                                </Box>
                            </Box>
                        }}
                    </Pressable>
                    <Spacer />
                    <Text color="grey" fontSize="xs" mx="3" my="1">PAST WEEKS</Text>
                    <Box bg="white" borderTopWidth="0.5" borderBottomWidth="0.5" borderColor="muted.300" flexDir="column-reverse">
                        {allWeeks.map((curr, i) => {
                            if (i != allWeeks.length - 1) {
                                return (
                                    <Pressable onPress={() => changeWeek(curr)} key={i}>
                                        {({
                                            isHovered,
                                            isPressed,
                                            isFocused
                                        }) => {
                                            return <Box width="100%" height="48px" justifyContent="center" bg={isPressed ? "coolGray.200" : "white"}>
                                                <Box flexDir="row" mx="3">
                                                    <Text>{curr.mondayDate}</Text>
                                                </Box>
                                            </Box>
                                        }}
                                    </Pressable>)
                            }
                        })}
                    </Box>
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <Spacer />
                </Box>
            </View>
        )
    }

    return (
        <NavigationContainer independent={true}>
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name="MainHomeScreen" component={MainHomeScreen} />
                <HomeStack.Screen name="SetWeekScreen" component={SetWeekScreen} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}