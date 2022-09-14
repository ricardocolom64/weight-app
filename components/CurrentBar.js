import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Box, getColor, useColorMode, useColorModeValue } from 'native-base'

export default function CurrentBar() {
    return (
        <Box style={styles.container} bg={"blueGray.200"}>
            <Text>Left</Text>
            <Text>Middle</Text>
            <Text>Right</Text>
        </Box>
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
