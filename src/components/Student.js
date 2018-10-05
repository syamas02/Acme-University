import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Student = ({ student, school }) => {
  return (
    <li>
      <Link className="students" to={`/students/${student.id}`}>
        {student.firstname} {student.lastname} ({school() ? school().name : ''})
      </Link>
    </li>
  );
};

const mapStateToProps = ({ schools }, ownProps) => {
  return {
    school: () =>
      schools.filter(school => school.id === ownProps.student.schoolId * 1)[0],
  };
};
export default connect(mapStateToProps)(Student);
