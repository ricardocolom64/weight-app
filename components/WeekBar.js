import react from 'react';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function WeekBar() {
    const [value, setValue] = useState('');
    return (
        <View style={styles.container}>
            {/* <View style={styles.weekDays}>
                <View style={[styles.day, styles.selected]}>
                    <Text>Monday</Text>
                </View>
                <View style={styles.day}>
                    <Text>Tuesday</Text>
                </View>
                <View style={styles.day}>
                    <Text>Wednesday</Text>
                </View>
                <View style={styles.day}>
                    <Text>Thursday</Text>
                </View>
                <View style={styles.day}>
                    <Text>Friday</Text>
                </View>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: 42,
        height: 80,
        paddingHorizontal: 4,
        backgroundColor: 'green',
        justifyContent: 'center',
    },
    weekDays: {
        width: 50,
        overflow: 'hidden',
        backgroundColor: 'yellow',
    },
    day: {
        fontWeight: 'bold',
    }
    // weekDays: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     backgroundColor: 'lightgray',
    //     borderRadius: 8,
    //     borderStyle: 'solid',
    //     borderColor: 'white',
    //     borderWidth: 1,
    //     paddingHorizontal: 2,
    //     height: 30,
    // },
    // selected: {
    //     backgroundColor: 'white',
    // },
    // day: {
    //     flex: 1,
    //     textAlign: 'center',
    //     fontSize: 6,
    //     borderRadius: 4,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     //backgroundColor: 'grey',
    //     textAlign: 'center',
    //     height: '80%',
    // }
})