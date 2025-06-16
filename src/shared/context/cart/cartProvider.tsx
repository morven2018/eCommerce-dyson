import { CartData } from '@shared/types/types';
import { useCallback, useMemo, useState } from 'react';
import { CartContext } from './cart-context';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartData | null>(null);
  const cartItemsCount =
    cart?.lineItems.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const isCartEmpty = cartItemsCount === 0;

  const clearCartMemoized = useCallback(() => {
    setCart(null);
  }, []);

  const updateCart = useCallback(async () => {
    try {
      const cartData = await apiGetCartById();
      setCart(cartData);
    } catch {
      setCart(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      setCart,
      cartItemsCount,
      isCartEmpty,
      clearCart: clearCartMemoized,
      updateCart,
    }),
    [cart, cartItemsCount, isCartEmpty, clearCartMemoized, updateCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
