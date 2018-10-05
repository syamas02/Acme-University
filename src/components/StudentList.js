import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';
import { Link } from 'react-router-dom';
import { loadStudents } from '../store';

const StudentList = ({ students }) => {
  return (
    <div>
      <div>
        <ul>
          {students.map(student => (
            <Student key={student.id} student={student} />
          ))}
        </ul>
        <Link to="/students/create">Create Student</Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ students }) => {
  return { students };
};
const mapDispatchToProps = dispatch => {
  return {
    loadStudents: () => dispatch(loadStudents()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentList);
