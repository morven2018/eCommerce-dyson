import { render } from '@testing-library/react';
import { AddressCard } from '../src/components/ui/cards/addressCard';
import { vi, describe, it, beforeEach } from 'vitest';
import React from 'react';

vi.mock('@components/common/forms/profile-forms/addUpdateAddresses', () => ({
  AddressForm: vi.fn(({ initialValues, onSubmit, isEditing }) => (
    <div data-testid="address-form">
      <input
        data-testid="country-input"
        value={initialValues.country || ''}
        readOnly
      />
      <input
        data-testid="city-input"
        value={initialValues.city || ''}
        readOnly
      />
      <button
        data-testid="submit-button"
        disabled={!isEditing}
        onClick={() =>
          onSubmit({
            ...initialValues,
            country: 'UpdatedCountry',
            city: 'UpdatedCity',
            street: 'UpdatedStreet',
            zipCode: '54321',
            streetLine2: 'UpdatedLine2',
            useAsBilling: true,
            useAsShipping: true,
            defaultBilling: true,
            defaultShipping: true,
          })
        }
      >
        Submit
      </button>
    </div>
  )),
}));

vi.mock('../modals/Modal', () => ({
  default: vi.fn(({ message, onClose }) => (
    <div data-testid="error-modal">
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  )),
}));

const address = {
  id: 'addr-1',
  country: 'US',
  city: 'New York',
  streetName: 'Main St',
  postalCode: '10001',
  streetNumber: '123',
};

const customer = {
  id: 'cust-1',
  version: 1,
};

const onAddressRemoved = vi.fn();
const onAddressUpdated = vi.fn();

describe('AddressCard Component', () => {
  beforeEach(() => {
    onAddressRemoved.mockClear();
    onAddressUpdated.mockClear();
  });

  it('prevents delete of default address', async () => {
    render(
      <AddressCard
        address={address}
        isBilling={true}
        isShipping={true}
        isDefaultBilling={true}
        isDefaultShipping={false}
        customerId={customer.id}
        customerVersion={customer.version}
        onAddressRemoved={onAddressRemoved}
        onAddressUpdated={onAddressUpdated}
      />
    );
  });
});
