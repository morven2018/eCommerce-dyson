import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { CartData } from '@shared/types/types';
import { commercetoolsConfig } from '../config';
import { openDialog } from '@services/DialogService';
import { apiAddProductToCart } from '../apiAddProductToCart';
import { apiCreateNewCart } from '../apiCreateNewCart';

export async function convertToUserCart(
  cartId: string,
  anonymToken: string
): Promise<CartData | void> {
  const userToken = getTokenFromLS();
  if (!userToken) {
    throw new Error('User token not found');
  }

  try {
    const apiUrl = commercetoolsConfig.apiUrl;
    const projectKey = commercetoolsConfig.projectKey;

    const getCartUrl = `${apiUrl}/${projectKey}/carts/${cartId}`;
    const getResponse = await fetch(getCartUrl, {
      headers: {
        Authorization: `Bearer ${anonymToken}`,
      },
    });

    if (!getResponse.ok) {
      throw new Error('Failed to fetch anonymous cart');
    }
    const anonymousCart = await getResponse.json();

    const userCart = await apiCreateNewCart();
    if (!userCart) {
      throw new Error('Failed to create user cart');
    }
    localStorage.setItem('cartIdDyson', userCart.id);

    for (const item of anonymousCart.lineItems) {
      await apiAddProductToCart(item.productId, item.quantity);
    }

    return userCart;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Problem with updating cart';
    openDialog(message, true);
  }
}
