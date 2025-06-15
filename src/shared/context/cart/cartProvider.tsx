import { useCallback, useMemo, useState } from 'react';
import { CartContext } from './cart-context';
import { CartData } from '@shared/types/types';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartData | null>(null);
  const cartItemsCount =
    cart?.lineItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const isCartEmpty = cartItemsCount === 0;

  const clearCartMemoized = useCallback(() => {
    setCart(null);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      setCart,
      cartItemsCount,
      isCartEmpty,
      clearCart: clearCartMemoized,
    }),
    [cart, cartItemsCount, isCartEmpty, clearCartMemoized]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
