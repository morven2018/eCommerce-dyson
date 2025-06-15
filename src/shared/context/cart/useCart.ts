import { useContext } from 'react';
import { CartContext } from './cart-context';

export const useCart = () => useContext(CartContext);
