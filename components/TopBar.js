import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import CurrentBar from './CurrentBar'
import DaysAndExercises from './DaysAndExercises'

export default function TopBar() {
    return (
        <CurrentBar style={styles.container}/>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        borderWidth: 5,
    },
})