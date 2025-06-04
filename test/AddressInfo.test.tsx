/* eslint-disable react/prop-types */
import { render, screen, fireEvent } from '@testing-library/react';
import { AddressInfo } from '../src/components/layout/profile/AddressInfo';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom/vitest';

vi.mock('@mui/material', () => ({
  Button: ({ children, onClick, disabled, ...props }) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
  Dialog: ({ children, open, onClose }) =>
    open ? (
      <div data-testid="dialog">
        <button onClick={onClose} data-testid="dialog-close">
          Close
        </button>
        {children}
      </div>
    ) : null,
  DialogContent: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick, disabled, ...props }) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
  CloseIcon: () => <span>CloseIcon</span>,
}));

vi.mock('@components/ui/cards/addressCard', () => ({
  AddressCard: ({ address, onAddressRemoved, onAddressUpdated }) => (
    <div data-testid={`address-${address.id}`}>
      <button
        onClick={() =>
          onAddressRemoved({ removedAddressId: address.id, newVersion: 2 })
        }
      >
        Remove
      </button>
      <button
        onClick={() =>
          onAddressUpdated({
            addressId: address.id,
            newVersion: 2,
            updatedFields: {
              country: 'NewCountry',
              city: 'NewCity',
              street: 'NewStreet',
              zipCode: '12345',
              useAsBilling: false,
              useAsShipping: false,
              defaultBilling: false,
              defaultShipping: false,
            },
          })
        }
      >
        Update
      </button>
    </div>
  ),
}));

vi.mock('@components/common/forms/profile-forms/addUpdateAddresses', () => ({
  AddressForm: ({ onSubmit, onCancel }) => (
    <div data-testid="address-form">
      <input data-testid="country-input" />
      <input data-testid="city-input" />
      <button
        onClick={() =>
          onSubmit({
            country: 'TestCountry',
            city: 'TestCity',
            street: 'TestStreet',
            zipCode: '12345',
            useAsBilling: true,
            useAsShipping: true,
            defaultBilling: true,
            defaultShipping: true,
          })
        }
      >
        Submit
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

vi.mock('@components/ui/modals/Modal', () => ({
  default: ({ message, onClose }) => (
    <div data-testid="error-modal">
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const customer = {
  id: '123',
  version: 1,
  addresses: [
    { id: 'addr-1', country: 'USA', city: 'New York' },
    { id: 'addr-2', country: 'UK', city: 'London' },
  ],
  billingAddressIdList: ['addr-1'],
  shippingAddressIds: ['addr-2'],
  defaultBillingAddressId: 'addr-1',
  defaultShippingAddressId: 'addr-2',
};

const onSave = vi.fn();

describe('AddressInfo Component', () => {
  beforeEach(() => {
    render(<AddressInfo customer={customer} onSave={onSave} />);
  });

  it('renders with no addresses when addresses array is empty', () => {
    render(
      <AddressInfo customer={{ ...customer, addresses: [] }} onSave={onSave} />
    );
    expect(screen.getByText('No saved addresses')).toBeInTheDocument();
  });

  it('renders addresses correctly', () => {
    expect(screen.getByTestId('address-addr-1')).toBeInTheDocument();
    expect(screen.getByTestId('address-addr-2')).toBeInTheDocument();
    expect(screen.getByText('Add address')).toBeInTheDocument();
  });

  it('opens and closes dialog', () => {
    const addButton = screen.getByText('Add address');
    fireEvent.click(addButton);
    expect(screen.getByTestId('dialog')).toBeInTheDocument();

    const closeButton = screen.getByTestId('dialog-close');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });
});
