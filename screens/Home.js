import { StyleSheet, Text, View } from 'react-native';

import DaysAndExercises from '../components/DaysAndExercises';
import WeightCalculator from '../components/WeightCalculator';

export default function Home() {
    return (
        <View style={styles.main}>
            <WeightCalculator />
            <DaysAndExercises />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#F0F0F0",
    },
});