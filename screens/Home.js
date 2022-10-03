import { StyleSheet } from 'react-native';

import DaysAndExercises from '../components/DaysAndExercises';
import WeightCalculator from '../components/WeightCalculator';

import NativeConstants from 'expo-constants';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Button, Avatar, Box, Spacer } from 'native-base';

/*
    For some reason the Stack navigator does not support custom header heights unlike the Tab navigator which is pretty dumb, so I have to make my own TopHeader...
*/

function MainHomeTopHeader({ navigation }) {
    return (
        <Box px="1" flexDir="row" alignItems="center" justifyContent="center" height="56px" borderBottomWidth={0.3} borderColor="muted.200">
            <Box>
                <Button borderRadius={"8"} padding="1" colorScheme="light" variant="ghost" onPress={() => navigation.navigate('SetWeekScreen')}>
                    <Box justifyContent="center" alignItems="center" width="190">
                        <Text fontWeight={"bold"} fontSize="md">September 24, 2022</Text>
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
        <Box px="1" flexDir="row" alignItems="center" justifyContent="center" height="56px" borderBottomWidth={0.2} borderColor="muted.200">
            <Box justifyContent="center" position="absolute" left="32px">
                <Button onPress={() => { navigation.goBack() }}>Go Back</Button>
            </Box>
            <Box>
                <Button borderRadius={"8"} padding="1" colorScheme="light" variant="ghost" m="1" onPress={() => navigation.navigate('SetWeekScreen')}>
                    <Box justifyContent="center" alignItems="center">
                        <Text fontWeight={"bold"} fontSize="md">Change the current week</Text>
                    </Box>
                </Button>
            </Box>
        </Box>
    );
}

const HomeStack = createNativeStackNavigator();

function MainHomeScreen({ navigation }) {
    return (
        <View flex="1" pt={(NativeConstants.statusBarHeight) + "px"} bg="white">
            <MainHomeTopHeader navigation={navigation} />
            <WeightCalculator />
            <DaysAndExercises />
        </View>
    );
}

function SetWeekScreen({navigation}) {
    return (
        <View flex="1" pt={NativeConstants.statusBarHeight + "px"} bg="white">
            <SetWeekTopHeader navigation={navigation} />
            <Box flex="1" justifyContent="center" alignItems="center">
                <Text>Set Week Screen here idk</Text>
            </Box>
        </View>
    )
}

export default function Home() {
    return (
        <NavigationContainer independent={true}>
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen
                    name="MainHomeScreen"
                    component={MainHomeScreen}
                />
                <HomeStack.Screen name="SetWeekScreen" component={SetWeekScreen} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}