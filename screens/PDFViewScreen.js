// import React, { useState } from 'react';
// import { Button, Text, View, StyleSheet } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
// import Constants from 'expo-constants';

// export default function App() {
//   const [result, setResult] = useState(null);

//   const _handlePressButtonAsync = async () => {
//     // let result = await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1B_rsEpEmpy2h7d7F6qgLPrvfEzwBwwst/view?usp=sharing');
//     let result = await WebBrowser.openBrowserAsync('https://drive.google.com/file/d/1B_rsEpEmpy2h7d7F6qgLPrvfEzwBwwst/view?usp=sharing');
//     setResult(result);
//   };
//   return (
//     <View style={styles.container}>
//       <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
//       <Text>{result && JSON.stringify(result)}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//   },
// });





/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Pdf from 'react-native-pdf';


const PDFReader = props => {

  const curPDFName = props.route.params?.PDFfile;
  const curPDFuri = props.route.params?.PDFuri;
  const curOrder = useSelector(state => state.orders.currentOrder);

  // console.log('curPDFInst =>', curPDFInst);
  //  const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
  //  const source = {uri:'https://firebasestorage.googleapis.com/v0/b/nurce-aducation.appspot.com/o/instructions%2F530.pdf?alt=media&token=a6e6ca1e-23ea-4ead-b1f1-09f82151b74f',cache:true};
  //  const source = require('../assets/530.pdf');  // ios only
  let source;
  if (curPDFName != undefined && curPDFuri === undefined) {
    source = { uri: `bundle-assets://${curOrder}/${curPDFName}.pdf` };
  } else if (curPDFuri != undefined && curPDFName === undefined) {
    source = {uri: curPDFuri};
  } else {
    const errorScr = <View style={styles.centred}><Text>Извините, возникли проблеммы с отображением PDF файла!</Text></View>
    return errorScr;
  }
  //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          // console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          // console.log(`Link presse: ${uri}`)
        }}
        style={styles.pdf} />
    </View>
  )

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
  },
  centred: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default PDFReader;



//  export default class PDFExample extends React.Component {
//      render() {
//         //  const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
//         //  const source = {uri:'https://firebasestorage.googleapis.com/v0/b/nurce-aducation.appspot.com/o/instructions%2F530.pdf?alt=media&token=a6e6ca1e-23ea-4ead-b1f1-09f82151b74f',cache:true};
//         //  const source = require('../assets/530.pdf');  // ios only
//          const source = {uri:'bundle-assets://530.pdf'};
//         //  const source = {uri:'bundle-assets://530.pdf'};

//          //const source = {uri:'file:///sdcard/test.pdf'};
//          //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

//          return (
//              <View style={styles.container}>
//                  <Pdf
//                      source={source}
//                      onLoadComplete={(numberOfPages,filePath)=>{
//                          console.log(`number of pages: ${numberOfPages}`);
//                      }}
//                      onPageChanged={(page,numberOfPages)=>{
//                          console.log(`current page: ${page}`);
//                      }}
//                      onError={(error)=>{
//                          console.log(error);
//                      }}
//                      onPressLink={(uri)=>{
//                          console.log(`Link presse: ${uri}`)
//                      }}
//                      style={styles.pdf}/>
//              </View>
//          )
//    }
//  }

//  const styles = StyleSheet.create({
//      container: {
//          flex: 1,
//          justifyContent: 'flex-start',
//          alignItems: 'center',
//          marginTop: 25,
//      },
//      pdf: {
//          flex:1,
//          width:Dimensions.get('window').width,
//          height:Dimensions.get('window').height,
//      }
//  });





// import * as React from 'react'
// // import { View } from 'react-native'
// import PDFReader from 'rn-pdf-reader-js'

// export default class App extends React.Component {
//   render() {
//     return (
//       <PDFReader
//         source={{
//           // uri: 'https://firebasestorage.googleapis.com/v0/b/nurce-aducation.appspot.com/o/instructions%2F530.pdf?alt=media&token=a6e6ca1e-23ea-4ead-b1f1-09f82151b74f',
//           uri: 'https://firebasestorage.googleapis.com/v0/b/nurce-aducation.appspot.com/o/instructions%2F530.pdf?alt=media&token=a6e6ca1e-23ea-4ead-b1f1-09f82151b74f',
//           // uri: 'https://drive.google.com/file/d/1B_rsEpEmpy2h7d7F6qgLPrvfEzwBwwst/view?usp=sharing',
//         }}
//       />
//     )
//   }
// }




// import React from 'react';
// // import { Default } from '../layouts';

// import {WebView} from 'react-native-webview';


// function PdfReader() {

//   // const { name } = route.params;

//   return (
//     <WebView
//       source={{uri: 'https://drive.google.com/file/d/1B_rsEpEmpy2h7d7F6qgLPrvfEzwBwwst/view?usp=sharing'}}
//       // source={ require('../assets/530.pdf')}
//       style={{marginTop: 20}}
//       />
//   );
// }

// export default PdfReader;




