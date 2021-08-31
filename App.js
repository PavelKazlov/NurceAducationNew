import React, { useState,  } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider,  } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';

import timeReducer from './store/redusers/counter-reducers';
import currentChkList from './store/redusers/chkList-reducers';
import orderReducer from './store/redusers/order-reducers';
import resultReducer from './store/redusers/result-reducers';
import {AppNavigator, AppDrawerNavigator} from './navigation/AppNavigator';
import dbReducers from './store/redusers/db-reducers';
import { initGroups, initStudents } from './utils/db';


initGroups()
  .then(() => {
    console.log('Initialized groups database');
  })
  .catch(err => {
    console.log('Initializing groups DB failed.');
    console.log(err);
  });

initStudents()
  .then(() => {
    console.log('Initialized students database');
  })
  .catch(err => {
    console.log('Initializing students DB failed.');
    console.log(err);
  });

  const rootReducer = combineReducers({
  database: dbReducers,
  testTime: timeReducer,
  checkList: currentChkList,
  orders: orderReducer,
  result: resultReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'RedHatDisplay_400Regular': require('./assets/fonts/RedHatDisplay-Regular.ttf'),
    'RedHatDisplay_700Bold': require('./assets/fonts/RedHatDisplay-Bold.ttf')
  });
};



export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store} >
      <NavigationContainer>
        {/* <AppNavigator /> */}
        <AppDrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}










// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
