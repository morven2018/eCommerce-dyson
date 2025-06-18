import { createContext } from 'react';
import { CartData } from '@shared/types/types';

interface CartContextType {
  cart: CartData | null;
  setCart: (cart: CartData | null) => void;
  cartItemsCount: number;
  isCartEmpty: boolean;
  clearCart: () => void;
  updateCart: () => Promise<void>;
  error: Error | null;
}

export const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
  cartItemsCount: 0,
  isCartEmpty: true,
  clearCart: () => {},
  updateCart: async () => {},
  error: null,
});
