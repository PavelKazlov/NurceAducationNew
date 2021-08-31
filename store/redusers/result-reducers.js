import {
  ADD_ROW_RESULT,
  SET_TEST_PARAMS,
  // CLEAR_TEST_PARAMS,
  CLEAR_ALL_RESULT,
  CLEAR_RESULT,
} from '../actions/result-actions';
import CheckListBodyRow from '../../models/chListBodyRow';

const initialState = {
  checkedRowsArr: [],
  testParams: {
    testDate: '',
    testGroup: '',
    testStudent: ''
  },
  resultArray: [],
  PDFuri: '',
  finaleGrade: 0.000
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROW_RESULT:
      const checkedRowItem = new CheckListBodyRow(
        action.rowId,
        action.rowSerialNum,
        action.rowTitle,
        action.rowAction,
        action.rowGrade,
        action.currGrade
      );

      let changedFinaleGrade = 0.000;
      let previousGrade = 0.000;
      let tempArr = state.resultArray;
      if (tempArr.length === 0 || tempArr === undefined) {
        tempArr.push(checkedRowItem);
        changedFinaleGrade = checkedRowItem.currentGrade;
      } else if (tempArr.length > 0) {
        const changedRow = tempArr.filter(arr => arr.id === action.rowId);
        for (const item of changedRow) {
          previousGrade = item.currentGrade;
        }

        const newCheckedRowsArr = tempArr.filter(arr => arr.id !== action.rowId);
        tempArr = newCheckedRowsArr;

        const newCheckedRowItem = new CheckListBodyRow(
          action.rowId,
          action.rowSerialNum,
          action.rowTitle,
          action.rowAction,
          action.rowGrade,
          action.currGrade
        );
        tempArr.push(newCheckedRowItem);
        // console.log('state.finaleGrade => ', state.finaleGrade );
        // console.log('previousGrade => ', previousGrade);
        // console.log('newCheckedRowItem => ', newCheckedRowItem.currentGrade);
        changedFinaleGrade = state.finaleGrade - previousGrade + newCheckedRowItem.currentGrade;
      }
      // console.log('changedFinaleGrade 2 => ', changedFinaleGrade);
      return {
        ...state,
        resultArray: tempArr,
        finaleGrade: changedFinaleGrade
      }
    // case CLEAR_RESULT:
    //   return {
    //     resultArray: [],
    //   }
    case CLEAR_RESULT:
      return {
        ...state,
        checkedRowsArr: [],
        resultArray: [],
        PDFuri: '',
        finaleGrade: 0.0
      }
    case CLEAR_ALL_RESULT:
      return {
        checkedRowsArr: [],
        testParams: {
          testDate: '',
          testGroup: '',
          testStudent: ''
        },
        resultArray: [],
        PDFuri: '',
        finaleGrade: 0.0
      }
    case SET_TEST_PARAMS:
      return {
        ...state,
        testParams: {
          testDate: action.curTestParams.date,
          testGroup: action.curTestParams.group,
          testStudent: action.curTestParams.student
        }
      }
    default:
      return state;
  }
}









// import  { ADD_ROW_RESULT }  from '../store/actions/result-actions';

// const initialState = {
//   resultArray: []
// };

// export default (state = initialState, action) => {
// //   console.log('result.checkList in reducer', action.rowResult);
//   switch (action.type) {
//     case ADD_ROW_RESULT:
//     //   console.log('result-reducer =>', action.rowResult);
//       return {
//         ...state,
//         resultArray: state.resultArray.concat(action.rowResult)
//         // resultArray: action.rowResult
//       }
//     default:
//       return state;
//   }
// }