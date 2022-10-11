import * as React from 'react';

import DaysAndExercises from '../components/DaysAndExercises';
import WeightCalculator from '../components/WeightCalculator';

import NativeConstants from 'expo-constants';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, Avatar, Box, Spacer, Pressable } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const defaultAllWeeks = [
    {
        mondayDate: "October 3, 2022",
        id: 0,
        exercises: []
    },
    {
        mondayDate: "October 10, 2022",
        id: 1,
        exercises: [
            {
                "name": "Bench",
                "nameInternal": "BenchMonday",
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
                "name": "Overhead Press",
                "nameInternal": "OverheadPressMonday",
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

export default function Home() {

    const [allWeeks, changeAllWeeks] = React.useState(defaultAllWeeks)

    const [week, changeWeek] = React.useState(allWeeks[allWeeks.length - 1])


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
                <MainHomeTopHeader navigation={navigation} week={week}/>
                <WeightCalculator />
                <DaysAndExercises week={week}/>
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
                    <Text color="grey" fontSize="xs" mx="3" my="1">CURRENT WEEK</Text>
                    <Pressable width="100%" height="48px" justifyContent="center">
                        {({
                            isHovered,
                            isPressed,
                            isFocused
                        }) => {
                            return <Box width="100%" height="48px" justifyContent="center" bg={isPressed ? "coolGray.200" : "white"} borderTopWidth="0.5" borderBottomWidth="0.5" borderColor="muted.300">
                                <Box flexDir="row" mx="3">
                                    <Text>October 10, 2022</Text>
                                    <Spacer />
                                    <Text>__%</Text>
                                </Box>
                            </Box>
                        }}
                    </Pressable>
                    <Spacer />
                    <Text color="grey" fontSize="xs" mx="3" my="1">PAST WEEKS</Text>
                    <Box bg="white" borderTopWidth="0.5" borderBottomWidth="0.5" borderColor="muted.300">
                        <Box width="100%" height="48px" justifyContent="center" bg="white">
                            <Box flexDir="row" mx="3">
                                <Text>October 3, 2022</Text>
                            </Box>
                        </Box>
                        <Box width="100%" height="48px" justifyContent="center" bg="muted.100">
                            <Box flexDir="row" mx="3">
                                <Text>September 26, 2022</Text>
                            </Box>
                        </Box>
                        <Box width="100%" height="48px" justifyContent="center" bg="white">
                            <Box flexDir="row" mx="3">
                                <Text>September 19, 2022</Text>
                            </Box>
                        </Box>
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