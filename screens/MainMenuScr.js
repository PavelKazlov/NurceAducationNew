import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import HeaderButton from '../components/app/HeaderButton';
import * as orderAction from '../store/actions/order-actions';
import Card from '../components/app/Card';
import Colors from '../constants/Colors';
import Gradient from '../components/app/Gradient';

const windowWith = Dimensions.get('window').width;


const MainMenuScr = props => {
  // const [cardWith, setCardWith] = useState (Dimensions.get('window').width / 4);
  console.log('Dimensions => ', Dimensions.get('window').width);

  const dispatch = useDispatch();

  const orderPressHandler = (orderNumber) => {
    dispatch(orderAction.setOrder(orderNumber));
    // console.log('orderNumber =>', orderNumber);
    props.navigation.navigate('Instructions', { order: orderNumber })
  };

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }


  return (
    <Gradient
      // colors={['#FFF3E0', '#CFD8DC', '#FFF3E0']}
      colors={['#FFF3E0', '#ECEFF1', '#CFD8DC', '#ECEFF1', '#FFF3E0']}
    >
      <ScrollView >
        <View style={styles.centered} >
          <View style={styles.header}>
            <Text style={styles.mainHeader}>
              Полоцкий государственный медицинский колледж
            </Text>
            <Text style={styles.subHeader}>
              имени Героя Советского Союза З.М.Туснолобовой-Марченко
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../assets/images/logo_200x200.png')}
              // fadeDuration={3000}
              // source={{
              //   uri: 'https://www.mountainguides.com/photos/matterhorn/alps-mf7.jpg'
              // }} 
              resizeMode='cover'
            />
          </View>
          <Card style={styles.cardStyle}>
            <View style={styles.touchable}>
              <TouchableCmp onPress={orderPressHandler.bind(this, '530')} useForeground>
                <View>
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Приказ № 530</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>Инструкции по выполнению терапевтических лечебных и диагностических манипуляций</Text>
                  </View>
                </View>
              </TouchableCmp>
            </View>
          </Card>

          <Card style={styles.cardStyle}>
            <View style={styles.touchable}>
              <TouchableCmp onPress={orderPressHandler.bind(this, '1355')} useForeground>
                <View>
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Приказ № 1355</Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>Инструкции по выполнению инъекций и внутривенных инфузий</Text>
                  </View>
                </View>
              </TouchableCmp>
            </View>
          </Card>

                 <Card style={styles.cardStyle}>
            <View style={styles.touchable}>
              <TouchableCmp onPress={orderPressHandler.bind(this, 'Прочее')} useForeground>
                <View>
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Прочие манипуляции</Text>
                  </View>
                    <View style={styles.iconContainer}>
                      <FontAwesome name="medkit" size={windowWith < 500 ? 25 : 35} color="white" />
                      <FontAwesome5 name="file-medical-alt" size={windowWith < 500 ? 25 : 35} color="white" />
                      <FontAwesome5 name="hand-holding-medical" size={windowWith < 500 ? 25 : 35} color="white" />
                      <FontAwesome5 name="comment-medical" size={windowWith < 500 ? 25 : 35} color="white" />
                      <FontAwesome5 name="medrt" size={windowWith < 500 ? 25 : 35} color="white" />
                      <FontAwesome5 name="notes-medical" size={windowWith < 500 ? 25 : 35} color="white" />
                      <FontAwesome5 name="syringe" size={windowWith < 500 ? 25 : 35} color="white" />
                      {/* <Fontisto name="laboratory" size={windowWith < 500 ? 25 : 35} color="white" /> */}
                      {/* <FontAwesome5 name="clinic-medical" size={windowWith < 500 ? 25 : 35} color="white" /> */}
                    </View>
                  </View>
              </TouchableCmp>
            </View>
          </Card>


        </View>
      </ScrollView>
    </Gradient>
  );


};

export const screenOptions = navData => {
  return {
    headerTitle: 'Приказы',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="About"
          iconName={Platform.OS === 'android' ? 'pulse-outline' : 'ios-pulse-outline'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Settings"
          iconName={Platform.OS === 'android' ? 'settings-sharp' : 'ios-settings-sharp'}
          onPress={() => {
            navData.navigation.navigate('Settings');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    marginTop: windowWith < 500 ? 10 : 20,
    paddingBottom: 10

  },
  mainHeader: {
    // fontFamily: 'RedHatDisplay_400Regular',
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: windowWith < 500 ? 18 : 30,
    textAlign: 'center',
    color: Colors.blue_grey_lighten,
    marginBottom: 2
  },
  subHeader: {
    fontFamily: 'RedHatDisplay_400Regular',
    //  fontFamily: 'RedHatDisplay_700Bold',
    fontSize: windowWith < 500 ? 12 : 20,
    textAlign: 'center',
    //  color: Colors.greyDarken,
    color: '#90A4AE',
    marginBottom: 2
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 100,
    // padding: 10,
    elevation: 10,
    marginBottom: windowWith < 500 ? 12 : 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardStyle: {
    width: '80%',
    flex: 1,
    marginVertical: 20,
    backgroundColor: Colors.buttonOrange
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1
  },
  headerContainer: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 2,
    justifyContent: 'center',
    marginVertical: 5,
  },
  headerTitle: {
    fontFamily: 'RedHatDisplay_400Regular',
    fontSize: windowWith < 500 ? 20 : 30,
    textAlign: 'center',
    color: Colors.fontButtonHeader,
    marginBottom: 5
  },
  detailsContainer: {
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 17,
    paddingHorizontal: 5
  },
  detailsText: {
    fontFamily: 'open-sans',
    fontSize: windowWith < 500 ? 18 : 26,
    textAlign: 'center',
    color: Colors.greyDarken,
  },
  iconContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: windowWith < 500 ? 10 : 15,
    marginBottom: windowWith < 500 ? 15 : 20,

  },
});

export default MainMenuScr;
