import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectSchoolForm extends Component {
  constructor() {
    super();
    this.state = {
      schoolName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
  }

  handleChange(ev) {
    this.setState({ schoolName: ev.target.value });
  }

  render() {
    const { schools } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>School</label>
        <select value={this.state.schoolName} onChange={this.handleChange}>
          {schools.map(school => {
            return <option key={school.id}>{school.name}</option>;
          })}
        </select>
      </form>
    );
  }
}

const mapStateToProps = ({ schools }) => {
  return {
    schools,
  };
};

export default connect(mapStateToProps)(SelectSchoolForm);
