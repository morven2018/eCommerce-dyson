import { useState, useEffect } from 'react';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';
import { CartData } from '@shared/types/types';
import { openDialog } from '@services/DialogService';
import VoidCartArea from '@components/layout/cart/VoidCartArea.module';
import CartInfo from '@components/layout/cart/CartInfo.module';
import { getCartIdFromLS } from '@shared/api/local-storage/getCartIdFromLS';
import { apiCreateNewCart } from '@shared/api/commerce-tools/apiCreateNewCart';
import styles from '../../components/layout/cart/Cart.module.scss';

export const CartPage = () => {
  const [data, setData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCart = async () => {
      try {
        const cartId = getCartIdFromLS();
        if (!cartId) {
          const newCart = await apiCreateNewCart();
          if (!newCart) throw new Error('Failed to create cart');
          const id = newCart.id;
          if (id) localStorage.setItem('cartIdDyson', id);
        }

        const cart = await apiGetCartById();
        setData(cart);
      } catch {
        openDialog('The cart is unaccessible', true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, []);

  useEffect(() => {
    const initializeCart = async () => {
      try {
        const cartData = await apiGetCartById();
        setData(cartData);
      } catch (error) {
        let message = 'Error getting cart data';

        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === 'string') {
          message = error;
        }

        openDialog(message, true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, []);

  if (isLoading) return <div>Loading cart data...</div>;

  if (!data || data.lineItems.length === 0)
    return (
      <div className={styles.voidCart}>
        <VoidCartArea />
        <div></div>
      </div>
    );
  return (
    <div className={styles.cart}>
      <CartInfo data={data} setData={setData} />
      <div></div>
    </div>
  );
};
