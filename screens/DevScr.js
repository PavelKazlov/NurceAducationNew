import React from 'react';
import {WebView} from 'react-native-webview';


function DevView() {


  return (
    <WebView
      source={{uri: 'https://csfs-2020.blogspot.com/2020/02/ms-excel-vba-cms-joomla-chronoforms.html#more'}}
    //   style={{marginTop: 20}}
      />
  );
}

export const screenOptions = navData => {
    return {
      headerTitle: 'Информация о разработчике',
      
    };
  };

export default DevView;