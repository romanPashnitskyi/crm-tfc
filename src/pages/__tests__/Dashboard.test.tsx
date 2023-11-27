import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';
import fetchUsers from '../../services/fetchUsers';
import { User } from '../../types/user';

jest.mock('../../services/fetchUsers', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockUsers: User[] = [
];

describe('Dashboard Component', () => {
  beforeEach(() => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  test('renders Dashboard and interacts with filter form', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Filter Users')).toBeInTheDocument();

    await waitFor(() => {
      mockUsers.forEach((user) => {
        expect(screen.getByText(user.firstName)).toBeInTheDocument();
        expect(screen.getByText(user.lastName)).toBeInTheDocument();
      });
    });

    fireEvent.change(screen.getByLabelText(/gender/i), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { value: 'New York' } });
    fireEvent.click(screen.getByRole('button', { name: /apply filters/i }));

    expect(fetchUsers).toHaveBeenCalled();
  });

});
