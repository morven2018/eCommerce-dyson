import { getCartIdFromLS } from '@shared/api/local-storage/getCartIdFromLS';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { CartData } from '@shared/types/types';
import { openDialog } from '@services/DialogService';
import { apiGetCartById } from '../apiGetCartById';
import { getCustomerCart } from './getCustomerCart';
import { convertToUserCart } from './convertToUserCart';
import { apiAddProductToCart } from '../apiAddProductToCart';

export async function mergeCartsOnLogin(
  anonymToken: string,
  customerId: string,
  oldCartId?: string
): Promise<CartData | void> {
  const accessToken = getTokenFromLS();

  if (!accessToken) {
    throw new Error('No access token found');
  }

  try {
    const userCart = await getCustomerCart(customerId);

    const anonymousCartId = getCartIdFromLS();
    if (anonymousCartId) {
      const anonymousCart = await apiGetCartById(anonymToken, oldCartId);

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
          anonymToken,
          anonymousCartId
        );
        if (updatedCart && updatedCart.id)
          localStorage.setItem('cartIdDyson', updatedCart.id);
        return updatedCart;
      }

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
    }
  } catch {
    openDialog('Cart merge failed', true);
  }
}
