import React from 'react';
import { Button } from 'reactstrap';

const SchoolForm = ({ handleChange, onSave, school, onDelete }) => {
  return (
    <form name="schoolCreateUpdate">
      <label htmlFor="name">name: </label>
      <input
        className="mytext"
        name="name"
        type="text"
        value={school.name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="address">address: </label>
      <input
        className="mytext"
        name="address"
        type="text"
        value={school.address}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="description">description: </label>
      <input
        className="mytext"
        name="description"
        value={school.description}
        type="text"
        onChange={handleChange}
      />
      <br />
      <div className="bt">
        <Button
          color="primary"
          type="submit"
          onClick={onSave}
          disabled={!school.name}
        >
          Save
        </Button>
        {onDelete ? (
          <Button color="danger" type="submit" onClick={onDelete}>
            Delete
          </Button>
        ) : null}
      </div>
    </form>
  );
};

export default SchoolForm;
