import { createContext, useContext, useState, useEffect } from 'react';
import { CartData } from '@shared/types/types';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';

type CartContextType = {
  cart: CartData | null;
  isCartEmpty: boolean;
  refreshCart: () => Promise<void>; // Добавляем функцию обновления
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartData | null>(null);
  const isCartEmpty = !cart || cart.lineItems.length === 0;

  // Функция для принудительного обновления корзины
  const refreshCart = async () => {
    try {
      const updatedCart = await apiGetCartById();
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to refresh cart:', error);
    }
  };

  // Загружаем корзину при монтировании
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, isCartEmpty, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
