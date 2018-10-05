import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { updateStudent } from '../store';

class Enrollment extends Component {
  constructor() {
    super();
    this.state = {
      id1: '',
      id2: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onUnregister = this.onUnregister.bind(this);
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onUnregister(ev) {
    ev.preventDefault();
    console.log('this.state:', this.state);
    this.props.updateStudent({ id: this.state.id1, schoolId: null });
  }

  onRegister(ev) {
    ev.preventDefault();
    console.log('this.state:', this.state);
    this.props.updateStudent({
      id: this.state.id2,
      schoolId: this.props.id,
    });
  }

  render() {
    const { students } = this.props;
    const { onRegister, onUnregister, handleChange } = this;
    console.log('students: ', students);
    return (
      <div className="enrollUnenroll">
        <div className="unenroll">
          <select
            className="myselect"
            name="id1"
            value={this.state.id1 * 1}
            onChange={handleChange}
          >
            <option value="">--select student to unenroll--</option>
            {students.map(
              student =>
                student.schoolId === this.props.id ? (
                  <option key={student.id} name="id1" value={student.id}>
                    {student.firstname} {student.lastname}
                  </option>
                ) : null
            )}
          </select>
          <div className="enrollmentButtons">
            <Button
              disabled={!this.state.id1}
              size="sm"
              color="warning"
              onClick={onUnregister}
            >
              Unenroll Student
            </Button>
          </div>
        </div>
        <div className="enroll">
          <select
            className="myselect"
            name="id2"
            value={this.state.id2 * 1}
            onChange={handleChange}
          >
            <option value="">--select student to enroll--</option>
            {students.map(
              student =>
                student.schoolId !== this.props.id ? (
                  <option key={student.id} name="id2" value={student.id}>
                    {student.firstname} {student.lastname}
                  </option>
                ) : null
            )}
          </select>
          <div className="enrollmentButtons">
            <Button
              disabled={!this.state.id2}
              size="sm"
              color="info"
              onClick={onRegister}
            >
              Enroll Student
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateStudent: student => dispatch(updateStudent(student)),
});

export default connect(
  null,
  mapDispatchToProps
)(Enrollment);
