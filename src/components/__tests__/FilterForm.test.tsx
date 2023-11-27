import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterForm from '../FilterForm';

describe('FilterForm Component', () => {
  test('renders FilterForm and interacts with form elements', () => {
    const mockOnGenderChange = jest.fn();
    const mockOnLocationChange = jest.fn();
    const mockOnApply = jest.fn();

    render(
      <FilterForm
        gender=""
        location=""
        onGenderChange={mockOnGenderChange}
        onLocationChange={mockOnLocationChange}
        onApply={mockOnApply}
      />
    );

    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /apply filters/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/gender/i), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { value: 'New York' } });
    fireEvent.click(screen.getByRole('button', { name: /apply filters/i }));

    expect(mockOnGenderChange).toHaveBeenCalledWith('Male');
    expect(mockOnLocationChange).toHaveBeenCalledWith('New York');
    expect(mockOnApply).toHaveBeenCalledTimes(1);
  });
});
