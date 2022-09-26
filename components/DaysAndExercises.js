import * as React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Pressable, Text, Box, HStack, Spacer, ScrollView, Center, NativeBaseProvider, Button, Divider, Input, IconButton, CheckIcon, CloseIcon, Icon, ArrowForwardIcon } from "native-base";
import Constants from 'expo-constants';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import BenchExercise from './BenchExercise';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

const MondayRoute = ({ navigation }) => (
  <View style={[styles.container]}>
    <ScrollView style={styles.dayExercises}>
      <BenchExercise navigation={navigation} />
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

function DaysAndExercisesScreen({ navigation }) {

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
        return <MondayRoute navigation={navigation} />;
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

function DetailsScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <Box flex="1" alignItems="center" marginBottom={2} marginX={"6px"} bg="white" rounded="8" shadow={0} borderWidth="1" borderColor="coolGray.300">
        <Box alignItems="center" justifyContent="center" height="48px" width="100%">
          <Text fontWeight={"bold"} fontSize="md">Bench</Text>
          <Button size="xs" position="absolute" left="2px" borderRadius={"8"} p="2" colorScheme="light" variant="ghost" onPress={navigation.goBack}>
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
          <Box flexDirection="row" m="4" my="2" alignItems="center">
            <Text>Training Max</Text>
            <Spacer />
            <Box flexDirection="row" alignItems="center" justifyContent="center">
              <Input width="72px" p="2" pr="0" textAlign={"center"} keyboardType={'numeric'}
                maxLength="4" InputRightElement={<Text mx="2">lb</Text>} mr="2" />
              <MaterialCommunityIcons name={"information"} size={18} />
            </Box>
          </Box>
          <Box flex="1" alignItems="center">
            <Box flexDirection="row" my="1" alignItems="center">
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
            <Box alignItems="center">
              <Box flexDirection="row" py="1" alignItems="center" bg="muted.100">
                <Spacer />
                <Box width="128px">
                  <Text>8 reps at 190 lb</Text>
                  <Text color="grey" fontSize="xs">65% of training max</Text>
                </Box>
                <Box width="2px" height="47px" position="absolute" left="0px" bg="success.500" />
                <Spacer />
                <Divider orientation='vertical' thickness="0" />
                <Spacer />
                <Box width="128px" flexDirection="row" alignItems="center" justifyContent="center">
                  <Input width="48px" p="2" mx="3" textAlign={"center"} focusOutlineColor="success.500" keyboardType={'numeric'}
                    maxLength="3" variant="outline" bg="white" />
                  <IconButton position="absolute" right="-36px" size="md" icon={<CheckIcon color="success.500" />} />
                </Box>
                <Spacer />
              </Box>

              <Box flexDirection="row" py="1" alignItems="center" bg="white">
                <Spacer />
                <Box width="128px">
                  <Text>8 reps at 190 lb</Text>
                  <Text color="grey" fontSize="xs">65% of training max</Text>
                </Box>
                <Box width="2px" height="47px" position="absolute" left="0px" bg="success.500" />
                <Spacer />
                <Divider orientation='vertical' thickness="0" />
                <Spacer />
                <Box width="128px" flexDirection="row" alignItems="center" justifyContent="center">
                  <Input width="48px" p="2" mx="3" textAlign={"center"} focusOutlineColor="success.500" keyboardType={'numeric'}
                    maxLength="3" variant="outline" bg="white" />
                  <IconButton position="absolute" right="-36px" size="md" icon={<CheckIcon color="success.500" />} />
                </Box>
                <Spacer />
              </Box>

              <Box flexDirection="row" py="1" alignItems="center" bg="muted.100">
                <Spacer />
                <Box width="128px">
                  <Text>8 reps at 190 lb</Text>
                  <Text color="grey" fontSize="xs">65% of training max</Text>
                </Box>
                <Box width="2px" height="47px" position="absolute" left="0px" bg="danger.500" />
                <Spacer />
                <Divider orientation='vertical' thickness="0" />
                <Spacer />
                <Box width="128px" flexDirection="row" alignItems="center" justifyContent="center">
                  <Input width="48px" p="2" mx="3" textAlign={"center"} focusOutlineColor="success.500" keyboardType={'numeric'}
                    maxLength="3" variant="outline" bg="white" />
                  <IconButton position="absolute" right="-36px" size="md" icon={<CloseIcon color="danger.500" />} />
                </Box>
                <Spacer />
              </Box>

              <Box flexDirection="row" py="1" alignItems="center" bg="white">
                <Spacer />
                <Box width="128px">
                  <Text>8 reps at 190 lb</Text>
                  <Text color="grey" fontSize="xs">65% of training max</Text>
                </Box>
                {/* <Box position="absolute" left="8px" >
                  <MaterialCommunityIcons name="arrow-right-thin" size={24} color="black" />
                </Box> */}
                <Box width="2px" height="47px" position="absolute" left="0px" bg="muted.300" />
                <Spacer />
                <Divider orientation='vertical' thickness="0" />
                <Spacer />
                <Box width="128px" flexDirection="row" alignItems="center" justifyContent="center">
                  <Input width="48px" p="2" mx="3" textAlign={"center"} focusOutlineColor="success.500" keyboardType={'numeric'}
                    maxLength="3" variant="outline" bg="white" />
                  <IconButton position="absolute" right="-36px" size="md" icon={<CheckIcon color="muted.300" />} />
                </Box>
                <Spacer />
              </Box>

              <Box flexDirection="row" py="1" alignItems="center" bg="muted.100">
                <Spacer />
                <Box width="128px">
                  <Text>8 reps at 190 lb</Text>
                  <Text color="grey" fontSize="xs">65% of training max</Text>
                </Box>
                <Spacer />
                <Divider orientation='vertical' thickness="0" />
                <Spacer />
                <Box width="128px" flexDirection="row" alignItems="center" justifyContent="center">
                  <Input width="48px" p="2" mx="3" textAlign={"center"} focusOutlineColor="success.500" keyboardType={'numeric'}
                    maxLength="3" variant="outline" bg="white" />
                  <IconButton position="absolute" right="-36px" size="md" icon={<CheckIcon color="muted.300" />} />
                </Box>
                <Spacer />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
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
