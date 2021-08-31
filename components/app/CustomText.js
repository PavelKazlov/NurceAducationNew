import React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from '../../constants/Colors';

export default function CustomText({ style, bold = false, ...props }) {
  return (
    <Text style={[styles.text, !!bold && styles.bold, style]} {...props} />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: "RedHatDisplay_400Regular",
    color: Colors.black,
  },
  bold: {
    fontFamily: "RedHatDisplay_700Bold",
  },
});
