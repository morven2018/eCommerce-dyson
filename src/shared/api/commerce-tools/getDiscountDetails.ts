import { DiscountCode } from '@shared/types/types';
import { commercetoolsConfig } from './config';
import { getTokenFromLS } from '../local-storage/getTokenFromLS';

function isDiscountCode(obj: unknown): obj is DiscountCode {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    typeof obj.id === 'string' &&
    'code' in obj &&
    typeof obj.code === 'string' &&
    'cartDiscounts' in obj &&
    Array.isArray(obj.cartDiscounts) &&
    obj.cartDiscounts.every(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        'typeId' in item &&
        typeof item.typeId === 'string' &&
        'id' in item &&
        typeof item.id === 'string'
    ) &&
    'isActive' in obj &&
    typeof obj.isActive === 'boolean'
  );
}

export const getDiscountDetails = async (discountCode: string) => {
  const accessToken = getTokenFromLS();
  if (!accessToken) throw new Error('No access token found');

  const { apiUrl, projectKey } = commercetoolsConfig;

  try {
    const response = await fetch(`${apiUrl}/${projectKey}/discount-codes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to get list of discount codes: ${response.status}`
      );
    }

    const data = await response.json();
    const discounts = data.results;

    if (!Array.isArray(discounts) || !discounts.some(isDiscountCode)) {
      throw new Error('Invalid discount codes data structure');
    }

    const targetDiscount = discounts.find((item) => item.code === discountCode);
    if (!targetDiscount) {
      throw new Error(`Discount code '${discountCode}' not found`);
    }

    const cartDiscountId = targetDiscount.cartDiscounts[0]?.id;
    if (!cartDiscountId) {
      throw new Error('No cart discount associated with this code');
    }

    const discountResponse = await fetch(
      `${apiUrl}/${projectKey}/cart-discounts/${cartDiscountId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!discountResponse.ok) {
      throw new Error(
        `Failed to get cart discount details: ${discountResponse.status}`
      );
    }

    console.log(discountResponse);

    return await discountResponse.json();
  } catch {
    throw new Error('Can not get discount value');
  }
};
