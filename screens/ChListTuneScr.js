import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { Provider, } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import Gradient from '../components/app/Gradient';
import HeaderButton from '../components/app/HeaderButton';
import SelectStudent from '../components/user/SelectStudent';
import * as counterActions from '../store/actions/counter-actions';
import Colors from '../constants/Colors';
import Button from "../components/app/Button";
import Card from '../components/app/Card';

const windowWith = Dimensions.get('window').width;

const ChListTuneScr = props => {
  const [timer, onChangeTimer] = useState(7);
  const dispatch = useDispatch();
  const testParams = useSelector(state => state.result);

  const [maxTestTime, setMaxTestTime] = useState();
  const { getItem } = useAsyncStorage('@max_time_key');
  // await getItem(action.time);

  useEffect(() => {
    const maxTime = getItem()
      .then((result) => {
        if (result != null) {
          const time = parseFloat(result)
          setMaxTestTime(time)
        }
      })
  }, [setMaxTestTime]);


  // console.log('testParams => ', testParams);

  const onStartHandler = () => {

    if (testParams.testParams.testGroup === '' || testParams.testParams.testStudent === '') {
      alert('Выберите группу и студента!')
    } else {
      dispatch(counterActions.setTestInterval(timer));
      props.navigation.navigate('Test');
    }
  }

  return (
    <Gradient
      colors={['#FFF3E0', '#ECEFF1', '#CFD8DC', '#ECEFF1', '#FFF3E0']}

    >
      <Provider >
        <ScrollView>
        <View style={styles.selectContainer}>
          <SelectStudent />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Card style={styles.timerCardContainer}>
            <Text style={styles.timerBlockHeader}> ВРЕМЯ ВЫПОЛНЕНИЯ ТЕСТА: </Text>
            <View style={styles.counterContainer}>

              <View >
                <MaterialCommunityIcons
                  name="progress-clock"
                  size={windowWith < 500 ? 70 : 100}
                  color={Colors.timerElements}
                />
              </View>

              <View style={styles.sliderContainer}>
                <Slider
                  // style={styles.sliderContainer}
                  style={{ width: '100%', height: 40 }}
                  value={timer}
                  minimumValue={0}
                  // maximumValue={20}
                  maximumValue={maxTestTime}
                  minimumTrackTintColor='green'
                  maximumTrackTintColor="#000000"
                  step={1}
                  thumbTintColor='green'
                  // thumbTintColor={Colors.timerElements}
                  onValueChange={value => onChangeTimer(value)}
                />
              </View>

              <View style={styles.timerValueContainer}>
                <Text style={styles.timerValueText}>{timer}</Text>
              </View>
            </View>

            <View style={styles.button}>
              <Button
                title='СТАРТ'
                onPress={onStartHandler}
              />
            </View>

          </Card>
        </View>
        </ScrollView>
      </Provider >
    </Gradient>
  );


};

export const screenOptions = navData => {
  return {
    headerTitle: 'Параметры теста',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
          onPress={() => {
            navData.navigation.navigate('MainMenu');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  selectContainer: {
    marginTop: windowWith < 500 ? 20 : 50,
    marginBottom: windowWith < 500 ? 45 : 70,
    paddingHorizontal: windowWith < 500 ? 25 : 60,

  },
  timerCardContainer: {
    width: windowWith < 500 ? '90%' : '80%',
    paddingHorizontal: 5,
    paddingVertical:  windowWith < 500 ? 20 : 50,
    marginTop: windowWith < 500 ? 0 : 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerBlockHeader: {
    fontFamily: 'open-sans-bold',
    marginTop: windowWith < 500 ? 8 : 10,
    marginBottom: windowWith < 500 ? 20 : 24,
    paddingHorizontal: 7,
    fontSize: windowWith < 500 ? 16 : 24,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingTop: windowWith < 500 ? 18 : 30,
    paddingHorizontal: '20%',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: windowWith < 500 ? 8 : 10,
    paddingHorizontal: 30
  },
  // clock: {
  //   // width: '20%'
  // },
  sliderContainer: {
    width: '50%'
  },
  timerValueContainer: {
    // width: '20%',
    borderWidth: 3,
    borderColor: Colors.timerElements,
    borderRadius: 55
  },
  timerValueText: {
    height: windowWith < 500 ? 40 : 55,
    width: windowWith < 500 ? 40 : 55,
    margin: windowWith < 500 ? 10 : 15,
    fontSize: windowWith < 500 ? 28 : 40,
    textAlign: 'center',
  },
});

export default ChListTuneScr;
