import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function CurrentBar() {
    return (
        <View style={styles.container}>
            <Text>Left</Text>
            <Text>Middle</Text>
            <Text>Right</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 52,
        alignItems: 'center',
        paddingHorizontal: 10,
    }
})
