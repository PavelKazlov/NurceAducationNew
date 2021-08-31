import React from "react";
import { StyleSheet, View, Switch } from "react-native";
import CustomText from "./CustomText";
import Colors from '../../constants/Colors';

export default function CustomSwitch({ label, ...props }) {
  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>{label}</CustomText>
      <Switch
        trackColor={{ false: Colors.grey, true: Colors.black }}
        thumbColor={Colors.orange}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5
  },
  label: {
    fontSize: 16,
    marginRight: 15,
  },
});
