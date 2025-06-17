import { commercetoolsConfig } from './config';
import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { handleCatchError } from '@components/ui/error/catchError';
import { getAnonymousSessionToken } from './getAnonymousSessionToken';

interface CartData {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  anonymousId: string;
  lineItems: [];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  shipping: [];
  customLineItems: [];
  discountCodes: [];
  directDiscounts: [];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  refusedGifts: [];
  origin: string;
  itemShippingAddresses: [];
  discountTypeCombination: {
    type: string;
  };
}

export async function apiCreateNewCart(): Promise<CartData | null> {
  const accessToken = getTokenFromLS();

  if (!accessToken) throw new Error('No access token found');

  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/me/carts`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'USD',
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      if (errorDetails.statusCode === 401) {
        const newToken = await getAnonymousSessionToken();

        if (!newToken) return null;

        await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${newToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currency: 'USD',
          }),
        });
      }
    }

    const result: CartData = await response.json();

    return result;
  } catch (error) {
    handleCatchError(error, 'Error creating cart');

    return null;
  }
}
