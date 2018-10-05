import React, { Component } from 'react';
import { connect } from 'react-redux';
import SchoolForm from './SchoolForm';
// import StudentsToAdd from './StudentsToAdd';
import Enrollment from './Enrollment';
import { Link } from 'react-router-dom';
import { updateSchool, deleteSchool, deleteStudent } from '../store';
import { Button } from 'reactstrap';

class SchoolUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.fetchSchoolById = this.fetchSchoolById.bind(this);

    this.fetchSchoolById(this.props.id);
  }
  onSave(ev) {
    ev.preventDefault();
    this.props
      .updateSchool(Object.assign({}, this.state, { id: this.props.id }))
      .then(() => this.props.history.push('/schools'));
  }

  onDelete(ev) {
    ev.preventDefault();
    this.props
      .deleteSchool({ id: this.props.id })
      .then(() => this.props.history.push('/schools'));
  }
  fetchSchoolById(id) {
    this.props
      .fetchSchool(id)
      .then(response => response.data)
      .then(school =>
        this.setState({
          name: school.name,
          address: school.address,
          description: school.description,
        })
      );
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    const school = this.state;
    const { handleChange, onSave, onDelete } = this;
    const { students, id } = this.props;

    return (
      <div>
        <h4> {school.name} </h4>
        <div className="schoolUpdate">
          <SchoolForm
            handleChange={handleChange}
            onSave={onSave}
            onDelete={onDelete}
            school={school}
          />
          <div className="enrollment">
            <Enrollment students={students} id={id} />

            <Link to={{ pathname: '/students/create', studentId: { id } }}>
              <Button color="secondary">Add New Student</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ students }) => {
  return {
    students,
  };
};
const mapDispatchToProps = dispatch => ({
  updateSchool: school => dispatch(updateSchool(school)),
  deleteSchool: school => dispatch(deleteSchool(school)),
  deleteStudent: student => dispatch(deleteStudent(student)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolUpdate);
