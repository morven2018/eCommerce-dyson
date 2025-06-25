import { commercetoolsConfig } from './config';
import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { getCartIdFromLS } from '../local-storage/getCartIdFromLS';
import { handleCatchError } from '@components/ui/error/catchError';

export async function apiDeleteProductFromCart(
  lineItemId: string,
  quantity: number = 1,
  version: number = 1
): Promise<number | void> {
  const accessToken = getTokenFromLS();
  const cartId = getCartIdFromLS();

  if (!accessToken || !cartId) {
    throw new Error('No access token found or cart id');
  }

  const apiUrl = commercetoolsConfig.apiUrl;
  const projectKey = commercetoolsConfig.projectKey;
  const url = `${apiUrl}/${projectKey}/me/carts/${cartId}`;

  try {
    const requestBody = {
      version: version,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: lineItemId,
          quantity: quantity,
        },
      ],
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const result = await response.json();
    if (result) return result.version;
  } catch (error) {
    handleCatchError(error, 'Error removing product from cart');
  }
}
