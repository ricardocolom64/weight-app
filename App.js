import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';

var allWeights = [45, 25, 10, 5, 2.5];
var barWeight = 45;

export default function App() {

  const [inpWeight, setInpWeight] = useState(0);
  const [weights, setWeights] = useState("");

  
  function calcWeights()
  {
    if(!inpWeight || inpWeight <= 45)
      setWeights("");
    else
    {

      var output = "";

      var onBar = (inpWeight - 45) * 0.5;
      var currAmt = 0;
      console.log(onBar);

      allWeights.forEach(currWeight => {
        while(onBar - currWeight >= 0)
        {
          onBar -= currWeight;
          currAmt++;
        }
        if(currAmt > 0)
          output += currWeight + " lb " + " x " + currAmt + "\n";

        currAmt = 0;
      });

      setWeights(output);
    }
  }

  useEffect(() => {
    calcWeights();
  }, [inpWeight]);

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss()}}>
      <View style={styles.main}>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Weight App</Text>
          </View>
          <View style={styles.inpAndOut}>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={setInpWeight}
                value={inpWeight}
                keyboardType={'numeric'}
              // placeholder="test"
              />
            </View>
            <View style={styles.output}>
              <Text style={styles.outputText}>{weights}</Text>
            </View>
            <StatusBar style="auto" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    maxHeight: '60%',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  header: {
    // backgroundColor: 'red',
  },
  headerText: {
    fontSize: '32',
    fontWeight: 'bold',
  },
  inpAndOut: {
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  output: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    minWidth: '80%',
    height: 300,
    borderWidth: 1,
    padding: 10,
  },
  outputText: {
    fontSize: 24,
    textAlign: 'center'
  }
});
