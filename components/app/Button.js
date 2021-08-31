import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import CustomText from "./CustomText";
import Colors from '../../constants/Colors';
import { View } from "react-native";

const windowWith = Dimensions.get('window').width;

export default function Button({
  style,
  titleStyle,
  isLoading = false,
  disabled,
  title = "",
  ...props
}) {
  const shouldDisable = !!isLoading || !!disabled;
 
  return (
    <TouchableOpacity
      activeOpacity={shouldDisable ? 0.6 : 0.8}
      style={[styles.container, shouldDisable && styles.disabledState, style]}
      {...props}
      disabled={shouldDisable}
    >
      {props.children}
      {!!isLoading ? (
        <ActivityIndicator size="small" color={Colors.black} />
      ) : (
        <CustomText bold style={[styles.title, titleStyle]}>{title}</CustomText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.buttonOrange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  title: {
    // fontSize: 16,
    fontSize: windowWith < 500 ? 14 : 22,
    textTransform: "uppercase",
    textAlign: "center",
  },
  disabledState: {
    opacity: 0.5
  },
});
