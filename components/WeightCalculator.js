import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

var allWeights = [45, 25, 10, 5, 2.5];
var barWeight = 45;

export default function WeightCalculator() {
    const [inpWeight, setInpWeight] = useState(0);
    const [weights, setWeights] = useState("");


    function calcWeights() {
        if (!inpWeight || inpWeight <= 45)
            setWeights("");
        else {

            var output = "";

            var onBar = (inpWeight - 45) * 0.5;
            var currAmt = 0;
            console.log(onBar);

            allWeights.forEach(currWeight => {
                while (onBar - currWeight >= 0) {
                    onBar -= currWeight;
                    currAmt++;
                }
                if (currAmt > 0)
                    output += currWeight + " lb " + " x " + currAmt + "\n";

                currAmt = 0;
            });

            if(output.length > 1)
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
                <View style={styles.mainContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Weight Calculator</Text>
                    </View>
                    <View style={styles.inpAndOut}>
                        <View style={styles.output}>
                            <Text style={styles.outputText}>{weights}</Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setInpWeight}
                                value={inpWeight}
                                keyboardType={'numeric'}
                            // placeholder="test"
                            />
                        </View>
                    </View>
                </View>
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
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
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
        width: 100,
        margin: 6,
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 8,
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
    }
});
