import { CartData } from '@shared/types/types';
import formatPrice from './price-formatter';

export default function calculateCartTotals(
  cart: CartData
): [string, string, string] {
  let totalWithDiscount = 0;
  let totalWithoutDiscount = 0;
  let totalSavings = 0;

  cart.lineItems.forEach((item) => {
    const itemOriginalPrice = item.price.value.centAmount * item.quantity;
    totalWithoutDiscount += itemOriginalPrice;

    if (item.price.discounted) {
      const itemDiscountedPrice =
        item.price.discounted.value.centAmount * item.quantity;
      totalWithDiscount += itemDiscountedPrice;
      totalSavings += itemOriginalPrice - itemDiscountedPrice;
    } else {
      totalWithDiscount += itemOriginalPrice;
    }
  });

  return [
    formatPrice({ centAmount: totalWithDiscount }),
    formatPrice({ centAmount: totalWithoutDiscount }),
    formatPrice({ centAmount: totalSavings }),
  ];
}
