import { getCartIdFromLS } from '@shared/api/local-storage/getCartIdFromLS';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { CartData } from '@shared/types/types';
import { openDialog } from '@services/DialogService';
import { apiGetCartById } from '../apiGetCartById';
import { getCustomerCart } from './getCustomerCart';
import { convertToUserCart } from './convertToUserCart';
import { apiAddProductToCart } from '../apiAddProductToCart';

async function getCartsForMerge(
  anonymToken: string,
  customerId: string,
  oldCartId?: string
): Promise<{
  userCart?: CartData;
  anonymousCart?: CartData;
  anonymousCartId?: string;
}> {
  const accessToken = getTokenFromLS();
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const userCart = await getCustomerCart(customerId);
  const anonymousCartId = getCartIdFromLS();

  if (!anonymousCartId) {
    return { userCart: undefined };
  }

  const anonymousCart = await apiGetCartById(anonymToken, oldCartId);
  return {
    userCart: userCart ?? undefined,
    anonymousCart: anonymousCart ?? undefined,
    anonymousCartId: anonymousCartId ?? undefined,
  };
}

async function mergeCarts(
  userCart: CartData | undefined,
  anonymousCart: CartData | undefined,
  anonymousCartId: string | undefined,
  anonymToken: string
): Promise<CartData | void> {
  if (!anonymousCart?.lineItems?.length) {
    if (userCart) {
      localStorage.setItem('cartIdDyson', userCart.id);
      return userCart;
    }
    localStorage.removeItem('cartIdDyson');
    return;
  }

  if (!userCart) {
    const updatedCart = await convertToUserCart(
      anonymousCartId ?? '',
      anonymToken
    );
    if (updatedCart?.id) {
      localStorage.setItem('cartIdDyson', updatedCart.id);
    }
    return updatedCart;
  }

  // Находим уникальные товары в анонимной корзине
  const uniqueItems = anonymousCart.lineItems
    .filter(
      (anonymousItem) =>
        !userCart.lineItems.some(
          (userItem) => userItem.productId === anonymousItem.productId
        )
    )
    .map((item) => ({
      id: item.productId,
      quantity: item.quantity,
    }));

  if (uniqueItems.length === 0) {
    localStorage.setItem('cartIdDyson', userCart.id);
    return userCart;
  }

  localStorage.setItem('cartIdDyson', userCart.id);
  let version = userCart.version;

  for (const item of uniqueItems) {
    version =
      (await apiAddProductToCart(item.id, item.quantity, version)) ??
      version + 1;
  }

  const result = await apiGetCartById(getTokenFromLS() ?? '', userCart.id);

  if (result) return result;
}

export async function mergeCartsOnLogin(
  anonymToken: string,
  customerId: string,
  oldCartId?: string
): Promise<CartData | void> {
  try {
    const { userCart, anonymousCart, anonymousCartId } = await getCartsForMerge(
      anonymToken,
      customerId,
      oldCartId
    );
    return await mergeCarts(
      userCart,
      anonymousCart,
      anonymousCartId,
      anonymToken
    );
  } catch {
    openDialog('Cart merge failed', true);
  }
}
