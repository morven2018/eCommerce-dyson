import { Customer, ResponseAddress } from '@pages/profile/Profile';
import { commercetoolsConfig } from '../../config';
import { IAddress } from '@components/common/forms/register-form/RegisterForm';
import { manageCustomerAddress } from './manageBillingShipping';
import { setDefaultAddress } from './setDefault';

export interface AddAddressOptions {
  setAsDefaultBilling?: boolean;
  setAsDefaultShipping?: boolean;
}

export async function addAddress(
  address: IAddress,
  customerId: string,
  version: number,
  options: AddAddressOptions = {},
  addressType?: 'billing' | 'shipping' | 'both' | 'none'
): Promise<Customer> {
  const accessToken = localStorage.getItem('authDysonToken');
  if (!accessToken) throw new Error('Authentication required');

  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const baseUrl = `${apiUrl}/${projectKey}/customers/${customerId}`;

  let currentVersion = version;

  try {
    // 1. First add the address
    const addResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: currentVersion,
        actions: [
          {
            action: 'addAddress',
            address: {
              country: address.country.toUpperCase(),
              city: address.city,
              streetName: address.street,
              streetNumber: address.streetLine2 ?? '',
              postalCode: address.zipCode,
            },
          },
        ],
      }),
    });

    if (!addResponse.ok) {
      console.log(await addResponse.text());
      const error = await addResponse.json();
      throw new Error(error.message + 'Failed to add address9');
    }

    const customer = await addResponse.json();
    const newAddress = customer.addresses.find(
      (a: ResponseAddress) =>
        a.streetName === address.street &&
        a.postalCode === address.zipCode &&
        a.city === address.city
    );

    if (!newAddress?.id) throw new Error('New address ID not found');

    const id = newAddress.id;

    currentVersion = customer.version;
    let response = customer;

    // 2. Set address type (billing/shipping/both) if specified
    if (addressType) {
      if (addressType === 'billing' || addressType === 'both') {
        response = await manageCustomerAddress(
          'addBilling',
          id,
          customerId,
          currentVersion
        );
        currentVersion = response.version;
      }

      if (addressType === 'shipping' || addressType === 'both') {
        response = await manageCustomerAddress(
          'addShipping',
          id,
          customerId,
          currentVersion
        );
        currentVersion = response.version;
      }
    }

    if (options.setAsDefaultBilling) {
      response = await setDefaultAddress(
        'setDefaultBilling',
        id,
        customerId,
        currentVersion
      );
      currentVersion = response.version;
    }

    if (options.setAsDefaultShipping) {
      response = await setDefaultAddress(
        'setDefaultShipping',
        id,
        customerId,
        currentVersion
      );
      currentVersion = response.version;
    }

    return response;
  } catch (error) {
    if (error instanceof Response) {
      const errorData = await error.json();
      if (error.status === 401) {
        localStorage.removeItem('authDysonToken');
      }
      throw new Error(errorData.message || `HTTP error ${error.status}`);
    }
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
}
