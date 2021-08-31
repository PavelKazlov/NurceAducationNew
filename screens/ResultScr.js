import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';


import HeaderButton from '../components/app/HeaderButton';
import * as resultActions from '../store/actions/result-actions';
import { createPDFUri, savePDF } from "../utils/helpers";
import Button from "../components/app/Button";
// import { simpleHtml } from "../utils/html";
import { simpleHtml } from "../utils/helpers";
import Colors from '../constants/Colors';
import ListItem from '../components/user/ListItem';
import Gradient from '../components/app/Gradient';



// const createPdf = (htmlFactory) => async () => {
//   try {
//     const html = await htmlFactory();
//     if (html) {
//       await createAndSavePDF(html);
//       Alert.alert("Готово!", "Документ успешно сохранён!");
//     }
//   } catch (error) {
//     console.log(error);
//     Alert.alert("Error", error.message || "Something went wrong...");
//   }
// };

const windowWith = Dimensions.get('window').width;

const ResultScr = props => {
  const resultArr = useSelector(state => state.result.resultArray);
  const testParams = useCallback(useSelector(state => state.result.testParams), []);
  const finaleGrade = useSelector(state => state.result.finaleGrade);
  const chkListTitle = useSelector(state => state.checkList.checkListTitle);
  const dispatch = useDispatch();
  const pageMarginState = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sortArr = resultArr.sort((a, b) => a.serialNum - b.serialNum);
  // console.log('date => ', testParams.testDate);

  const createPdf = (htmlFactory, action, props) => async () => {
    setIsLoading(true);
    const { getItem } = useAsyncStorage('@PDF_key');
    try {
      const html = await htmlFactory();
      if (html) {
        if (action === 'preview') {
          await createPDFUri(html);
          const uriPDF = await getItem();
          props.navigation.navigate('PDF', { PDFuri: uriPDF });
        } else if (action === 'save') {
          await savePDF(html);
          Alert.alert("Готово!", "Документ успешно сохранён!");

        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert("Error", error.message || "Something went wrong...");
    }
    setIsLoading(false);
  };


  const homeHandler = useCallback(async () => {
    await dispatch(resultActions.clearAllResult());
    props.navigation.navigate('MainMenu');
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
            onPress={homeHandler}
          />
        </HeaderButtons>
      )
    }, [homeHandler])
  });




  return (
    <Gradient
      colors={['#FFF3E0', '#ECEFF1', '#CFD8DC', '#ECEFF1', '#FFF3E0']}
    >
      {/* <View style={styles.container}> */}
      {/* <Image style={styles.logo} source={IMAGES.logo} /> */}
      <View style={styles.headerBlock}>
        <Text style={styles.header}>{chkListTitle}</Text>
      </View>
      <View style={styles.headerDataContainer}>

        <View style={styles.headerLeftContainer}>
          <Text style={styles.labelText}>Дата:
            <Text style={styles.valueText}> {testParams.testDate}</Text>
          </Text>
          <Text style={styles.labelText}>Группа:
            <Text style={styles.valueText}> {testParams.testGroup}</Text>
          </Text>
          <Text style={styles.labelText}>Студент:
            <Text style={styles.valueText}> {testParams.testStudent}</Text>
          </Text>
          <Text style={styles.labelText}>Оценка:
            <Text style={styles.valueText}> {finaleGrade.toFixed(2)}</Text>
          </Text>
        </View>

        <View style={styles.headerRightContainer}>
          {Platform.Version <= 29 ?
            (
              <View style={styles.buttonsContainer}>
                {/* <View>
                  <Button
                    title="Открыть PDF"
                    onPress={createPdf(simpleHtml(testParams, resultArr, pageMarginState[0]), 'preview', props)}
                  /> */}
                <Button
                  disabled={!!isLoading}
                  isLoading={isLoading}
                  title="PDF"
                  onPress={createPdf(simpleHtml(chkListTitle, finaleGrade, testParams, resultArr), 'save')}
                >
                  <Feather name="save" size={24} color="black" />
                </Button>
                {/* </View> */}
              </View>
            ) : (
              <View></View>)}
        </View>
      </View>




      <View style={styles.rezultContainer} >
        <FlatList
          data={resultArr}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <ListItem
              number={itemData.item.serialNum}
              title={itemData.item.title}
            // onSelect={() => {
            //   onPressCheckListHandler(itemData.item.complexChkListNumber, itemData.item.title, itemData.item);
            // }}
            >
              <View style={styles.gradeBlock}>
                <View style={styles.nominalGrade}>
                  <Text style={styles.textGrade}>{itemData.item.grade}</Text>
                </View>
                {itemData.item.grade === itemData.item.currentGrade ? (<Octicons name="arrow-down" size={24} color='green' />)
                  :
                  (itemData.item.grade > itemData.item.currentGrade && itemData.item.currentGrade != 0 ? (<Octicons name="arrow-down" size={24} color='orange' />)
                    : (<Octicons name="arrow-down" size={24} color='red' />)
                  )}
                <View style={styles.nominalGrade}>
                  <Text style={styles.textGrade}>{itemData.item.currentGrade}</Text>
                </View>
              </View>
            </ListItem>
          )}
        />
      </View>
      {/* </View> */}
    </Gradient>
  );
}


export const screenOptions = navData => {
  return {
    headerTitle: 'Результат',
  };
};


const styles = StyleSheet.create({
  // logo: {
  //   width: "100%",
  //   height: 40,
  //   resizeMode: "contain",
  //   alignSelf: "center",
  //   marginVertical: 5,
  // },
  headerBlock: {
    // marginLeft: 15,
    marginHorizontal: windowWith < 500 ? 10 : 20,
    marginTop: windowWith < 500 ? 5 : 10,
  },
  headerDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    marginHorizontal: windowWith < 500 ? 15 : 25,
    paddingBottom: 5,
    marginBottom: 7
  },
  // headerLeftContainer: {

  // },
  // headerRightContainer: {

  // },
  buttonsContainer: {
    paddingHorizontal: 15,
  },
 
  header: {
    fontFamily: 'open-sans-bold',
    // fontFamily: 'open-sans',
    // fontFamily: 'RedHatDisplay_400Regular',
    // fontFamily: 'RedHatDisplay_700Bold',
    fontSize: windowWith < 500 ? 14 : 24,
    marginBottom: windowWith < 500 ? 3 : 5,

  },
  labelText: {
    fontFamily: 'open-sans',
    fontSize: windowWith < 500 ? 12 : 20,
    marginLeft: 5,
  },
  valueText: {
    color: Colors.blue_grey_lighten,
    fontFamily: 'open-sans-bold',
    fontSize: windowWith < 500 ? 14 : 22,
  },
  rezultContainer: {
    flex: 1
  },
  gradeBlock: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  nominalGrade: {
    // borderColor: 'red',
    // borderWidth: 1,
    // height: windowWith < 500 ? 25 : 40,
    // width: windowWith < 500 ? 25 : 40,
    // margin: 5,
    // padding: 3,
    // borderRadius: 5
  },
  currentGrade: {

  },
  textGrade: {
    fontSize: windowWith < 500 ? 12 : 16,
    color: Colors.blue_grey_lighten,
    fontFamily: 'open-sans-bold',
    // margin: 5,
    // padding: 5,
  },
});

export default ResultScr;





// // example how to use useMemo hoock !!!!
// const onButtonPress = useCallback(
//   (key, action) => async () => {
//     try {
//       if (action) {
//         setLoadingKey(key);
//         await action();
//         setLoadingKey(null);
//       }
//     } catch (error) {
//       setLoadingKey(null);
//     }
//   },
//   []
// );

// const toggleSwitch = useCallback(
//   (toggler) => () => toggler((previousState) => !previousState),
//   []
// );

// const allButtons = useMemo(
//   () => [
//     {
//       title: "Сохранить PDF",
//       action: createPdf(simpleHtml(testParams, resultArr, pageMarginState[0]), 'save'),
//       switches: [{ label: "Remove page margin", state: pageMarginState }],
//     },
//     {
//       title: "Открыть PDF",
//       action: createPdf(simpleHtml(testParams, resultArr, pageMarginState[0]), 'preview', props),
//       switches: [
//         {
//           label: "Avoid sections breaking",
//           state: avoidSectionBreakingState,
//         },
//       ],
//     },
//   ],
//   [
//     pageMarginState,
//   ]
// );



// <ScrollView contentContainerStyle={styles.scrollContainer}>
// <View style={styles.buttonsContainer}>
//   {allButtons.map(({ title, action, switches }, index) => {
//     const key = String(index);

//     return (
//       <View key={key} style={styles.exampleContainer}>
//         <CustomText bold style={styles.exampleTitle}>
//           {title}
//         </CustomText>
//         {!!switches &&
//           !!switches.length &&
//           switches.map(({ state, label }, i) => (
//             <CustomSwitch
//               key={String(i)}
//               label={label}
//               onValueChange={toggleSwitch(state[1])}
//               value={state[0]}
//               disabled={!!loadingKey}
//             />
//           ))}
//         <Button
//           disabled={!!loadingKey}
//           isLoading={loadingKey === key}
//           title="Create PDF"
//           onPress={onButtonPress(key, action)}
//         />
//       </View>
//     );
//   })}
// </View>
// </ScrollView>



