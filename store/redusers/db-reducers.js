import Group from '../../models/group';
import Student from '../../models/student';
import {
  LOAD_SELECTS,
  SET_GROUPS,
  SET_STUDENTS,
  ADD_GROUP,
  ADD_STUDENT,
  DELETE_GROUP,
  DELETE_STUDENT
} from '../actions/db-actions';

const initialState = {
  students: [{ label: '', value: '' }],
  groups: [{ label: '', value: '' }]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SELECTS:
      return {
        groups: action.groups.map(
          gr => new Group(
            gr.id.toString(),
            gr.group_label,
            gr.group_value
          )
        ),
        students: action.students.map(
          st => new Student(
            st.id.toString(),
            st.groups,
            st.stud_label,
            st.name_value
          )
        )
      }
    // case SET_GROUPS:
    //   return {
    //     groups: action.groups.map(
    //       gr => new Group(
    //         gr.id.toString(),
    //         gr.group_label,
    //         gr.group_value
    //       )
    //     )
    //   }
    // case SET_STUDENTS:
    //   return {
    //     students: action.students.map(
    //       st => new Student(
    //         st.id.toString(),
    //         st.groups,
    //         st.stud_label,
    //         st.name_value
    //       )
    //     )
    //   }
    // case DELETE_GROUP:
    //   // console.log(' state.groups = > ',  state.groups);
    //   return {
    //     groups: state.groups
    //   }
    // case ADD_GROUP:
    //   const newGroup = new Group(
    //     action.groupData.id.toString(),
    //     action.groupData.group_label,
    //     action.groupData.group_value
    //   )
    //   return {
    //     groups: action.groups.concat(newGroup)
    //   }
    default:
      return state;
  }
};