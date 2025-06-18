export default function formatPrice(totalPrice: {
  centAmount: number;
  currencyCode?: string;
  fractionDigits?: number;
}): string {
  const amount =
    totalPrice.centAmount / Math.pow(10, totalPrice.fractionDigits ?? 2);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: totalPrice.currencyCode ?? 'USD',
  }).format(amount);
}
