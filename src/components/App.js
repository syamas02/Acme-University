import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import StudentList from './StudentList';
import SchoolList from './SchoolList';
import SchoolCreate from './SchoolCreate';
import SchoolUpdate from './SchoolUpdate';
import StudentCreate from './StudentCreate';
import StudentUpdate from './StudentUpdate';
import { loadSchools, loadStudents } from '../store';
import { connect } from 'react-redux';
import axios from 'axios';

class App extends Component {
  fetchStudent(id) {
    return axios.get(`/api/students/${id}`);
  }

  fetchSchool(id) {
    return axios.get(`/api/schools/${id}`);
  }

  componentDidMount() {
    this.props.init();
  }
  render() {
    const renderNav = ({ location }) => <Nav path={location.pathname} />;
    const renderSchoolList = () => <SchoolList />;
    const renderStudentList = () => (
      <StudentList students={this.props.students} />
    );
    const renderStudentUpdate = ({ match, history }) => (
      <StudentUpdate
        history={history}
        id={match.params.id * 1}
        fetchStudent={this.fetchStudent}
      />
    );

    const renderSchoolUpdate = ({ match, history }) => (
      <SchoolUpdate
        id={match.params.id * 1}
        history={history}
        fetchSchool={this.fetchSchool}
      />
    );

    const renderStudentCreate = ({ history }) => (
      <StudentCreate history={history} />
    );
    const renderSchoolCreate = ({ history }) => (
      <SchoolCreate history={history} />
    );

    return (
      <Router>
        <div className="app">
          <Route render={renderNav} />
          <Route exact path="/schools" render={renderSchoolList} />
          <Switch>
            <Route path="/schools/create" render={renderSchoolCreate} />
            <Route path="/schools/:id" render={renderSchoolUpdate} />
          </Switch>
          <Route exact path="/students" render={renderStudentList} />
          <Switch>
            <Route path="/students/create" render={renderStudentCreate} />
            <Route path="/students/:id" render={renderStudentUpdate} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = ({ schools, students }) => {
  return {
    schools,
    students,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(loadSchools());
      dispatch(loadStudents());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
