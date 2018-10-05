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
    this.props
      .createSchool(this.state)
      .then(() => this.props.history.push('/schools'));
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    const school = this.state;
    const { handleChange, onSave } = this;
    return (
      <div className="schoolCreate">
      <SchoolForm
        handleChange={handleChange}
        onSave={onSave}
        school={school}
      />
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
