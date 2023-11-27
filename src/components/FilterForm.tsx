import React from 'react';
import { Form, Button } from 'react-bootstrap';

interface FilterFormProps {
  gender: string;
  location: string;
  onGenderChange: (gender: string) => void;
  onLocationChange: (location: string) => void;
  onApply: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  gender,
  location,
  onGenderChange,
  onLocationChange,
  onApply
}) => {
  return (
    <Form>
      <Form.Group controlId="genderSelect">
        <Form.Label>Gender</Form.Label>
        <Form.Control as="select" value={gender} onChange={(e) => onGenderChange(e.target.value)}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="locationInput">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={onApply}
        style={{ marginTop: '10px', marginBottom: '10px' }}
      >
        Apply Filters
      </Button>
    </Form>
  );
};

export default FilterForm;
