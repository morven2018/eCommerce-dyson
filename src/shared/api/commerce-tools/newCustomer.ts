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

  try {
    const response = await fetch(`${commercetoolsConfig.authUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        // Используем только разрешенные scope из сообщения об ошибке
        scope: `manage_customers:${commercetoolsConfig.projectKey} manage_types:${commercetoolsConfig.projectKey}`,
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
  } catch (error) {
    console.error('Failed to get auth token:', error);
    throw error;
  }
}

// Остальные функции остаются без изменений
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
  } catch (error) {
    console.error('Failed to check customer existence:', error);
    throw new Error('Failed to check customer existence');
  }
}

async function checkTypeExists(
  typeKey: string,
  authToken: string
): Promise<boolean> {
  try {
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
  } catch (error) {
    console.error('Error checking type existence:', error);
    return false;
  }
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
  } catch (error) {
    console.error('Failed to create customer type:', error);
    throw error;
  }
}

async function createCustomer(
  customerData: ICommerceToolsCustomer,
  authToken: string
) {
  try {
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
  } catch (error) {
    console.error('Failed to create customer:', error);
    throw error;
  }
}

export async function register(data: IFormData) {
  try {
    const authToken = await getToken();
    if (!authToken) throw new Error('Authentication failed');

    const typeExists = await checkTypeExists('customer', authToken);
    if (!typeExists) {
      await createCustomerType(authToken);
      console.log('Customer type created successfully');
    }

    const exists = await checkCustomerExists(data.email, authToken);
    if (exists) {
      throw new Error(
        'Customer with this email already exists. Please login instead'
      );
    }

    const customerData: ICommerceToolsCustomer = {
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
            ? 'Default shipping address'
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

    const newCustomer = await createCustomer(customerData, authToken);

    return {
      customer: newCustomer,
      authData: {
        email: data.email,
        password: data.password,
      },
    };
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}
