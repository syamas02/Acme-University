import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent, updateStudent } from '../store';
import StudentForm from './StudentForm';

class StudentUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      gpa: '',
      schoolId: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.fetchStudentByID(this.props.id);
  }

  fetchStudentByID(id) {
    this.props
      .fetchStudent(id)
      .then(response => response.data)
      .then(student =>
        this.setState({
          firstname: student.firstname,
          lastname: student.lastname,
          gpa: student.gpa,
          schoolId: student.schoolId === null ? '' : student.schoolId,
        })
      );
  }

  onSave(ev) {
    ev.preventDefault();
    const objStudent = {};

    Object.assign(objStudent, this.state, { id: this.props.id });
    if (objStudent.schoolId === '') objStudent.schoolId = null;
    if (objStudent.gpa === '') objStudent.gpa = null;
    if ((objStudent.gpa >= 0 && objStudent.gpa <= 4) || objStudent === null) {
      this.props
        .updateStudent(objStudent)
        .then(() => this.props.history.push('/students'));
    }
  }
  onDelete(ev) {
    ev.preventDefault();
    this.props
      .deleteStudent({ id: this.props.id })
      .then(() => this.props.history.push('/students'));
  }
  handleChange(ev) {
    if ([ev.target.name] === 'studentId' && ev.target.value === null) {
      this.setState({ studentId: '' });
    } else if ([ev.target.name] === 'gpa' && ev.target.value === null) {
      this.setState({ gpa: '' });
    } else {
      this.setState({ [ev.target.name]: ev.target.value });
    }
  }

  render() {
    const student = this.state;
    const { schools } = this.props;
    const { handleChange, onSave, onDelete } = this;
    return (
      <div>
        <h4>
          {student.firstname} {student.lastname}
        </h4>
        <div className="studentUpdate">
          <StudentForm
            handleChange={handleChange}
            onSave={onSave}
            onDelete={onDelete}
            schools={schools}
            student={student}
          />
        </div>
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
    deleteStudent: student => dispatch(deleteStudent(student)),
    updateStudent: student => dispatch(updateStudent(student)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentUpdate);
