import { CartData } from '@shared/types/types';
import { useCallback, useMemo, useState } from 'react';
import { CartContext } from './cart-context';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const cartItemsCount =
    cart?.lineItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const isCartEmpty = cartItemsCount === 0 || error !== null;

  const clearCartMemoized = useCallback(() => {
    setCart(null);
    setError(null);
  }, []);

  const updateCart = useCallback(async () => {
    try {
      const cartData = await apiGetCartById();
      setCart(cartData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch cart'));
      setCart(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      setCart,
      cartItemsCount: error ? 0 : cartItemsCount,
      isCartEmpty,
      clearCart: clearCartMemoized,
      updateCart,
      error,
    }),
    [cart, cartItemsCount, isCartEmpty, clearCartMemoized, updateCart, error]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
