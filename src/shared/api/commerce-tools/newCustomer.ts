import { Buffer } from 'buffer';
import { commercetoolsConfig } from './config';
import { IFormData } from '@components/common/forms/register-form/RegisterForm';
import { formatDate } from '@shared/utlis/date-utlis/date-formatter';

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
    phone?: string;
    additionalAddressInfo?: string;
  }[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  custom?: {
    type: {
      typeId: string;
      key: string;
    };
    fields: {
      [key: string]: string | boolean;
    };
  };
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
      scope: `manage_customers:${commercetoolsConfig.projectKey} manage_types:${commercetoolsConfig.projectKey} manage_orders:${commercetoolsConfig.projectKey}`,
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

async function checkCustomerExists(
  email: string,
  authToken: string
): Promise<boolean> {
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

async function checkTypeExists(
  typeKey: string,
  authToken: string
): Promise<boolean> {
  const response = await fetch(
    `${commercetoolsConfig.apiUrl}/${commercetoolsConfig.projectKey}/types/key=${typeKey}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.ok;
}

async function createCustomerType(authToken: string): Promise<void> {
  const typeDefinition = {
    key: 'customer',
    name: {
      en: 'Customer Custom Fields',
    },
    description: {
      en: 'Additional customer information including phone number',
    },
    resourceTypeIds: ['customer'],
    fieldDefinitions: [
      {
        name: 'phone',
        label: {
          en: 'Phone Number',
        },
        type: {
          name: 'String',
        },
        required: false,
        inputHint: 'SingleLine',
      },
    ],
  };

  try {
    const response = await fetch(
      `${commercetoolsConfig.apiUrl}/${commercetoolsConfig.projectKey}/types`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(typeDefinition),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create type: ${JSON.stringify(error)}`);
    }
  } catch {
    throw new Error('Can not add phone number');
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
    throw new Error(`Failed to create customer: ${JSON.stringify(error)}`);
  }

  return await response.json();
}

export async function register(data: IFormData) {
  const authToken = await getToken();
  if (!authToken) throw new Error('Authentication failed');

  const typeExists = await checkTypeExists('customer', authToken);
  if (!typeExists) {
    await createCustomerType(authToken);
  }

  const exists = await checkCustomerExists(data.email, authToken);
  if (exists) {
    throw new Error(
      'Customer with this email already exists. Please login instead'
    );
  }

  const shippingAddress = data.shippingAddress;
  const billingAddress = data.billingAddress;

  const areAddressesEqual =
    shippingAddress.country.toUpperCase() ===
      billingAddress.country.toUpperCase() &&
    shippingAddress.city === billingAddress.city &&
    shippingAddress.street === billingAddress.street &&
    shippingAddress.streetLine2 === billingAddress.streetLine2 &&
    shippingAddress.zipCode === billingAddress.zipCode;

  const customerData: ICommerceToolsCustomer = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    dateOfBirth: formatDate(new Date(data.dayOfBirth)),
    addresses: [],
    shippingAddresses: [],
    billingAddresses: [],
    custom: {
      type: {
        typeId: 'type',
        key: 'customer',
      },
      fields: {
        phone: data.phone,
      },
    },
  };

  if (areAddressesEqual) {
    customerData.addresses.push({
      country: shippingAddress.country.toUpperCase(),
      city: shippingAddress.city,
      streetName: shippingAddress.street,
      streetNumber: shippingAddress.streetLine2 ?? '',
      postalCode: shippingAddress.zipCode,
    });

    customerData.shippingAddresses.push(0);
    customerData.billingAddresses.push(0);

    if (shippingAddress.defaultAddress) {
      customerData.defaultShippingAddress = 0;
    }
    if (billingAddress.defaultAddress) {
      customerData.defaultBillingAddress = 0;
    }
  } else {
    customerData.addresses.push({
      country: shippingAddress.country.toUpperCase(),
      city: shippingAddress.city,
      streetName: shippingAddress.street,
      streetNumber: shippingAddress.streetLine2 ?? '',
      postalCode: shippingAddress.zipCode,
    });

    customerData.addresses.push({
      country: billingAddress.country.toUpperCase(),
      city: billingAddress.city,
      streetName: billingAddress.street,
      streetNumber: billingAddress.streetLine2 ?? '',
      postalCode: billingAddress.zipCode,
    });

    customerData.shippingAddresses.push(0);
    customerData.billingAddresses.push(1);

    if (shippingAddress.defaultAddress) {
      customerData.defaultShippingAddress = 0;
    }
    if (billingAddress.defaultAddress) {
      customerData.defaultBillingAddress = 1;
    }
  }

  const newCustomer = await createCustomer(customerData, authToken);

  return {
    customer: newCustomer,
    authData: {
      email: data.email,
      password: data.password,
    },
  };
}
