import { commercetoolsConfig } from './config';
import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { getCartIdFromLS } from '../local-storage/getCartIdFromLS';
import { handleCatchError } from '@components/ui/error/catchError';

export async function apiAddProductToCart(
  productId: string,
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
          action: 'addLineItem',
          productId: productId,
          variantId: 1,
          quantity: quantity,
          supplyChannel: {
            typeId: 'channel',
            id: '03371898-0c7c-4ef1-97e0-f677e704aaac',
          },
          distributionChannel: {
            typeId: 'channel',
            id: '1b29c225-1540-46de-bc0c-11116a384586',
          },
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
    handleCatchError(error, 'Error adding product to cart');
  }
}
