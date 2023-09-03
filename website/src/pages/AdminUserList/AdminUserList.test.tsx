import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminUserList from './index';
import React from 'react';

describe('AdminUserList', () => {

  test('should render without crashing', () => {
    render(<AdminUserList />);
  });


  test('renders AdminUserList component', () => {
    render(<AdminUserList/>);
    screen.getByText('Invite New');
    screen.getByText('Set Active');
    screen.getByText('Set Inactive');
  });

  test('should show modal when Invite New button is clicked', async () => {
    render(<AdminUserList />);

    fireEvent.click(screen.getByText(/Invite New/i));

    expect(screen.getByText(/Send/i)).toBeInTheDocument();
  });

  test('should close modal when cancel button is clicked', async () => {
    render(<AdminUserList />);

    fireEvent.click(screen.getByText(/Invite New/i));
    fireEvent.click(screen.getByText(/Cancel/i));

    expect(screen.queryByText(/Send Invitations/i)).not.toBeInTheDocument();
  });








  // Add more tests to cover different scenarios and edge cases
});
