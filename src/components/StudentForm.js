import React from 'react';
import { Button } from 'reactstrap';

const StudentForm = ({ handleChange, onSave, onDelete, schools, student }) => {
  return (
    <form name="studentInfo">
      <label htmlFor="fname">first name: </label>
      <input
        className="mytext"
        name="firstname"
        type="text"
        value={student.firstname}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="lname">last name: </label>
      <input
        className="mytext"
        name="lastname"
        type="text"
        value={student.lastname}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="gpa">GPA: </label>

      <input
        style={{ width: '100px' }}
        name="gpa"
        type="number"
        min="0.0"
        max="4.0"
        step=".01"
        value={student.gpa || ''}
        onChange={handleChange}
      />
      <br />
      <label>School</label>
      <select name="schoolId" value={student.schoolId} onChange={handleChange}>
        <option value="">--select school-- </option>
        {schools.map(school => {
          return (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          );
        })}
      </select>
      <br />
      <div className="bt">
        <Button
          name="save"
          disabled={!(student.firstname && student.lastname)}
          color="primary"
          type="submit"
          onClick={onSave}
          data-toggle="popover"
          data-trigger="focus"
          data-content="Click anywhere in the document to close this popover"
        >
          > Save
        </Button>

        {onDelete ? (
          <Button color="danger" type="submit" onClick={onDelete}>
            Delete
          </Button>
        ) : (
          ''
        )}
      </div>
    </form>
  );
};

export default StudentForm;
