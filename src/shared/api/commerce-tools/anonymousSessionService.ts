import { getAnonymousSessionToken } from './getAnonymousSessionToken';
import { apiGetCartById } from './apiGetCartById';
import { apiCreateNewCart } from './apiCreateNewCart';

export const TOKEN_NAME = 'AnonymousDysonToken';
export const CART_ID_NAME = 'cartIdDyson';
export const PROMO_CODE_NAME = 'PromoCode';

export async function initializeAnonymousSession(): Promise<void> {
  const existingToken = localStorage.getItem(TOKEN_NAME);
  const existingCartId = localStorage.getItem(CART_ID_NAME);

  localStorage.clear();

  if (!existingToken) {
    const newToken = await getAnonymousSessionToken();
    if (newToken) {
      localStorage.setItem(TOKEN_NAME, newToken.access_token);
      const cart = await apiCreateNewCart();
      if (cart) localStorage.setItem(CART_ID_NAME, cart.id);
    }
  } else if (existingCartId) {
    const cart = await apiGetCartById(existingToken, existingCartId);
    if (!cart) {
      const newToken = await getAnonymousSessionToken();
      if (newToken) {
        localStorage.setItem(TOKEN_NAME, newToken.access_token);
        const cart = await apiCreateNewCart();
        if (cart) localStorage.setItem(CART_ID_NAME, cart.id);
      }
    }
  }
}
