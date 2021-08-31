import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  Dimensions,
  StyleSheet,
  Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons, Fontisto, FontAwesome5, Foundation } from '@expo/vector-icons';

import HeaderButton from '../components/app/HeaderButton';
import TestListItem from '../components/user/TestListItem';
import CheckListBodyRow from '../models/chListBodyRow';
import Timer from '../components/app/Timer';
import Colors from '../constants/Colors';
import * as resultActions from '../store/actions/result-actions';
import * as counterActions from '../store/actions/counter-actions';
import Gradient from '../components/app/Gradient';

const windowWith = Dimensions.get('window').width;

const TestScr = props => {
  // console.log('props = >', props);
  // const [gradeIndicator, setGradeIndikator] = useState('purple');
  const chkListTitle = useSelector(state => state.checkList.checkListTitle);
  // const chkListTitle = props.route.params.selChkList;
  const selectedChkList = useSelector(state => state.checkList.selectedChkList);
  // console.log('selectedChkList => ', selectedChkList);
  let curChkListRowsArray = [];
  const dispatch = useDispatch();


  try {
    for (const row of selectedChkList.title) {
      curChkListRowsArray.push(new CheckListBodyRow(
        (Math.random() * Date.now()).toString(),
        row.serialNum,
        row.title,
        row.action,
        row.grade
      ))
    }
  } catch (error) {
    alert('There is no such checklist in database!');
  };


  const resultPressHandler = useCallback(async () => {
    await dispatch(counterActions.setTestInterval(0));
    props.navigation.navigate('Result');
  }, [dispatch]);


  const backArrowHandler = useCallback(async () => {
    await dispatch(resultActions.clearResult());
    props.navigation.goBack();
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Back"
            iconName='arrow-back'
            onPress={backArrowHandler}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="GoResult"
            iconName='document-text-sharp'
            onPress={resultPressHandler}
          />
        </HeaderButtons>
      )
    })
  }, [backArrowHandler, resultPressHandler]);



  return (
    <Gradient
      colors={['#FFF3E0', '#ECEFF1', '#CFD8DC', '#ECEFF1', '#FFF3E0']}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer} >
          <Text style={styles.chkListHeader} >{chkListTitle}</Text>
        </View>

        <View style={styles.checklistsContainer} >
          <FlatList
            contentContainerStyle={{
              // paddingBottom: 50,
              marginBottom: 20,
            }}

            data={curChkListRowsArray}
            keyExtractor={item => item.id}
            renderItem={itemData => (
              <TestListItem
                number={itemData.item.serialNum}
                title={itemData.item.title}
                rowId={itemData.item.id}
              >
                <View >
                  {itemData.item.action === 'Сказать' ? (
                    <View style={styles.icon} >
                      <MaterialCommunityIcons name="account-tie-voice"
                        size={windowWith < 500 ? 16 : 24}
                        color='#40C4FF' />
                    </View>
                  ) : (
                    <View style={styles.icon} >
                      <FontAwesome5 name="hand-holding-medical"
                        size={windowWith < 500 ? 16 : 24}
                        color='#FFA000' />
                    </View>
                  )}
                </View>
              </TestListItem>
            )}
          />
        </View>
        <View style={styles.footer}>
          <Timer props={props} />
        </View>

      </View>
    </Gradient>
  );


};
export const screenOptions = navData => {
  return {
    headerTitle: 'Чек-лист',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // minHeight: 75
  },
  chkListHeader: {
    width: '100%',
    minHeight: 50,
    fontFamily: 'open-sans-bold',
    fontSize: windowWith < 500 ? 18 : 24,
    color: Colors.fontButtonHeader,
    padding: 7,
    textAlign: 'center',
  },
  checklistsContainer: {
    flex: 1,
  },
  icon: {
    borderWidth: 1,
    borderColor: Colors.chkListRowIconBorder,
    borderRadius: 50,
    padding: windowWith < 500 ? 5 : 7,
    marginRight: windowWith < 500 ? 7 : 1,
    overflow: 'hidden'
  },
  footer: {
    marginVertical: windowWith < 500 ? 0 : 10,
    marginHorizontal: windowWith < 500 ? 1 : 10,
  }
});

export default TestScr;
