import { handleCatchError } from '@components/ui/error/catchError';
import { getCartIdFromLS } from '@shared/api/local-storage/getCartIdFromLS';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { apiCreateNewCart } from '../apiCreateNewCart';
import { commercetoolsConfig } from '../config';

export async function apiClearCart(): Promise<boolean> {
  const accessToken = getTokenFromLS();
  const oldCartId = getCartIdFromLS();

  if (!accessToken) {
    throw new Error('No access token found');
  }

  try {
    let oldCartVersion = 1;
    if (oldCartId) {
      const getCartUrl = `${commercetoolsConfig.apiUrl}/${commercetoolsConfig.projectKey}/me/carts/${oldCartId}`;
      const cartResponse = await fetch(getCartUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const oldCart = await cartResponse.json();
      oldCartVersion = oldCart.version;
    }

    const newCart = await apiCreateNewCart();
    if (!newCart) {
      throw new Error('Failed to create new cart');
    }

    localStorage.setItem('cartIdDyson', newCart.id);

    if (oldCartId) {
      const deleteUrl = `${commercetoolsConfig.apiUrl}/${commercetoolsConfig.projectKey}/me/carts/${oldCartId}?version=${oldCartVersion}`;
      await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return true;
  } catch (error) {
    handleCatchError(error, 'Error clearing cart by replacement');
    return false;
  }
}
