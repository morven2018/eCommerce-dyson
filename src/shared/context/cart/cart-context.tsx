import { CartData } from '@shared/types/types';
import { createContext } from 'react';

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
