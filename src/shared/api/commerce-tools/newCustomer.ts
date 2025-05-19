import { Buffer } from 'buffer';
import { commercetoolsConfig } from './config';
import { IFormData } from '../../../components/common/forms/register-form/RegisterForm';
import { formatDate } from '../../utlis/date-utlis/date-formatter';

interface ICommerceToolsCustomer {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: {
    country: string;
    city: string;
    streetName: string;
    streetNumber?: string;
    postalCode: string;
    additionalAddressInfo?: string;
  }[];
  shippingAddresses: number[];
  billingAddresses: number[];
}

let authTokenCache: {
  token: string | null;
  expiresAt: number;
} = {
  token: null,
  expiresAt: 0,
};

async function getToken(): Promise<string | null> {
  if (authTokenCache.token && Date.now() < authTokenCache.expiresAt) {
    return authTokenCache.token;
  }

  const basicAuth = Buffer.from(
    `${commercetoolsConfig.clientId}:${commercetoolsConfig.clientSecret}`
  ).toString('base64');

  const response = await fetch(`${commercetoolsConfig.authUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: `manage_customers:${commercetoolsConfig.projectKey}`,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Auth failed: ${JSON.stringify(error)}`);
  }

  const tokenData = await response.json();
  authTokenCache = {
    token: tokenData.access_token,
    expiresAt: Date.now() + (tokenData.expires_in - 60) * 1000,
  };

  return authTokenCache.token;
}

async function checkCustomerExists(email: string, authToken: string) {
  try {
    const response = await fetch(
      `${commercetoolsConfig.apiUrl}/${commercetoolsConfig.projectKey}/customers?where=email="${encodeURIComponent(email)}"`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Check customer failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.count > 0;
  } catch {
    throw new Error('Failed to check customer existence');
  }
}

async function createCustomer(
  customerData: ICommerceToolsCustomer,
  authToken: string
) {
  const response = await fetch(
    `${commercetoolsConfig.apiUrl}/${commercetoolsConfig.projectKey}/customers`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(customerData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create customer: ${error.message}`);
  }

  return await response.json();
}

export async function register(data: IFormData) {
  const authToken = await getToken();
  if (typeof authToken === 'string') {
    const exists = await checkCustomerExists(data.email, authToken);
    if (exists) {
      throw new Error('Customer with this email already exists');
    }

    const customerData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      dateOfBirth: formatDate(new Date(data.dayOfBirth)),
      addresses: [
        {
          country: data.shippingAddress.country.toUpperCase(),
          city: data.shippingAddress.city,
          streetName: data.shippingAddress.street,
          streetNumber: data.shippingAddress.streetLine2 ?? '',
          postalCode: data.shippingAddress.zipCode,
          additionalAddressInfo: data.shippingAddress.defaultAddress
            ? 'Default billing address'
            : '',
        },
        {
          country: data.billingAddress.country.toUpperCase(),
          city: data.billingAddress.city,
          streetName: data.billingAddress.street,
          streetNumber: data.billingAddress.streetLine2 ?? '',
          postalCode: data.billingAddress.zipCode,
          additionalAddressInfo: data.billingAddress.defaultAddress
            ? 'Default billing address'
            : '',
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
      defaultShippingAddress: data.shippingAddress.defaultAddress
        ? 0
        : undefined,
      defaultBillingAddress: data.billingAddress.defaultAddress ? 1 : undefined,
    };

    const newCustomer = await createCustomer(customerData, authToken);
    return {
      customer: newCustomer,
      authData: {
        email: data.email,
        password: data.password,
      },
    };
  }
}
