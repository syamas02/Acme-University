import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store';
import StudentForm from './StudentForm';

class StudentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      gpa: '',
      schoolId: this.props.history.location.studentId
        ? this.props.history.location.studentId.id
        : null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onSave(ev) {
    const { schoolId } = this.state;
    const objSchool = {};
    Object.assign(objSchool, this.state, { schoolId, id: this.props.id });

    ev.preventDefault();
    this.props
      .createStudent(objSchool)
      .then(() => this.props.history.push('/students'));
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    const student = this.state;
    const { schools } = this.props;
    const { handleChange, onSave } = this;

    return (
      <div className="studentCreate">
        <h4>Student</h4>
        <StudentForm
          handleChange={handleChange}
          onSave={onSave}
          schools={schools}
          student={student}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ schools }) => {
  return {
    schools,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createStudent: student => dispatch(createStudent(student)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentCreate);
