import { getAnonymousSessionToken } from './getAnonymousSessionToken';
import { apiGetCartById } from './apiGetCartById';
import { apiCreateNewCart } from './apiCreateNewCart';
import { CartData } from '@shared/types/types';

export const TOKEN_NAME = 'AnonymousDysonToken';
export const CART_ID_NAME = 'cartIdDyson';
export const PROMO_CODE_NAME = 'PromoCode';

export async function initializeAnonymousSession(): Promise<void> {
  const existingToken = localStorage.getItem(TOKEN_NAME);
  const existingCartId = localStorage.getItem(CART_ID_NAME);

  if (!existingToken || !existingCartId) {
    const newToken = await getAnonymousSessionToken();
    if (newToken) {
      localStorage.setItem(TOKEN_NAME, newToken.access_token);
      const cart = await apiCreateNewCart();
      setCartIdToLS(CART_ID_NAME, cart);
    }
  } else {
    const cart = await apiGetCartById(existingToken, existingCartId);
    if (!cart) {
      const newToken = await getAnonymousSessionToken();
      if (newToken) {
        localStorage.setItem(TOKEN_NAME, newToken.access_token);
        const cart = await apiCreateNewCart();
        setCartIdToLS(CART_ID_NAME, cart);
      }
    }
  }
}

function setCartIdToLS(field: string, cart: CartData | null) {
  if (cart) localStorage.setItem(field, cart.id);
}
