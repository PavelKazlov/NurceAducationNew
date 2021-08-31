import { SET_ORDER } from '../actions/order-actions';

const initialState = {
  currentOrder: ''
};

export default (state = initialState, action) => {
  // console.log('action.order in reducer', action.order);
  switch (action.type) {
    case SET_ORDER:
      // console.log('order-reducer =>', action.order);
      return {
        ...state,
        currentOrder: action.order
      }
    default:
      return state;
  }
}