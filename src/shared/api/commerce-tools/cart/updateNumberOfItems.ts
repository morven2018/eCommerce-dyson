import { openDialog } from '@services/DialogService';
import { commercetoolsConfig } from '../config';
import { getCartIdFromLS } from '@shared/api/local-storage/getCartIdFromLS';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';

export async function apiUpdateCart(
  productId: string,
  version: number,
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
      version: version,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: productId,
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
    let message = 'Error adding product to cart';

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    openDialog(message, true);
  }
}
