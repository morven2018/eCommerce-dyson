import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AddressForm } from '../src/components/common/forms/profile-forms/addUpdateAddresses';
import '@testing-library/jest-dom/vitest';

describe('AddressForm', () => {
  const mockSubmit = vi.fn();

  const initialValues = {
    country: 'FR',
    city: 'New York',
    street: '123 Main St',
    zipCode: '10001',
    useAsShipping: true,
    useAsBilling: false,
    defaultShipping: false,
    defaultBilling: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly in add mode', () => {
    render(<AddressForm onSubmit={mockSubmit} />);

    expect(screen.getByText('Add New Address')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Use as Shipping Address')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Use as Billing Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Street')).toBeInTheDocument();
    expect(screen.getByLabelText('Street Address Line 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('renders correctly in edit mode with initial values', () => {
    render(
      <AddressForm
        onSubmit={mockSubmit}
        initialValues={initialValues}
        isEditing
      />
    );

    expect(screen.getByText('Edit Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Use as Shipping Address')).toBeChecked();
    expect(screen.getByLabelText('Use as Billing Address')).not.toBeChecked();
    expect(screen.getByDisplayValue('New York')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10001')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });
});
