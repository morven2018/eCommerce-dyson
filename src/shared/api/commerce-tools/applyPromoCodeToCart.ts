import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { commercetoolsConfig } from './config';
import { CartData } from '@shared/types/types';

const EXCLUSIVE_PROMO_CODES = ['LUCKY-30', 'DYSON-20', 'SUMMER-10'];

interface ApplyPromoCodeResponse {
  success: boolean;
  updatedCart?: CartData;
  error?: string;
}

export const applyPromoCode = async (
  cartId: string,
  promoCode: string
): Promise<ApplyPromoCodeResponse> => {
  try {
    const accessToken = getTokenFromLS();
    if (!accessToken) {
      return {
        success: false,
        error: 'No access token found',
      };
    }

    const baseUrl = `${commercetoolsConfig.apiUrl}/${commercetoolsConfig.projectKey}`;
    const cartUrl = `${baseUrl}/carts/${cartId}`;

    const getCartResponse = await fetch(cartUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!getCartResponse.ok) {
      const errorData = await getCartResponse.json();
      return {
        success: false,
        error: errorData.message ?? 'Failed to fetch cart data',
      };
    }

    const cart: CartData = await getCartResponse.json();
    const actions = [];

    if (cart.discountCodes && cart.discountCodes.length > 0) {
      for (const discount of cart.discountCodes) {
        const discountCode = discount.discountCode.code;
        if (discountCode && EXCLUSIVE_PROMO_CODES.includes(discountCode)) {
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

    actions.push({
      action: 'addDiscountCode',
      code: promoCode,
    });

    const updateResponse = await fetch(cartUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        version: cart.version,
        actions,
      }),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      return {
        success: false,
        error: errorData.message ?? 'Failed to update promo codes',
      };
    }

    const updatedCartResponse = await fetch(cartUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!updatedCartResponse.ok) {
      return {
        success: false,
        error: 'Failed to fetch updated cart',
      };
    }

    const updatedCart: CartData = await updatedCartResponse.json();

    const isApplied = updatedCart.discountCodes?.some(
      (dc) => dc.discountCode.code === promoCode && dc.state === 'MatchesCart'
    );

    if (!isApplied) {
      return {
        success: false,
        error: 'Promo code could not be applied',
      };
    }

    return {
      success: true,
      updatedCart,
    };
  } catch {
    return {
      success: false,
      error: 'Can not apply promocode',
    };
  }
};
