import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  ScrollView,
  Dimensions,

} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from "react-native-paper";
import { MaterialCommunityIcons, Fontisto, FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

import ResultButton from '../components/app/ResultButton';
import Select from '../components/app/Select';
import * as dbActions from '../store/actions/db-actions';
import Gradient from '../components/app/Gradient';
import Colors from '../constants/Colors';
import Button from "../components/app/Button";
import Card from '../components/app/Card';

const windowWith = Dimensions.get('window').width;


const SettingScr = props => {
  const [newStudentGroup, setNewStudentGroup] = useState('');
  const [showDropDownStudentGroup, setShowDropDownStudentGroup] = useState(false);
  const [studentGroup, setStudentGroup] = useState('');
  const [newStudentName, setNewStudentName] = useState('')

  const [showDropDownStudents, setShowDropDownStudents] = useState(false);
  const [delStudents, setDelStudents] = useState('');

  const [showDropDownGroups, setShowDropDownGroups] = useState(false);
  const [delGroups, setDelGroups] = useState('');

  const [clearSelects, setClearSelects] = useState(Math.random());

  const dispatch = useDispatch();

  const STUDENT_LIST = useSelector(state => state.database.students);
  const GROUPS_LIST = useSelector(state => state.database.groups);



  useEffect(() => {
    dispatch(dbActions.loadSelects());
  }, [dispatch]);



  const addStudentHandler = () => {
    if (studentGroup === '') {
      alert('Выберите группу для студента!');
      return;
    } else if (newStudentName === '') {
      alert('Введите фамилию студента!');
      return;
    }
    dispatch(dbActions.addStudent(studentGroup, newStudentName, newStudentName));
    setNewStudentName('');
    dispatch(dbActions.loadSelects());
    setClearSelects(Math.random());
    Keyboard.dismiss();
  };


  const addGroupHandler = async () => {
    if (newStudentGroup === '') {
      alert('Заполните название группы!');
      return;
    }
    dispatch(dbActions.addGroup(newStudentGroup, newStudentGroup));
    setNewStudentGroup('')
    dispatch(dbActions.loadSelects());
    Keyboard.dismiss();
  };


  const deleteGroupHandler = () => {
    const delGroupArr = delGroups.slice(1).split(',');
    // console.log('delGroupArr => ', delGroupArr);
    for (const gr of delGroupArr) {
      for (const item of GROUPS_LIST) {
        if (item.label === gr) {
          dispatch(dbActions.deleteGroups(item.id));
          break;
        }
      }
    }
    dispatch(dbActions.loadSelects());
    setDelGroups('');
  };


  const checkStudentsInDelGroups = () => {
    let studInDelGroup = [];
    const delGroupArr = delGroups.slice(1).split(',');
    for (const gr of delGroupArr) {
      if (STUDENT_LIST.length > 0) {
        for (const item of STUDENT_LIST) {
          if (item.group === gr) {
            studInDelGroup.push(item.value)
          }
        }
      }
    };
    // console.log('studInDelGroup => ', studInDelGroup);
    if (studInDelGroup.length > 0) {
      Alert.alert('ВНИМАНИЕ!', `К одной или нескольким выбранным группам привязаны студенты: ${studInDelGroup.toString().replace(/\,/g, ', ')}! 
      Вы действительно хотите удалить группы со студентами?`, [
        { text: 'Нет', style: 'default' },
        {
          text: 'Да',
          style: 'destructive',
          onPress: () => {
            deleteStudentHandler(studInDelGroup);
            deleteGroupHandler();
            studInDelGroup = [];
          }
        }
      ]);
    } else {
      deleteGroupHandler();
    }
  }


  const deleteStudentHandler = (studInDeletedGroup) => {
    let delStudArr = [];
    if (studInDeletedGroup.length > 0) {
      delStudArr = studInDeletedGroup;
    } else {
      delStudArr = delStudents.slice(1).split(',');
    }
    for (const stud of delStudArr) {
      for (const item of STUDENT_LIST) {
        if (item.label === stud) {
          dispatch(dbActions.deleteStudents(item.id));
          break;
        }
      }
    }
    dispatch(dbActions.loadSelects());
    setDelStudents('');
  };


  const [maxTestTime, setMaxTestTime] = useState(20);
  const [maxTestTimeSaved, setMaxTestTimeSaved] = useState(true);
  const { setItem, getItem } = useAsyncStorage('@max_time_key');


  useEffect(() => {
    const maxTime = getItem()
      .then((result) => {
        if (result != null) {
          console.log('result => ', parseFloat(result));
          const time = parseFloat(result);
          setMaxTestTime(time);
        }
      })
  }, [setMaxTestTime]);


  const onSliderChangeHandler = (val) => {
    setMaxTestTimeSaved(false);
    setMaxTestTime(val);
  };

  const addMaxTestTimeHandler = async () => {
    await setItem(maxTestTime.toString());
    const maxTime = await getItem();
    console.log('maxTime => ', maxTime);
    setMaxTestTimeSaved(true);
  };



  return (
    <Gradient
      colors={['#FFF3E0', '#ECEFF1', '#CFD8DC', '#ECEFF1', '#FFF3E0']}
    >
      <Provider >
        <ScrollView >

          <View style={styles.formControl}>
            <View style={styles.settingBlock}>
              <View style={styles.textHeaderContainer}>
                <Text style={styles.textHeader}>СОЗДАТЬ ГРУППУ</Text>
              </View>
              <View style={styles.inputsCreationBlock}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='words'
                  placeholder='добавить группу...'
                  value={newStudentGroup}
                  onChangeText={value => setNewStudentGroup(value)}
                // onBlur={addGroupHandler}
                />
                <ResultButton
                  onPress={addGroupHandler}
                  style={styles.icon}
                >
                  <View >
                    <AntDesign name="addusergroup" size={30} color="green" />
                  </View>
                </ResultButton>
              </View>
            </View>

            <View style={styles.settingBlock}>
              <View style={styles.textHeaderContainer}>
                <Text style={styles.textHeader}>СОЗДАТЬ СТУДЕНТА</Text>
              </View>
              <View style={styles.inputsDeletingBlock}>
                <View style={styles.select}>
                  <Select
                    label={"Группа студента"}
                    mode={"outlined"}
                    visible={showDropDownStudentGroup}
                    showDropDown={() => setShowDropDownStudentGroup(true)}
                    onDismiss={() => setShowDropDownStudentGroup(false)}
                    value={studentGroup}
                    setValue={setStudentGroup}
                    list={GROUPS_LIST}
                    dropDownContainerHeight={300}
                  // key={clearSelects}
                  />
                </View>
              </View>
              <View style={styles.inputsCreationBlock}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='words'
                  placeholder='добавить студента...'
                  value={newStudentName}
                  onChangeText={value => setNewStudentName(value)}
                // onBlur={lostFocusHandler}
                />
                <ResultButton
                  onPress={addStudentHandler}
                  style={styles.icon}
                >
                  <View  >
                    <AntDesign name="adduser" size={30} color="green" />
                  </View>
                </ResultButton>
              </View>
            </View>

            <View style={styles.settingBlock}>
              <View style={styles.textHeaderContainer}>
                <Text style={styles.textHeader}>УДАЛИТЬ ГРУППУ / СТУДЕНТА</Text>
              </View>
              <View style={styles.inputsDeletingBlock}>
                <View style={styles.select}>
                  <Select
                    multiSelect={true}
                    label={"группы..."}
                    mode={"outlined"}
                    visible={showDropDownGroups}
                    showDropDown={() => setShowDropDownGroups(true)}
                    onDismiss={() => setShowDropDownGroups(false)}
                    // value={group}
                    // setValue={setGroup}
                    value={delGroups}
                    setValue={setDelGroups}
                    list={GROUPS_LIST}
                    dropDownContainerHeight={300}
                  // key={group}
                  />
                </View>
                <ResultButton
                  onPress={checkStudentsInDelGroups}
                  style={styles.icon}
                >
                  <View  >
                    <AntDesign name="deleteusergroup" size={30} color="red" />
                  </View>
                </ResultButton>
              </View>

              <View style={styles.inputsDeletingBlock}>
                <View style={styles.select}>
                  <Select
                    multiSelect={true}
                    label={"студенты..."}
                    mode={"outlined"}
                    visible={showDropDownStudents}
                    showDropDown={() => setShowDropDownStudents(true)}
                    onDismiss={() => setShowDropDownStudents(false)}
                    // value={student}
                    // setValue={setStudent}
                    value={delStudents}
                    setValue={setDelStudents}
                    list={STUDENT_LIST}
                    dropDownContainerHeight={300}
                  // key={student}
                  />
                </View>
                <ResultButton
                  onPress={deleteStudentHandler}
                  style={styles.icon}
                >
                  <View  >
                    <AntDesign name="deleteuser" size={30} color="red" />
                  </View>
                </ResultButton>
              </View>
            </View>

            <Card style={styles.timerCardContainer}>
              <Text style={styles.timerBlockHeader}> МАКСИМАЛЬНОЕ ВРЕМЯ ТЕСТА, МИНУТ: </Text>
              
              <View style={styles.counterContainer}>
                <View >
                  <MaterialCommunityIcons
                    name="progress-clock"
                    // size={70}
                    size={windowWith < 500 ? 70 : 100}
                    color={Colors.timerElements}
                  />
                </View>

                <View style={styles.sliderContainer}>
                  <Slider
                    style={{ width: '100%', height: 40 }}
                    value={maxTestTime}
                    minimumValue={7}
                    maximumValue={60}
                    minimumTrackTintColor='green'
                    maximumTrackTintColor="#000000"
                    step={1}
                    thumbTintColor='green'
                    onValueChange={value => onSliderChangeHandler(value)}
                  />
                </View>

                <View style={styles.timerValueContainer}>
                  <Text style={styles.timerValueText}>{maxTestTime}</Text>
                </View>
              </View>

              <View style={styles.button}>
                <Button
                  disabled={maxTestTimeSaved}
                  title="УСТАНОВИТЬ"
                  onPress={addMaxTestTimeHandler}
                />

              </View>
            </Card>
          </View>
        </ScrollView>
      </Provider>
    </Gradient>
  );


};


export const screenOptions = navData => {
  return {
    headerTitle: 'Настройки',
  };
};


const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingBlock: {
    padding: 20,
    marginVertical: 7,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  textHeaderContainer: {
    width: '80%',
  },
  textHeader: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
    fontSize: windowWith < 500 ? 16 : 24,
  },
  inputsCreationBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputsDeletingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '70%'
  },
  select: {
    paddingHorizontal: 2,
    paddingVertical: 10,
    width: '70%'
  },
  icon: {
    marginLeft: 10,
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  },
  timerCardContainer: {
    width: windowWith < 500 ? '90%' : '80%',
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginTop: windowWith < 500 ? 20 : 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerBlockHeader: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
    paddingHorizontal: 7,
    fontSize: windowWith < 500 ? 16 : 24,
    textAlign: 'center'
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWith < 500 ? 7 : 0,
    marginVertical: 10
  },
  sliderContainer: {
    width: '50%'
  },
  timerValueContainer: {
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
  button: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingTop: 20,
    paddingHorizontal: '20%',
  },
});

export default SettingScr;
