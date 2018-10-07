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
    <div className="nav-tab">
      <div className="nav">
        <ul className="nav nav-tabs">
          &nbsp;
          <li className="nav-item">
            <Link
              className="nav-link"
              style={selected('/schools')}
              to="/schools"
            >
              Schools ({schools.length}){' '}
            </Link>
          </li>
          &nbsp;&nbsp;&nbsp;
          <li className="nav-item">
            <Link
              className="nav-link"
              style={selected('/students')}
              to="/students"
            >
              Students ({students.length}){' '}
            </Link>
          </li>
        </ul>
      </div>
      <h1>Acme Universities</h1>
      <img src="/public/university.jpg" alt="" width="700" height="100" />
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
