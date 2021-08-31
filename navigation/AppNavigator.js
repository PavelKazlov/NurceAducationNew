import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Platform, Dimensions, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {  Ionicons } from '@expo/vector-icons';

import MainMenuScreen, { screenOptions as mainMenuScreenOptions } from '../screens/MainMenuScr';
import InstructionsScreen, { screenOptions as instructionsScreenOptions } from '../screens/InstructionsScr';
import ChListOverviewScreen, { screenOptions as chListOverviewScreenOptions } from '../screens/ChListOverviewScr';
import ChListTuneScreen, { screenOptions as chListTuneScreenOptions } from '../screens/ChListTuneScr';
import TestScreen, { screenOptions as testScreenOptions } from '../screens/TestScr';
import ResultScreen, { screenOptions as resultScreenOptions } from '../screens/ResultScr';
import PDFViewScreen, { screenOptions as pDFViewScreenOptions } from '../screens/PDFViewScreen';
import SettingsScreen, { screenOptions as settingsScreenOptions } from '../screens/SettingScr';
import DevScreen, { screenOptions as devScreenOptions } from '../screens/DevScr';
import Card from '../components/app/Card';
import Colors from '../constants/Colors';

const windowWith = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
    fontSize: windowWith < 500 ? 20 : 28,
    // fontSize: 26,
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};


const ChListStackNavigator = createStackNavigator();

const CeckListsStackNavigator = () => {
  // export const ProductsNavigator = () => {
  return (
    <ChListStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ChListStackNavigator.Screen
        name="MainMenu"
        component={MainMenuScreen}
        options={mainMenuScreenOptions}
      />
      <ChListStackNavigator.Screen
        name="Instructions"
        component={InstructionsScreen}
        options={instructionsScreenOptions}
      />
      <ChListStackNavigator.Screen
        name="ChListOverview"
        component={ChListOverviewScreen}
        options={chListOverviewScreenOptions}
      />
      <ChListStackNavigator.Screen
        name="ChListTune"
        component={ChListTuneScreen}
        options={chListTuneScreenOptions}
      />
      <ChListStackNavigator.Screen
        name="Test"
        component={TestScreen}
        options={testScreenOptions}
      />
      <ChListStackNavigator.Screen
        name="Result"
        component={ResultScreen}
        options={resultScreenOptions}
      />
      <ChListStackNavigator.Screen
        name="PDF"
        component={PDFViewScreen}
        options={pDFViewScreenOptions}
      />
      <ChListStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
      <ChListStackNavigator.Screen
        name="DevView"
        component={DevScreen}
        options={devScreenOptions}
      />
    </ChListStackNavigator.Navigator>
  );
};



const drawerNavigator = createDrawerNavigator();


export const AppDrawerNavigator = () => {

  return (
    <drawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <View style={styles.mainContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    Приложение "Мед-Тест" предназначено для оценки качества практической подготовки
                    учащихся медицинских образовательных учереждений в области выполнения
                    терапевтических лечебных и диагностических манипуляций.
                  </Text>
                </View>
                <Card style={styles.cardContainer} >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => { props.navigation.navigate('DevView') }}
                  >
                    <View style={styles.devContainer}>
                      <Text style={styles.devText}>&copy; C.S.F.S. - 2021</Text>
                      {/* <Text style={styles.devText}>revat_2000@mail.ru</Text> */}
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
              {/* <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  // openLink
                  // dispatch(authActions.logout());
                  props.navigation.navigate('DevView');
                }}
              /> */}
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontFamily: 'RedHatDisplay_700Bold',
          fontSize: windowWith < 500 ? 22 : 28,
        }
      }}
    >
      <drawerNavigator.Screen
        name="Мед-Тест"
        component={CeckListsStackNavigator}
        options={{
          drawerIcon: props => (
            // <FontAwesome5 name="clinic-medical" size={windowWith < 500 ? 20 : 24} color={props.color} />
            <Ionicons name='pulse-outline' size={windowWith < 500 ? 24 : 30} color={props.color} />
          )
        }}
      />

    </drawerNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: windowWith < 500 ? windowHeight / 1.33 : windowHeight / 1.15, 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoContainer: {
    marginHorizontal: windowWith < 500 ? 7 : 15,
    paddingTop: windowWith < 500 ? 7 : 15,
  },
  infoText: {
    fontFamily: 'RedHatDisplay_400Regular',
    fontSize: windowWith < 500 ? 16 : 22,
    textAlign: 'left',
    color: Colors.blue_grey_lighten,
    paddingLeft: 15,
    marginVertical: 10
  },
  cardContainer: {
    marginTop: 20
  },
  devContainer: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  devText: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: windowWith < 500 ? 18 : 24,
    textAlign: 'center',
    color: Colors.blue_grey_lighten,
    padding: 5
  },
})



export default CeckListsStackNavigator;