import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const CREATE_STUDENT = 'CREATE_STUDENT';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

const _loadSchools = schools => ({
  schools,
  type: LOAD_SCHOOLS,
});
const _loadStudents = students => ({
  students,
  type: LOAD_STUDENTS,
});

const _createStudent = student => ({
  student,
  type: CREATE_STUDENT,
});

const _createSchool = school => ({
  school,
  type: CREATE_SCHOOL,
});

const _updateStudent = student => ({
  student,
  type: UPDATE_STUDENT,
});

const _updateSchool = school => ({
  school,
  type: UPDATE_SCHOOL,
});

const _deleteStudent = student => ({
  student,
  type: DELETE_STUDENT,
});

const _deleteSchool = school => ({
  school,
  type: DELETE_SCHOOL,
});

const loadSchools = () => {
  return dispatch =>
    axios
      .get('/api/schools')
      .then(response => response.data)
      .then(schools => dispatch(_loadSchools(schools)));
};

const loadStudents = () => {
  return dispatch =>
    axios
      .get('/api/students')
      .then(response => response.data)
      .then(students => dispatch(_loadStudents(students)));
};

const createSchool = school => {
  return dispatch =>
    axios
      .post('/api/schools', school)
      .then(response => response.data)
      .then(school => dispatch(_createSchool(school)));
};

const createStudent = student => {
  console.log('student:', student);
  return dispatch =>
    axios
      .post('/api/students', student)
      .then(response => response.data)
      .then(student => dispatch(_createStudent(student)));
};

const updateSchool = school => {
  return dispatch =>
    axios
      .put(`/api/schools/${school.id}`, school)
      .then(response => response.data)
      .then(school => dispatch(_updateSchool(school)));
};

const updateStudent = student => {
  console.log('student in store: ', student);
  return dispatch =>
    axios
      .put(`/api/students/${student.id}`, student)
      .then(response => response.data)
      .then(student => {
        return dispatch(_updateStudent(student));
      });
};

const deleteSchool = school => {
  return dispatch =>
    axios
      .delete(`/api/schools/${school.id}`)
      .then(() => dispatch(_deleteSchool(school)));
};

const deleteStudent = student => {
  return dispatch =>
    axios
      .delete(`/api/students/${student.id}`)
      .then(() => dispatch(_deleteStudent(student)));
};

// const findSchoolById = (id) => (

// )

const schoolsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_SCHOOLS:
      state = action.schools;
      break;

    case CREATE_SCHOOL:
      state = [...state, action.school];
      break;

    case UPDATE_SCHOOL:
      state = state.filter(school => school.id !== action.school.id);
      state = [...state, action.school];
      console.log('state in store');
      break;

    case DELETE_SCHOOL: {
      state = state.filter(school => school.id !== action.school.id);
      break;
    }
    default:
      return state;
  }
  return state;
};

const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      state = action.students;
      break;
    case CREATE_STUDENT:
      state = [...state, action.student];
      break;
    case UPDATE_STUDENT:
      // state = state.filter(student => student.id !== action.student.id);
      // state = [...state, action.student];
      state = state.map(
        _student =>
          _student.id !== action.student.id ? _student : action.student
      );
      break;
    case DELETE_STUDENT:
      state = state.filter(student => student.id !== action.student.id);
      break;
    default:
      return state;
  }
  return state;
};

const reducer = combineReducers({
  schools: schoolsReducer,
  students: studentsReducer,
});
const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
export {
  loadSchools,
  loadStudents,
  createSchool,
  createStudent,
  updateSchool,
  updateStudent,
  deleteSchool,
  deleteStudent,
};
