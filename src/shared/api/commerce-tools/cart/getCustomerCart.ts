import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { CartData } from '@shared/types/types';
import { commercetoolsConfig } from '../config';
import { openDialog } from '@services/DialogService';

export async function getCustomerCart(
  customerId: string
): Promise<CartData | null> {
  const userToken = getTokenFromLS();
  if (!userToken) {
    throw new Error('User token not found');
  }

  try {
    const apiUrl = commercetoolsConfig.apiUrl;
    const projectKey = commercetoolsConfig.projectKey;

    const url = `${apiUrl}/${projectKey}/me/carts?customerId=${customerId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }

      throw new Error(`Failed to fetch customer cart: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.results.length !== 0) {
      localStorage.setItem('cartIdDyson', data.results[0].id);
    }

    return data.results[0] ?? null;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to get customer cart';
    openDialog(message, true);
    throw error;
  }
}
