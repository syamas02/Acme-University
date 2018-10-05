import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSchool } from '../store';
import SchoolForm from './SchoolForm';

class SchoolCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();

    const { name, address, description } = this.state;
    const objSchool = { name, address, description };

    console.log('schoolobj', objSchool);
    this.props
      .createSchool(objSchool)
      .then(() => this.props.history.push('/schools'));
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    const school = this.state;
    const { handleChange, onSave } = this;
    return (
      <div>
        <h4>School</h4>
        <div className="schoolCreate">
          <SchoolForm
            handleChange={handleChange}
            onSave={onSave}
            school={school}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSchool: school => dispatch(createSchool(school)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SchoolCreate);
