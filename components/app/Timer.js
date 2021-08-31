import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import Colors from '../../constants/Colors';

const windowWith = Dimensions.get('window').width;

const renderTime = (dimension, time) => {
  return (
    <View >
      <Text style={{ fontSize: 26 }} >{time}</Text>
      {/* <Text style={{ fontSize: 18 }}>{dimension}</Text> */}
    </View>
  );
};


const Timer = (props) => {
  // console.log('props timer = >', props.props);
  // const finaleGrade = props.finaleGrade;
  const finaleGrade = useSelector(state => state.result.finaleGrade);
  const testInterval = useSelector(state => state.testTime.testInterval);
  // const testInterval = useSelector(state => state.result.testInterval);
  const hourSeconds = 36000;
  const minuteSeconds = 60;
  const remainingTime = testInterval;
  const [isPlaying, setIsPlaying] = useState(true)
  const [sound, setSound] = useState();
  const timerProps = {
    isPlaying: isPlaying,
    size: 60,
    strokeWidth: 6,
  };
  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;



  // async function playSound() {
  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/finish.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  };

  const onCompletehandler = (totalElapsedTime) => {
    [
      remainingTime - totalElapsedTime > minuteSeconds
    ]
    playSound();
    // console.log('done');
  };

  const { navigation } = props.props
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIsPlaying(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsPlaying(true);
    });

    return unsubscribe;
  }, [navigation]);



  return (
    <View style={styles.timerContainer}>

      <View style={styles.roundCirclesContainer}>
        <View style={styles.roundCounter}>
          <CountdownCircleTimer
            {...timerProps}
            size={windowWith < 500 ? 45 : 65}
            strokeWidth={2}
            colors={[["#EF798A"]]}
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            // onComplete={(totalElapsedTime) => [
            //   remainingTime - totalElapsedTime > minuteSeconds
            // ]}
            onComplete={onCompletehandler}
          >
            {({ elapsedTime }) =>
              renderTime("минут", getTimeMinutes(hourSeconds - elapsedTime))
            }
          </CountdownCircleTimer>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>мин.</Text>
        </View>

        <View style={styles.roundCounter}>
          <CountdownCircleTimer
            {...timerProps}
            size={windowWith < 500 ? 45 : 65}
            strokeWidth={2}
            colors={[["#218380"]]}
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => [
              remainingTime - totalElapsedTime > 0
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("секунд", getTimeSeconds(elapsedTime))
            }
          </CountdownCircleTimer>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>сек.</Text>
        </View>

      </View>

        <View style={styles.gradeContainer}  >
          {/* <Text style={styles.text} >Баллы: </Text> */}
          <Text style={styles.gradeText} >{finaleGrade.toFixed(2)}</Text>
        </View>

      <View style={styles.playBtn}>
        <TouchableCmp
          useForeground
          onPress={() => setIsPlaying(prev => !prev)}
        // onPress={playSound}
        >{!isPlaying ? (
          <Ionicons name="play-circle-outline" size={60} color={Colors.primaryButton} />
        ) : (
          <Ionicons name="pause-circle-outline" size={60} color={Colors.primaryButton} />
        )}
        </TouchableCmp>
      </View>

    </View>
  );
}




const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  roundCirclesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundCounter: {
    // margin: 5,
    // padding: 5 
    paddingHorizontal: 5

  },
  textContainer: {
    paddingHorizontal: 5
  },
  text: {
    fontSize: windowWith < 500 ? 14 : 24
  },
  gradeContainer: {

  },
  gradeText: { 
    fontFamily: 'open-sans-bold',
    fontSize: windowWith < 500 ? 22 : 30,
    color: Colors.blue_grey_lighten,
    // color: '#78909C',
  },
  playBtn: {
    paddingHorizontal: 10
  }
});

export default Timer;
