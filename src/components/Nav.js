import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ schools, students, path }) => {
  const selected = _path => {
    const style = {};
    if (path === _path) {
      style.fontWeight = 'bold';
      style.color = 'blue';
    }
    return style;
  };
  return (
    <div>
      <div className="nav">
        <Link style={selected('/schools')} to="/schools">
          Schools ({schools.length}){' '}
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link style={selected('/students')} to="/students">
          Students ({students.length}){' '}
        </Link>
      </div>
      <img src="/public/school.jpg" alt="" width="450" height="75" />
    </div>
  );
};

const mapStateToProps = ({ schools, students }) => {
  return {
    schools,
    students,
  };
};
export default connect(mapStateToProps)(Nav);
