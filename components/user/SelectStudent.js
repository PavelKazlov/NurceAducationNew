// import { Provider, Surface } from "react-native-paper";
import React, { useEffect, useState, } from "react";
import { View, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch, } from 'react-redux';
// import DropDown from "react-native-paper-dropdown";

// import STUDENT_LIST from '../../data/studentsList';
import Select from '../app/Select';
import * as dbActions from '../../store/actions/db-actions';
import * as resultActions from '../../store/actions/result-actions';
import { concat } from "react-native-reanimated";
// import Group from '../../models/group';
// import Student from '../../models/student';

const SelectStudent = props => {
  // console.log('props => ', props);

  const [showGroupsDropDown, setShowGroupsDropDown] = useState(false);
  const [group, setGroup] = useState('');
  const [showStudentsDropDown, setShowStudentsDropDown] = useState(false);
  const [student, setStudent] = useState('');
  const [filtredStudentsList, setFiltredStudentsList] = useState([{ label: '', value: '' }]);
  const [clearSelect, setClearSelect] = useState(Math.random());
  const STUDENT_LIST = useSelector(state => state.database.students);
  const GROUPS_LIST = useSelector(state => state.database.groups);

  const dispatch = useDispatch();


  // console.log('GROUPS_LIST => ', GROUPS_LIST);
  // console.log('STUDENT_LIST => ', STUDENT_LIST);

  useEffect(() => {
    dispatch(dbActions.loadSelects());
  }, [dispatch]);



  // const date = new Date();
  // const curDate = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() +
  //   ' - ' + date.getHours() + ':' + date.getMinutes();

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString().slice(0, -3);
  const curDate = date + ' - ' + time;

  const studentDependencies = () => {
    let FILTRED_STUDENT_LIST = [];
    FILTRED_STUDENT_LIST = STUDENT_LIST.filter(item => item.group === group)
    setFiltredStudentsList(FILTRED_STUDENT_LIST);

  };

  useEffect(() => {
    studentDependencies();
    setStudent('')
    setClearSelect(Math.random());
    dispatch(resultActions.setTestParams(curDate, group, student));
  }, [group]);
  
  useEffect(() => {
    dispatch(resultActions.setTestParams(curDate, group, student));
  }, [student]);


  const test = () => {

  };


  return (
    <View style={styles.selectContainer}>
      <View style={styles.select}>
        <Select
          label={"Группа студента"}
          mode={"outlined"}
          visible={showGroupsDropDown}
          showDropDown={() => setShowGroupsDropDown(true)}
          onDismiss={() => setShowGroupsDropDown(false)}
          value={group}
          setValue={setGroup}
          list={GROUPS_LIST}
          dropDownContainerHeight={300}
        // key={group}
        />
      </View>
      <View style={styles.select}>
        <Select
          label={"Студенты"}
          mode={"outlined"}
          visible={showStudentsDropDown}
          showDropDown={() => setShowStudentsDropDown(true)}
          onDismiss={() => setShowStudentsDropDown(false)}
          value={student}
          setValue={setStudent}
          list={filtredStudentsList}
          dropDownContainerHeight={300}
          key={clearSelect}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectContainer: {
  },
  select: {
    marginVertical: 10
  },


});

export default SelectStudent;