import React from 'react';
import { connect } from 'react-redux';
import { deleteSchool } from '../store';
import { Link } from 'react-router-dom';

const School = ({ school, students }) => {
  return (
    <li>
      <Link className="schools" to={`/schools/${school.id}`}>
        {school.name} ({students().length})
      </Link>
    </li>
  );
};

const mapStateToProps = ({ students }, ownProps) => {
  return {
    students: () =>
      students.filter(student => student.schoolId === ownProps.school.id),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteSchool: school => dispatch(deleteSchool(school)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(School);
