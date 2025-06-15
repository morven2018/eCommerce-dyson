import { overAmount } from '@shared/constants/promocode';

type ValidPromoCode = keyof typeof overAmount;

function isPromoCode(key: string): key is ValidPromoCode {
  return key in overAmount;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
  promoCode?: ValidPromoCode;
  minAmount?: number;
}

export default function validatePromoCode(
  inputCode: string,
  cartTotalCents: number
): ValidationResult {
  const normalizedCode = inputCode.trim().toUpperCase();

  if (!isPromoCode(normalizedCode)) {
    return {
      isValid: false,
      error: 'This promo code does not exist',
    };
  }

  const minAmount = overAmount[normalizedCode];

  if (cartTotalCents < minAmount) {
    return {
      isValid: false,
      error: `Minimum order amount for this promo: $${(minAmount / 100).toFixed(2)}`,
    };
  }

  return {
    isValid: true,
    promoCode: normalizedCode,
    minAmount,
  };
}
