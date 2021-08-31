import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';

import ListItem from '../components/user/ListItem';
import INSTRUCTIONS_1355 from '../data/order-1355';
import INSTRUCTIONS_530 from '../data/order-530';
import OTHER_INSTRUCTIONS from '../data/other-manipulations';
import Colors from '../constants/Colors';
import Gradient from '../components/app/Gradient';


const windowWith = Dimensions.get('window').width;

const InstructionsScr = props => {

  const selectItemHandler = (itemId, itemTitle) => {
    props.navigation.navigate('ChListOverview', {
      instructId: itemId,
      instructTitle: itemTitle
    });
  };


  let curInstruction;
  const selectedOrder = props.route.params.order;
  if (selectedOrder === '1355') {
    curInstructions = INSTRUCTIONS_1355;
  } else if (selectedOrder === '530') {
    curInstructions = INSTRUCTIONS_530;
  } else if (selectedOrder === 'Прочее') {
    curInstructions = OTHER_INSTRUCTIONS;
  } else {
    props.navigation.navigate('MainMenu');
  };






  return (
    <Gradient
      colors={['#FFF3E0', '#ECEFF1', '#CFD8DC', '#ECEFF1', '#FFF3E0']}
    >
      <FlatList
        data={curInstructions}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ListItem
            number={itemData.item.id}
            title={itemData.item.title}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <TouchableOpacity
              // onPress={loadPdfHandler.bind(this, itemData.item.id)}
              onPress={() => props.navigation.navigate('PDF', { PDFfile: itemData.item.id })}
              useForeground
            >
              <View  >
                <FontAwesome
                  name="eye"
                  // size={24}
                  size={windowWith < 500 ? 24 : 30}
                  color={Colors.lightblue}
                  
                />
              </View>
            </TouchableOpacity>
          </ListItem>
        )}
      />
    </Gradient>
  );



};

export const screenOptions = navData => {
  const orderNumber = navData.route.params.order;
  return {
    headerTitle: `Приказ № ${orderNumber}`,

  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

export default InstructionsScr;
