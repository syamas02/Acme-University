import React from 'react';
import { connect } from 'react-redux';
import School from './School';
import { Link } from 'react-router-dom';

const SchoolList = ({ schools }) => {
  return (
    <div>
      <ul>
        {schools.map(school => (
          <School key={school.id} school={school} />
        ))}
      </ul>
      <Link to="/schools/create">Create School</Link>
    </div>
  );
};

const mapStateToProps = ({ schools }) => {
  return { schools };
};
export default connect(mapStateToProps)(SchoolList);
