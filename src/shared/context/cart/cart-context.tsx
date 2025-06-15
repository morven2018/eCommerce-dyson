// CartContext.tsx
import { createContext } from 'react';
import { CartData } from '@shared/types/types';

interface CartContextType {
  cart: CartData | null;
  setCart: (cart: CartData | null) => void;
  cartItemsCount: number;
  isCartEmpty: boolean;
  clearCart: () => void;
}
export const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
  cartItemsCount: 0,
  isCartEmpty: true,
  clearCart: () => {},
});
