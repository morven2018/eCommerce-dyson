import { createContext, useCallback, useContext, useState } from 'react';
import { CartData } from '@shared/types/types';

interface CartContextType {
  cart: CartData | null;
  setCart: (cart: CartData | null) => void;
  cartItemsCount: number;
  isCartEmpty: boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
  cartItemsCount: 0,
  isCartEmpty: true,
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartData | null>(null);
  const cartItemsCount =
    cart?.lineItems.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const isCartEmpty = cartItemsCount === 0;

  const clearCart = useCallback(() => {
    setCart(null);
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, setCart, cartItemsCount, isCartEmpty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
