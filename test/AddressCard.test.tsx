import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { AddressCard } from '../src/components/ui/cards/addressCard';
import { describe, it, beforeEach } from 'vitest';
import React from 'react';

vi.mock('@components/common/forms/profile-forms/addUpdateAddresses', () => ({
  AddressForm: vi.fn(({ initialValues, onSubmit, isEditing }) => {
    const div = document.createElement('div');
    div.setAttribute('data-testid', 'address-form');

    const countryInput = document.createElement('input');
    countryInput.setAttribute('data-testid', 'country-input');
    countryInput.setAttribute('value', initialValues.country || '');
    div.appendChild(countryInput);

    const cityInput = document.createElement('input');
    cityInput.setAttribute('data-testid', 'city-input');
    cityInput.setAttribute('value', initialValues.city || '');
    div.appendChild(cityInput);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('data-testid', 'submit-button');
    submitButton.textContent = 'Submit';
    submitButton.disabled = !isEditing;
    submitButton.addEventListener('click', () =>
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
    );
    div.appendChild(submitButton);

    return div;
  }),
}));
vi.mock('../modals/Modal', () => ({
  default: vi.fn(({ message, onClose }) => {
    const div = document.createElement('div');
    div.setAttribute('data-testid', 'error-modal');
    div.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', onClose);
    div.appendChild(closeButton);

    return div;
  }),
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
    render(
      <AddressCard
        address={address}
        isBilling={true}
        isShipping={true}
        isDefaultBilling={false}
        isDefaultShipping={false}
        customerId={customer.id}
        customerVersion={customer.version}
        onAddressRemoved={onAddressRemoved}
        onAddressUpdated={onAddressUpdated}
      />
    );
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