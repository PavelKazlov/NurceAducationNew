import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Button,
  Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/app/HeaderButton';
import ListItem from '../components/user/ListItem';
import CHECK_LIST_TITLES from '../data/ch-list-titles';
import CHK_LIST_BODY from '../data/ch-list-body';
import CHECK_LIST_TITLE_MODEL from '../models/checkListTitles';
import CHK_LIST_BODY_MODEL from '../models/chListBody';
import * as chkListActions from '../store/actions/chkList-actions';
import Gradient from '../components/app/Gradient';
import CustomText from '../components/app/CustomText';

// import Colors from '../constants/Colors';

const windowWith = Dimensions.get('window').width;

const ChListOverviewScr = props => {

  const instructionNumber = props.route.params.instructId;
  const instructionTitle = props.route.params.instructTitle
  const curOrder = useSelector(state => state.orders.currentOrder);
  const dispatch = useDispatch();

  let chListArray = [];
  for (const item of CHECK_LIST_TITLES) {
    if (item.parentOrder === curOrder && item.instructionNumber === instructionNumber) {
      // chListArray.push(item.title);
      chListArray.push(new CHECK_LIST_TITLE_MODEL(
        // Math.floor(Math.random() * Date.now()),
        (Math.random() * Date.now()).toString(),
        item.parentOrder,
        item.instructionNumber,
        item.chkListNumber,
        item.title,
        item.parentOrder + '-' + item.instructionNumber + '-' + item.chkListNumber
      ));
    }
  };

  if (chListArray.length === 0) {
    return (
      <View style={styles.centredView} >
        <Text style={styles.noChkListText} >По выбранной инструкции чеклисты отсутствуют!</Text>
      </View>
    )
  }
  // console.log(chListArray);


  const onPressCheckListHandler = (complexNumber, chkListTitle, item) => {
    let selectedChkList;
    for (const item of CHK_LIST_BODY) {
      if (item.complexChkListNumber === complexNumber) {
        selectedChkList = new CHK_LIST_BODY_MODEL(
          (Math.random() * Date.now()).toString(),
          complexNumber,
          item.title
        )
      }
    };

    dispatch(chkListActions.setChecklist(selectedChkList));
    dispatch(chkListActions.setChecklistTitle(chkListTitle));
    props.navigation.navigate('ChListTune');
  }


  return (
    <Gradient
      colors={['#FFF3E0', '#ECEFF1', '#CFD8DC', '#ECEFF1', '#FFF3E0']}
    >
      {/* <View> */}
      <View style={styles.headerContainer} >
        <View style={styles.docType}>
          <Text style={styles.title}>ИНСТРУКЦИЯ:</Text>
        </View>
        <Text style={styles.instructionTitle}>{instructionTitle}</Text>
      </View>
      <View style={styles.checklistsContainer} >
        <FlatList
          // contentContainerStyle={{

          // }}
          data={chListArray}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <ListItem
              number={itemData.item.chkListNumber.replace('ch', '')}
              title={itemData.item.title}
              onSelect={() => {
                onPressCheckListHandler(itemData.item.complexChkListNumber, itemData.item.title, itemData.item);
              }}
            >
            </ListItem>
          )}
        />
      </View>
      {/* </View> */}
    </Gradient>
  );


};

export const screenOptions = navData => {
  return {
    headerTitle: 'Список чек-листов',
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
  headerContainer: {
    // height: '10%',
    marginTop: 15,
    marginBottom: 13,
    marginHorizontal: windowWith < 500 ? 15 : 24,
  },
  docType: {
    // borderBottomWidth: 2,
    // borderBottomColor: 'black'
  },
  title: {
    fontSize: windowWith < 500 ? 16 : 22,
    textAlign: "left",
    // fontFamily: 'RedHatDisplay_400Regular',
    // fontFamily: 'RedHatDisplay_700Bold',
    fontFamily: 'open-sans-bold',
    borderBottomWidth: 1,
    borderBottomColor: '#424242',
  },
  instructionTitle: {
    fontSize: windowWith < 500 ? 18 : 24,
    textAlign: "left",
    fontFamily: 'RedHatDisplay_400Regular',
    paddingTop: 5
  },
  checklistsContainer: {
    height: '90%',
  },
  centredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noChkListText: {
    fontSize: windowWith < 500 ? 16 : 24,
    textAlign: "center",
    fontFamily: 'RedHatDisplay_400Regular',
    paddingTop: 5
  }
});

export default ChListOverviewScr;
