import  { SET_CHECKLIST, SET_CHECKLIST_TITLE }  from '../actions/chkList-actions';

const initialState = {
  selectedChkList: [],
  checkListTitle: ''
};

export default (state = initialState, action) => {
//   console.log('action.checkList in reducer', action.chkList);
  switch (action.type) {
    case SET_CHECKLIST:
      return {
        // ...state,
        selectedChkList: action.chkList
      }
      case SET_CHECKLIST_TITLE:
          return {
            ...state,
            checkListTitle: action.chklistTitle
          }
    default:
      return state;
  }
}