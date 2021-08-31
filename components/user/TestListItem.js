import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';


import Colors from '../../constants/Colors';
import Card from '../app/Card';
import ResultButton from '../app/ResultButton';
import * as resultActions from '../../store/actions/result-actions';

const windowWith = Dimensions.get('window').width;

const TestListItem = (props) => {
  const [bgColorGood, setBgColorGood] = useState('#ccc');
  const [bgColorAverrage, setBgColorAverrage] = useState('#ccc');
  const [bgColorBad, setBgColorBad] = useState('#ccc');
  const selectedChkList = useSelector(state => state.checkList.selectedChkList);
  // const resultArr = useSelector(state => state.result.resultArray);
  // console.log('resultArr=>', resultArr);

  const dispatch = useDispatch();


  const changeColor = (buttonType) => {
    let naminalGrade = 0.0;
    let rowGrade = 0.0;

    // поиск номинального бала по текущему ряду чеклиста
    for (const element of selectedChkList.title) {
      if (element.serialNum === props.number) {
        naminalGrade = element.grade;

        if (buttonType === 'green') {
          setBgColorGood('green');
          setBgColorAverrage('#ccc');
          setBgColorBad('#ccc');
          rowGrade = naminalGrade;
        } else if (buttonType === 'yellow') {
          setBgColorGood('#ccc');
          setBgColorAverrage('orange');
          setBgColorBad('#ccc');
          rowGrade = naminalGrade / 2;
        } else if (buttonType === 'red') {
          setBgColorGood('#ccc');
          setBgColorAverrage('#ccc');
          setBgColorBad('red');
          rowGrade = 0.0;
        }
        
        dispatch(resultActions.addRowResult(
          props.rowId,
          element.serialNum,
          element.title,
          element.action,
          element.grade,
          rowGrade
        ));
        break;
      }
    };
    // setBgColor(buttonType);
  }


  return (

    <Card
      style={styles.chkListItem}
    >
      <View
        style={styles.details}
      >
        <Text style={styles.number}>{props.number}</Text>
        <Text style={styles.text}>{props.title}</Text>
      </View>
      <View style={styles.actions}>
        {/* <Button title='G' onPress={changeColor.bind(this, 'green')} />
        <Button title='Y' onPress={changeColor.bind(this, 'yellow')} />
        <Button title='R' onPress={changeColor.bind(this, 'red')} /> */}

        <View style={styles.buttonBlock} >
          <ResultButton
            onPress={changeColor.bind(this, 'green')}
          // style={{ backgroundColor: '#AED581' }}
          >
            <View style={styles.icon} >
              {/* <FontAwesome5 name="hand-holding-medical" size={18} color={bgColorGood} /> */}
              <AntDesign name="smileo"
                size={windowWith < 500 ? 25 : 30}
                color={bgColorGood} />
            </View>
          </ResultButton>
          <ResultButton
            onPress={changeColor.bind(this, 'yellow')}
          // style={{ backgroundColor: '#FFFF00' }}
          >
            <View style={styles.icon} >
              {/* <FontAwesome5 name="hand-holding-medical" size={18} color={bgColorAverrage} /> */}
              <AntDesign name="meh"
                size={windowWith < 500 ? 25 : 30}
                color={bgColorAverrage} />
            </View>
          </ResultButton>
          <ResultButton
            onPress={changeColor.bind(this, 'red')}
          // style={{ backgroundColor: '#FF6D00' }}
          >
            <View style={styles.icon} >
              {/* <FontAwesome5 name="hand-holding-medical" size={18} color={bgColorBad} /> */}
              {/* <Ionicons name="md-skull-outline" size={28} color={bgColorBad} /> */}
              {/* <MaterialCommunityIcons name="skull-crossbones" size={24} color={bgColorBad} /> */}
              <AntDesign name="frowno"
                size={windowWith < 500 ? 25 : 30}
                color={bgColorBad} />
            </View>
          </ResultButton>
        </View>

        {props.children}
      </View>
    </Card >

  );
};

const styles = StyleSheet.create({
  chkListItem: {
    flex: 1,
    minHeight: 70,
    marginVertical: windowWith < 500 ? 5 : 10,
    marginHorizontal: windowWith < 500 ? 10 : 15,
    justifyContent: 'flex-start',

  },
  details: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 9
  },
  number: {
    width: "6%",
    fontFamily: 'open-sans',
    fontSize: windowWith < 500 ? 14 : 24,
    marginLeft: 10,
    marginRight: 6,
  },
  text: {
    width: '90%',
    fontFamily: 'open-sans',
    // color: Colors.fontButtonHeader,
    fontSize: windowWith < 500 ? 17 : 26,
    color: Colors.itemText,
    paddingRight: 5,
  },
  actions: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: windowWith < 500 ? 1 : 5,
    // marginTop: 5,
  },
  buttonBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '85%',
    paddingRight: 15
  },
  icon: {
    // borderWidth: 1,
    // borderColor: Colors.chkListRowIconBorder,
    // borderRadius: 50,
    padding: 7,
    overflow: 'hidden'
  },

});

export default TestListItem;