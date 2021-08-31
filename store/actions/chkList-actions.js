export const SET_CHECKLIST = 'SET_CHECKLIST';
export const SET_CHECKLIST_TITLE = 'SET_CHECKLIST_TITLE';


export const setChecklist = selectedChklist => {
    // console.log('selectedChklist=>', selectedChklist);
    return { type: SET_CHECKLIST, chkList: selectedChklist }
};

export const setChecklistTitle = (title) => {
    return { type: SET_CHECKLIST_TITLE, chklistTitle: title }
  };