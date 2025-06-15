import { commercetoolsConfig } from './config';
import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { getCartIdFromLS } from '../local-storage/getCartIdFromLS';
import { openDialog } from '@services/DialogService';
import { CartData } from '@shared/types/types';

export async function apiGetCartById(
  token?: string,
  id?: string
): Promise<CartData | null> {
  const accessToken = token ?? getTokenFromLS();
  const cartId = id ?? getCartIdFromLS();

  if (!accessToken || !cartId) {
    throw new Error('No access token found or cart id');
  }

  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/me/carts/${cartId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      const errorMessage = errorDetails.message;
      throw new Error(`Request failed while getting a cart: ${errorMessage}`);
    }

    const result: CartData = await response.json();
    return result;
  } catch (error) {
    let message = 'Error getting a cart';

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    openDialog(message, true);
    return null;
  }
}
