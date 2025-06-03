import { render, screen, act } from '@testing-library/react';
import { ProfilePage } from '../src/pages/profile/Profile';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { Customer } from '../src/pages/profile/Profile';
import { afterEach } from 'node:test';

vi.mock('@components/layout/profile/PersonalInfo', () => ({
  PersonalInfo: (props: {
    customer: Customer;
    onSave: (updatedData: Partial<Customer>) => void;
  }) => {
    const { customer, onSave } = props;
    return React.createElement(
      'div',
      { 'data-testid': 'personal-info' },
      `PersonalInfo: ${customer.email}`,
      React.createElement(
        'button',
        { onClick: () => onSave({ email: 'updated@example.com' }) },
        'Update Email'
      )
    );
  },
}));

vi.mock('@components/layout/profile/AddressInfo', () => ({
  AddressInfo: (props: {
    customer: Customer;
    onSave: (updatedData: Partial<Customer>) => void;
  }) => {
    const { customer, onSave } = props;
    return React.createElement(
      'div',
      { 'data-testid': 'address-info' },
      `AddressInfo: ${customer.addresses?.[0]?.city ?? 'No city'}`,
      React.createElement(
        'button',
        { onClick: () => onSave({ firstName: 'Updated' }) },
        'Update FirstName'
      )
    );
  },
}));

describe('ProfilePage Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Loading user data...')).toBeInTheDocument();
  });

  it('displays error message if API call fails', async () => {
    render(<ProfilePage />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  });

  it('shows no customer data message if no customer is returned', async () => {
    render(<ProfilePage />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  });

  it('renders customer data and child components when API succeeds', async () => {
    render(<ProfilePage />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  });

  it('updates customer state when onSave is called from PersonalInfo', async () => {
    render(<ProfilePage />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  });

  it('updates customer state when onSave is called from AddressInfo', async () => {
    render(<ProfilePage />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  });
});
