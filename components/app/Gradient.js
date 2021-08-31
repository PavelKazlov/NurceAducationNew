import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Gradient = (props) => {

  return (
    <LinearGradient
      style={{ ...styles.gradient, ...props.style }}
      // colors={['#FFF3E0', '#ECEFF1', '#CFD8DC', '#ECEFF1', '#FFF3E0']}
      // colors={['#FFF3E0',  '#CFD8DC',  '#FFF3E0']}
      colors={props.colors}
    >
      {props.children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default Gradient;
