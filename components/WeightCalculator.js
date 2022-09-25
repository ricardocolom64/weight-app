import React from 'react'
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Box, Input, Text, InputGroup, InputRightAddon, Button, useColorMode, useColorModeValue } from 'native-base';

var allWeights = [45, 25, 10, 5, 2.5];
var barWeight = 45;

const lightBorder = "#D4D4D4";
const darkBorder = "#404040";

const lightBg = "#F5F5F5";
const darkBg = "#262626";

export default function WeightCalculator() {

    const defWeightAmts = [
        {type: 45, amt: 0},
        {type: 25, amt: 0},
        {type: 10, amt: 0},
        {type: 5, amt: 0},
        {type: 2.5, amt: 0},
    ]

    

    const [inpWeight, setInpWeight] = useState(0);
    const [weights, setWeights] = useState("");

    const [weightAmts, setWeightAmts] = useState(defWeightAmts);

    const {
        colorMode,
        toggleColorMode
    } = useColorMode();


    function calcWeights() {
        if (!inpWeight || inpWeight <= barWeight)
            setWeights("");
        else {

            var output = "";

            var onBar = (inpWeight - barWeight) * 0.5;
            var currAmt = 0;

            allWeights.forEach(currWeight => {
                while (onBar - currWeight >= 0) {
                    onBar -= currWeight;
                    currAmt++;
                }
                if (currAmt > 0)
                    output += currWeight + " lb " + " x " + currAmt + "\n";

                currAmt = 0;
            });

            console.log(weightAmts[0]);

            if (output.length > 1)
                output = output.substring(0, output.length - 1)

            setWeights(output);
        }
    }

    useEffect(() => {
        calcWeights();
    }, [inpWeight]);

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.main}>
                <Box style={styles.mainContent} bg={useColorModeValue("white", "#151e31")} rounded="8" shadow={0} borderWidth="1" borderColor="coolGray.300">
                    <View style={styles.header} borderColor={useColorModeValue(lightBorder, darkBorder)}>
                        {/* <Button onPress={toggleColorMode}>Toggle</Button> */}
                        <Box flexDirection={"row"} alignItems="center">
                            <Box backgroundColor="muted.400" borderWidth="1" width={280} height={1.5} borderRadius="2"/>
                            <Box backgroundColor="muted.400" borderWidth="1" width={1.5} height={5} position="absolute" left={"60px"}/>
                            <Box backgroundColor="muted.400" borderWidth="1" width={1.5} height={5} position="absolute" right={"60px"}/>
                        </Box>
                    </View>
                    <View style={styles.inpAndOut}>
                        <View style={styles.output} borderColor={useColorModeValue(lightBorder, darkBorder)}>
                            <Text style={[styles.outputText, { color: useColorModeValue("black", "white") }]}>{weights}</Text>
                        </View>
                        <View style={styles.input}>
                            <InputGroup position={"absolute"} right={0}>
                                <Input
                                    w="100%"
                                    h="100%"
                                    variant={"outline"}
                                    textAlign={"center"}
                                    onChangeText={setInpWeight}
                                    value={inpWeight}
                                    keyboardType={'numeric'}
                                />
                                <InputRightAddon children={"lb"} bgColor={useColorModeValue(lightBg, darkBg)} borderColor={useColorModeValue(lightBorder, darkBorder)} />
                            </InputGroup>
                        </View>
                    </View>
                </Box>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        margin: 6,
        maxHeight: 240,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
        margin: 6,
        borderWidth: 1,
        borderRadius: 8,
    },
    headerText: {
        fontSize: '16',
        display: 'none',
    },
    inpAndOut: {
        //borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 40,
    },
    output: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 6,
        width: 154,
        height: 90,
        borderWidth: 1,
        borderRadius: 8,
    },
    outputText: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: "0",
    }
});
