import { Platform } from "react-native";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as Sharing from "expo-sharing";

import Colors from '../constants/Colors';
import { dinamicHTML } from './dinamicHTML';


const { setItem, getItem } = useAsyncStorage('@PDF_key');

export const simpleHtml = (chkListTitle, finaleGrade, testParams, result) => () =>
  createHTML({
    chkListTitle: chkListTitle,
    finaleGrade: finaleGrade,
    params: testParams,
    resultArr: result,
    // styles: `
    //   body {
    //     background: ${Colors.white};
    //   }
    //   .w3-container {
    //     background: ${Colors.grey};
    //   }
    // `,
  });


export const createHTML = ({
  chkListTitle = '',
  finaleGrade = '',
  params = {},
  resultArr = [],
  styles = "",
} = {}) => {
  const html_start = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Results PDF</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;700&display=swap');

          html {
              height: 100%;
          }
          body {
              font-size: 16px;
              margin: 0;
              color: ${Colors.black};
              min-height: 100%;
              overflow-x: hidden;
              font-family: 'Red Hat Display', sans-serif;
          }

          * {
              box-sizing: border-box;
          }

          @page {
              background: red;
          }

          h1 {
              margin-top: 0;
              text-align: center;
              background: rgb(255, 196, 0);
              padding: 30px;
              font-weight: 700;
          }

          .img-fluid {
              width: 100%;
              height: auto;
          }

          .container {
              padding: 15px;
          }

         

          ${styles}
      </style>
  </head>
  <body>
    `;

  const html_end = `
  </body>
  </html>
  `;

  const finaleHTML = html_start + dinamicHTML(chkListTitle, finaleGrade, params, resultArr) + html_end;

  return finaleHTML;
};



export const createPDFUri = async (html) => {
  // const { setItem } = useAsyncStorage('@PDF_key');
  try {
    const { uri } = await Print.printToFileAsync({ html });
    console.log('uri => ', uri);
    // load to AsyncStorage
    await setItem(uri);

  } catch (error) {
    throw error;
  }
};


export const savePDF = async (html) => {
  const uriPDF = await getItem();
  try {
    let isShared = false;
    const { uri } = await Print.printToFileAsync({ html });

    console.log('uri in savePDF=> ', uri);
    // load to AsyncStorage
    await setItem(uri);

    if (Platform.OS === "ios") {
      isShared = await Sharing.shareAsync(uri);
    } else {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        await MediaLibrary.createAssetAsync(uri);
        isShared = true;
      }
    }

    if (!isShared) {
      throw new Error("Something went wrong...");
    }
  } catch (error) {
    throw error;
  }
};



// export const createAndSavePDF = async (html) => {
//   const { setItem } = useAsyncStorage('@PDF_key');
//   try {
//     let isShared = false;
//     const { uri } = await Print.printToFileAsync({ html });

//     // load to AsyncStorage
//     await setItem(uri);

//     if (Platform.OS === "ios") {
//       isShared = await Sharing.shareAsync(uri);
//     } else {
//       const permission = await MediaLibrary.requestPermissionsAsync();
//       if (permission.granted) {
//         await MediaLibrary.createAssetAsync(uri);
//         isShared = true;
//       }
//     }

//     if (!isShared) {
//       throw new Error("Something went wrong...");
//     }
//   } catch (error) {
//     throw error;
//   }
// };




















// export const copyFromAssets = async (asset) => {
//   try {
//     await Asset.loadAsync(asset);
//     const { localUri } = Asset.fromModule(asset);

//     return localUri;
//   } catch (error) {
//     console.log(error);
//     throw err;
//   }
// };

// export const pickImage = async (fromCamera = false) => {
//   try {
//     const permissionPrefix = fromCamera ? "Camera" : "CameraRoll";
//     const launchPrefix = fromCamera ? "Camera" : "ImageLibrary";
//     const options = { allowsEditing: true, aspect: [1, 1] };

//     let hasAccess;
//     const { granted: alreadyHasAccess } = await ImagePicker[
//       `get${permissionPrefix}PermissionsAsync`
//     ]();
//     hasAccess = alreadyHasAccess;
//     if (!hasAccess) {
//       const { granted: requestedHasAccess } = await ImagePicker[
//         `request${permissionPrefix}PermissionsAsync`
//       ]();
//       hasAccess = requestedHasAccess;
//     }

//     if (hasAccess) {
//       return await ImagePicker[`launch${launchPrefix}Async`](options);
//     }

//     throw { message: "Permission denied" };
//   } catch (error) {
//     console.log(error);
//     return { cancelled: true };
//   }
// };

// export const processLocalImage = async (
//   imageUri = "",
//   optimize = false,
//   actions = []
// ) => {
//   try {
//     const format = 'png';

//     const options = { format, base64: Platform.OS === "ios" };
//     const allActions = actions || [];

//     if (optimize) {
//       options.compress = 0.1;
//       allActions.push({
//         resize: {
//           width: 400,
//         },
//       });
//     }

//     const { uri, base64 } = await ImageManipulator.manipulateAsync(
//       imageUri,
//       allActions,
//       options
//     );

//     return Platform.OS === "ios"
//       ? `data:image/${format};base64,${base64}`
//       : uri;
//   } catch (error) {
//     console.log(error);
//     return imageUri;
//   }
// };