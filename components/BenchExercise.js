import React from 'react'

import { Pressable, Text, Box, HStack, VStack, Spacer, Progress, Center, NativeBaseProvider, ChevronRightIcon } from "native-base";

export default function BenchExercise() {
    return (
        <Box alignItems="center" marginBottom={2}>
            <Pressable width="100%">
                {({
                    isHovered,
                    isPressed,
                    isFocused
                }) => {
                    return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "white"} p="5" rounded="8" shadow={0} borderWidth="1" borderColor="coolGray.300">
                        <HStack alignItems="center" borderWidth="0">
                            <VStack>
                                <Text color="coolGray.800" fontWeight="medium" fontSize="md" lineHeight="xs">
                                    Bench
                                </Text>
                                <Text fontSize="sm" color="coolGray.400">
                                    0 of 9 sets finished
                                </Text>
                            </VStack>
                            <Spacer />
                            <Text fontSize={10} color="coolGray.800">
                                <ChevronRightIcon color="coolGray.300"/>
                            </Text>
                        </HStack>

                        <Progress bg="coolGray.300" mt="1" size="xs" value={45} _filledTrack={{ bg: "success.500" }} />
                    </Box>;
                }}
            </Pressable>
        </Box>
    )
}
