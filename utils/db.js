import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('students.db');

export const initStudents = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //   tx.executeSql('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
      tx.executeSql('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY NOT NULL, groups TEXT NOT NULL, stud_label TEXT NOT NULL, name_value TEXT NOT NULL);',
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const initGroups = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY NOT NULL, group_label TEXT NOT NULL, group_value TEXT NOT NULL);',
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// export const insertPlace = (title, imageUri, address, lat, lng) => {
export const insertStudent = (studentGroup, studentLabel, nameValue) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // tx.executeSql('INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
      //   [title, imageUri, address, lat, lng],
      tx.executeSql('INSERT INTO students (groups, stud_label, name_value) VALUES (?, ?, ?);',
        [studentGroup, studentLabel, nameValue],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};


export const insertGroup = (groupLabel, groupValue) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // tx.executeSql('INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
      //   [title, imageUri, address, lat, lng],
      tx.executeSql('INSERT INTO groups (group_label, group_value) VALUES (?, ?);',
        [groupLabel, groupValue],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// export const fetchPlaces = () => {
export const fetchStudents = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM students',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchGroups = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM groups',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};


// export const deletePlace = (curId) => {
export const deleteStudent = (curId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM students WHERE id = (?);',
        [curId],
        // tx.executeSql(`DELETE FROM students WHERE id = ${curId};`,
        // [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteGroup = (curId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM groups WHERE id = (?);',
        [curId],
        // tx.executeSql(`DELETE FROM students WHERE id = ${curId};`,
        // [],
        (_, result) => {
          // console.log(result.rows._array);
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};