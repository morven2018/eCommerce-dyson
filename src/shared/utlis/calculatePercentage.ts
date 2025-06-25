import { CartDiscount } from '@shared/types/types';

export const getDiscountPercentage = (cartDiscount: CartDiscount): number => {
  if (cartDiscount.value?.type === 'relative') {
    return (cartDiscount.value.permyriad ?? 0) / 100;
  }
  return 0;
};
