import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { commercetoolsConfig } from './config';

const EXCLUSIVE_PROMO_CODES = ['LUCKY-30', 'DYSON-20', 'SUMMER-10'];

export const applyPromoCode = async (
  cartId: string,
  promoCode: string
): Promise<boolean> => {
  try {
    const accessToken = getTokenFromLS();
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const url = `${commercetoolsConfig.apiUrl}/${commercetoolsConfig.projectKey}/carts/${cartId}`;

    const cartResponse = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!cartResponse.ok) {
      throw new Error('Failed to fetch cart data');
    }

    const cart = await cartResponse.json();
    const actions = [];

    if (cart.discountCodes && cart.discountCodes.length > 0) {
      for (const discount of cart.discountCodes) {
        if (EXCLUSIVE_PROMO_CODES.includes(discount.discountCode.code)) {
          actions.push({
            action: 'removeDiscountCode',
            discountCode: {
              typeId: 'discount-code',
              id: discount.discountCode.id,
            },
          });
        }
      }
    }

    // 3. Добавляем action для применения нового промокода
    if (promoCode) {
      actions.push({
        action: 'addDiscountCode',
        code: promoCode,
      });
    }

    const updateResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        version: cart.version,
        actions: actions,
      }),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'Failed to update promo codes');
    }

    return true;
  } catch (error) {
    console.error('Error in applyPromoCode:', error);
    throw error;
  }
};
