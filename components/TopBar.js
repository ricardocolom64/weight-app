import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Box } from 'native-base'

export default function TopBar() {
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
        width: "100%",
        alignItems: 'center',
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: "1",
    }
})