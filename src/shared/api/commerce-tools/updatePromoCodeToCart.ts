import { getTokenFromLS } from '../local-storage/getTokenFromLS';
import { commercetoolsConfig } from './config';

export const applyPromoCode = async (
  cartId: string,
  cartVersion: number,
  promoCode: string
): Promise<boolean> => {
  try {
    const accessToken = getTokenFromLS();
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const action = promoCode
      ? { action: 'addDiscountCode', code: promoCode }
      : { action: 'removeDiscountCode' };

    const url = `${commercetoolsConfig.apiUrl}/${commercetoolsConfig.projectKey}/carts/${cartId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        version: 99,
        actions: [action],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'Failed to apply promo code');
    }

    return true;
  } catch (error) {
    console.error('Error in applyPromoCode:', error);
    throw error;
  }
};
