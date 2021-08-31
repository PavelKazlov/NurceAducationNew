import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';


const ResultButton = props => {

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    // <Card  >
    <View style={{...styles.buttonContainer, ...props.style}}>
      <TouchableCmp activeOpacity={0.8} onPress={props.onPress} useForeground  >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </TouchableCmp>
    </View>
    // </Card>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 45,
    overflow: 'hidden',
    // backgroundColor: Colors.primary,
    // height: 25,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 25,
    // borderColor: '#ccc',
    // borderWidth: 3,
    // elevation: 10,

  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans'

  }
});

export default ResultButton