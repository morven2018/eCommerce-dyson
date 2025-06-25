import { commercetoolsConfig } from './config';
import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { getCartIdFromLS } from '../local-storage/getCartIdFromLS';
import { handleCatchError } from '@components/ui/error/catchError';
import { CartData } from '@shared/types/types';
import { getAnonymousSessionToken } from './getAnonymousSessionToken';
import { apiCreateNewCart } from './apiCreateNewCart';

export async function apiGetCartById(
  token?: string,
  id?: string
): Promise<CartData | null> {
  const accessToken = token ?? getTokenFromLS();
  const cartId = id ?? getCartIdFromLS();

  if (!accessToken) {
    const token = await getAnonymousSessionToken();

    if (!token) throw new Error('No access token found');

    localStorage.setItem('AnonymousDysonToken', token.access_token);
  }

  if (!cartId) {
    const cart = await apiCreateNewCart();
    if (!cart) throw new Error('No cart id found');

    localStorage.setItem('cartIdDyson', cart.id);
    return cart;
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

    if (response.ok) {
      const result: CartData = await response.json();
      return result;
    }
    return null;
  } catch (error) {
    handleCatchError(error, 'Error getting a cart');
    return null;
  }
}
