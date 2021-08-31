export const ADD_ROW_RESULT = 'ADD_ROW_RESULT';
export const CLEAR_RESULT = 'CLEAR_RESULT';
export const CLEAR_ALL_RESULT = 'CLEAR_ALL_RESULT';
export const SET_TEST_PARAMS = 'SET_TEST_PARAMS';
// export const CLEAR_TEST_PARAMS = 'CLEAR_TEST_PARAMS';

export const addRowResult = (rowId, rowSerialNum, rowTitle, rowAction, rowGrade, currGrade) => {
  return {
    type: ADD_ROW_RESULT,
    rowId: rowId,
    rowSerialNum: rowSerialNum,
    rowTitle: rowTitle,
    rowAction: rowAction,
    rowGrade: rowGrade,
    currGrade: currGrade,
  }
};


export const clearResult = () => {
  return { type: CLEAR_RESULT }
};
export const clearAllResult = () => {
  return { type: CLEAR_ALL_RESULT }
};

export const setTestParams = (date, group, student) => {
  return {
    type: SET_TEST_PARAMS,
    curTestParams: {
      date: date,
      group: group,
      student: student,
    }
  }
};



// export const clearTestParams = () => {
//   return { type: CLEAR_TEST_PARAMS }
// };
