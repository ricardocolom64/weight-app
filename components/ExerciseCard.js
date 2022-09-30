import React from 'react'

import { NavigationContainer } from '@react-navigation/native';

import { Pressable, Text, Box, HStack, VStack, Spacer, Progress, Center, NativeBaseProvider, ChevronRightIcon, Button, Divider, Input, IconButton, CheckIcon, CloseIcon, ArrowForwardIcon } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function calcPercent(done, total) {
    var result = (done / total) * 100;

    return result;
}

export default function ExerciseCard(props) {

    return (
        <Box alignItems="center" marginBottom={2}>
            <Pressable width="100%" onPress={() => props.navigation.navigate('DetailsScreen', { exercise: props.exercise })}>
                {({
                    isHovered,
                    isPressed,
                    isFocused
                }) => {
                    return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "white"} p="5" rounded="8" shadow={0} borderWidth="1" borderColor="coolGray.300">
                        <HStack alignItems="center" borderWidth="0">
                            <VStack>
                                <Text color="coolGray.800" fontWeight="medium" fontSize="md" lineHeight="xs">
                                    {props.exercise.name + ""}
                                </Text>
                                <Text fontSize="sm" color="coolGray.400">
                                    {props.exercise.setsCompleted} of {props.exercise.setInfo.length} sets finished
                                </Text>
                            </VStack>
                            <Spacer />
                            <Text fontSize={10} color="coolGray.800">
                                <ChevronRightIcon color="coolGray.300" />
                            </Text>
                        </HStack>

                        <Progress bg="coolGray.300" mt="1" size="xs" value={calcPercent(props.exercise.setsCompleted, props.exercise.setInfo.length)} _filledTrack={{ bg: "success.500" }} />
                    </Box>;
                }}
            </Pressable>
        </Box>
    )
}
