import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import CurrentBar from './CurrentBar'
import DaysAndExercises from './DaysAndExercises'
import WeekBar from './WeekBar'

export default function TopBar() {
    return (
        <View style={styles.container}>
            <CurrentBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
    },
    example: {
        padding: 0,
        height: '100%',
    }
})