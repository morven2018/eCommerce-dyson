import { IAddress } from '@components/common/forms/register-form/RegisterForm';
import { Customer } from '@pages/profile/Profile';
import { commercetoolsConfig } from '../../config';
import { AddAddressOptions } from './addAddresses';
import { manageCustomerAddress } from './manageBillingShipping';
import { setDefaultAddress } from './setDefault';

export async function updateAddress(
  addressId: string,
  updatedAddress: IAddress,
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
    const updateResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: currentVersion,
        actions: [
          {
            action: 'changeAddress',
            addressId,
            address: {
              country: updatedAddress.country.toUpperCase(),
              city: updatedAddress.city,
              streetName: updatedAddress.street,
              streetNumber: updatedAddress.streetLine2 ?? '',
              postalCode: updatedAddress.zipCode,
            },
          },
        ],
      }),
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      throw new Error(error.message || 'Failed to update address');
    }

    const customer = await updateResponse.json();
    currentVersion = customer.version;
    let response = customer;

    const isBilling = addressType === 'billing' || addressType === 'both';
    const isShipping = addressType === 'shipping' || addressType === 'both';

    const previousBilling = addressId in customer.billingAddressIds;
    const previousShipping = addressId in customer.shippingAddressIds;

    if (isBilling && !previousBilling) {
      response = await manageCustomerAddress(
        'addBilling',
        addressId,
        customerId,
        currentVersion
      );
      currentVersion = response.version;
    }

    if (isShipping && !previousShipping) {
      response = await manageCustomerAddress(
        'addShipping',
        addressId,
        customerId,
        currentVersion
      );
      currentVersion = response.version;
    }

    if (!isBilling && previousBilling) {
      if (customer.defaultBillingAddressId !== addressId) {
        response = await manageCustomerAddress(
          'removeBilling',
          addressId,
          customerId,
          currentVersion
        );
        currentVersion = response.version;
      } else {
        throw new Error('You cannot delete type of the default address');
      }
    }

    if (!isShipping && previousShipping) {
      if (customer.defaultBillingAddressId !== addressId) {
        response = await manageCustomerAddress(
          'removeShipping',
          addressId,
          customerId,
          currentVersion
        );
        currentVersion = response.version;
      } else {
        throw new Error('You cannot delete type of the default address');
      }
    }

    if (options.setAsDefaultBilling) {
      response = await setDefaultAddress(
        'setDefaultBilling',
        addressId,
        customerId,
        currentVersion
      );
      currentVersion = response.version;
    }

    if (options.setAsDefaultShipping) {
      response = await setDefaultAddress(
        'setDefaultShipping',
        addressId,
        customerId,
        currentVersion
      );
      currentVersion = response.version;
    }

    if (
      (customer.defaultBillingAddressId === addressId &&
        !options.setAsDefaultBilling) ||
      (customer.defaultShippingAddressId === addressId &&
        !options.setAsDefaultShipping)
    )
      throw new Error(
        'To update default address choose another address and set default value'
      );

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
