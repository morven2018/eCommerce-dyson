import { commercetoolsConfig } from './config';
import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { getCartIdFromLS } from '../local-storage/getCartIdFromLS';
import { openDialog } from '@services/DialogService';

export async function apiDeleteProductFromCart(
  lineItemId: string,
  quantity: number = 1
): Promise<void> {
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
      version: 1,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: lineItemId,
          quantity: quantity,
        },
      ],
    };

    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    let message = 'Error removing product from cart';

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    openDialog(message, true);
  }
}
