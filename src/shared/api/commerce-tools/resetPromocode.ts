import { commercetoolsConfig } from './config';
import { getCartIdFromLS } from '../local-storage/getCartIdFromLS';
import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { apiGetCartById } from './apiGetCartById';

export async function removePromoCode(): Promise<boolean> {
  try {
    const accessToken = getTokenFromLS();
    const cart = getCartIdFromLS();
    const promocode = localStorage.getItem('PromoCode');

    if (!accessToken || !cart || !promocode) {
      throw new Error('No data to reset found');
    }

    const { apiUrl, projectKey } = commercetoolsConfig;

    const url = `${apiUrl}/${projectKey}/carts/${cart}`;

    const discountCodeUrl = `${apiUrl}/${projectKey}/discount-codes?where=code="${encodeURIComponent(promocode)}"`;

    const discountCodeResponse = await fetch(discountCodeUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!discountCodeResponse.ok) {
      throw new Error('Failed to fetch discount code details');
    }

    const discountCodeData = await discountCodeResponse.json();
    const discountCodeId = discountCodeData.results[0]?.id;

    if (!discountCodeId) {
      throw new Error('Discount code not found');
    }

    const cartData = await apiGetCartById();
    if (!cartData) throw new Error('Cart data is unavailable');

    const removeResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        version: cartData.version,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: {
              typeId: 'discount-code',
              id: discountCodeId,
            },
          },
        ],
      }),
    });

    localStorage.removeItem('PromoCode');

    return removeResponse.ok;
  } catch (error) {
    console.error('Error removing promo code:', error);
    return false;
  }
}
