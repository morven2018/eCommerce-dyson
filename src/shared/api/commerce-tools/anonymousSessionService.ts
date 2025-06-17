import { getAnonymousSessionToken } from './getAnonymousSessionToken';
import { apiGetCartById } from './apiGetCartById';
import { apiCreateNewCart } from './apiCreateNewCart';
import { applyPromoCode } from './applyPromoCodeToCart';
import { openDialog } from '@services/DialogService';

export const TOKEN_NAME = 'AnonymousDysonToken';
export const CART_ID_NAME = 'cartIdDyson';
export const PROMO_CODE_NAME = 'PromoCode';

export async function initializeAnonymousSession(): Promise<void> {
  const existingToken = localStorage.getItem(TOKEN_NAME);
  const existingCartId = localStorage.getItem(CART_ID_NAME);
  const existingPromoCode = localStorage.getItem(PROMO_CODE_NAME);

  if (!existingToken) {
    await handleNewSession(existingCartId, existingPromoCode);
  } else if (existingCartId) {
    await handleExistingSession(existingPromoCode);
  } else {
    await createNewCartWithPromo(existingPromoCode);
  }
}

async function handleNewSession(
  existingCartId: string | null,
  existingPromoCode: string | null
): Promise<void> {
  const token = await getAnonymousSessionToken();
  if (!token) throw new Error('Failed to get anonymous token');

  localStorage.setItem(TOKEN_NAME, token.access_token);

  if (existingCartId) {
    try {
      const cart = await apiGetCartById(token.access_token, existingCartId);
      if (!cart) {
        await createNewCartWithPromo(existingPromoCode);
      }
    } catch {
      await createNewCartWithPromo(existingPromoCode);
    }
  } else {
    await createNewCartWithPromo(existingPromoCode);
  }
}

async function handleExistingSession(
  existingPromoCode: string | null
): Promise<void> {
  try {
    const cart = await apiGetCartById();
    if (!cart) {
      await createNewCartWithPromo(existingPromoCode);
    }
  } catch {
    await createNewCartWithPromo(existingPromoCode);
  }
}

async function createNewCartWithPromo(
  promoCode?: string | null
): Promise<void> {
  const cart = await apiCreateNewCart();
  if (!cart) throw new Error('Failed to create new cart');

  localStorage.setItem(CART_ID_NAME, cart.id);

  if (promoCode) {
    try {
      await applyPromoCode(cart.id, promoCode);
    } catch {
      openDialog('Failed to apply promo code');
    }
  }
}

export function getTokenName(): string {
  return TOKEN_NAME;
}

export function getCartIdName(): string {
  return CART_ID_NAME;
}

export function getPromoCodeName(): string {
  return PROMO_CODE_NAME;
}
