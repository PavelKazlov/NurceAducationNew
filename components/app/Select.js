import { Provider, Surface } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, } from "react-native";
import DropDown from "react-native-paper-dropdown";


// function Select(label, mode, visible, showDropDown, onDismiss, value, setValue, list, dropDownContainerHeight) {
function Select(props) {
  // console.log('props=> ', props);
 

  return (
    <DropDown
      // label={props.label}
      // mode={props.mode}
      // visible={props.visible}
      // showDropDown={props.showDropDown}
      // onDismiss={props.onDismiss}
      // value={props.value}
      // setValue={props.setValue}
      // list={props.list}
      // dropDownContainerHeight={100}
      {...props}
      activeColor={'red'}
      dropDownStyle={styles.dropDown}
      dropDownItemSelectedTextStyle={styles.textStyle}
      dropDownItemTextStyle={styles.textStyle}
    />
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 24
  },
  dropDown: {
    marginTop: -10,
  },

});

export default Select;