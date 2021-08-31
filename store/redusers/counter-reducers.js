import {
  SET_TEST_INTERVAL,
  SET_MAX_TIME
} from '../actions/counter-actions';


const initialState = {
  testInterval: '',
  // maxTestTime: 20
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEST_INTERVAL:
      return {
        ...state,
        testInterval: action.interval * 60
      }
    // case SET_MAX_TIME:

    //   return {
    //     ...state,
    //     maxTestTime: action.time
    //   }
    default:
      return state;
  }
}