import {
  fetchGroups,
  fetchStudents,
  insertStudent,
  insertGroup,
  deleteGroup,
  deleteStudent
} from '../../utils/db';


export const LOAD_SELECTS = 'LOAD_SELECTS';
export const SET_GROUPS = 'SET_GROUPS';
export const SET_STUDENTS = 'SET_STUDENTS';
export const ADD_GROUP = 'ADD_GROUP';
export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_GROUP = 'DELETE_GROUP';
export const DELETE_STUDENT = 'DELETE_STUDENT';



export const loadSelects = () => {
  return async dispatch => {
    try {
      const dbGroupsResult = await fetchGroups();
      const dbStudentsResult = await fetchStudents();
      //  console.log('dbGroupsResult.rows._array => ', dbGroupsResult.rows._array);
      //  console.log('dbStudentsResult.rows._array => ', dbStudentsResult.rows._array);
      dispatch({
        type: LOAD_SELECTS,
        groups: dbGroupsResult.rows._array,
        students: dbStudentsResult.rows._array,
      });
    } catch (err) {
      throw err;
    }

  }
};



// export const loadGroups = () => {
//   return async dispatch => {
//     try {
//       const dbResult = await fetchGroups();
//        console.log(dbResult.rows._array);
//       dispatch({ type: SET_GROUPS, groups: dbResult.rows._array });
//     } catch (err) {
//       throw err;
//     }

//   }
// };



// export const loadStudents = () => {
//   return async dispatch => {
//     try {
//       const dbResult = await fetchStudents();
//       //  console.log(dbResult);
//       dispatch({ type: SET_STUDENTS, students: dbResult.rows._array });
//     } catch (err) {
//       throw err;
//     }

//   }
// };


export const addGroup = (label, value) => {
  return async dispatch => {
    try {
      // adding to SQLight DB
      const dbResult = await insertGroup(label, value);
      console.log('dbResult Group => ', dbResult);
      dispatch({
        type: ADD_GROUP,
        groupData: {
          id: dbResult.insertId,
          group_label: label,
          group_value: value,
        }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  }
};


export const addStudent = (studentGroup, label, name) => {
  return async dispatch => {
    try {
      // adding to SQLight DB
      const dbResult = await insertStudent(studentGroup, label, name);
      console.log('dbResult => ', dbResult);
      dispatch({
        type: ADD_STUDENT,
        studentData: {
          id: dbResult.insertId,
          student_group: studentGroup,
          student_label: label,
          student_value: name
        }
      });
    } catch (error) {
      console.log(error);
      throw error
    }
  }
};


export const deleteStudents = (curId) => {
  return async dispatch => {
    try {
      // deleting from SQLight DB
      const dbResult = await deleteStudent(curId);
      dispatch({ type: DELETE_STUDENT, delStudent: curId });
    } catch (err) {
      throw err;
    }

  }
}


export const deleteGroups = (curId) => {
  return async dispatch => {
    try {
      // deleting from SQLight DB
      const dbResult = await deleteGroup(curId);
      dispatch({ type: DELETE_GROUP, delGroup: curId });
    } catch (err) {
      throw err;
    }

  }
}




