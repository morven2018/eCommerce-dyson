import { useState, useEffect } from 'react';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';
import { CartData } from '@shared/types/types';
import { openDialog } from '@services/DialogService';
import VoidCartArea from '@components/layout/cart/VoidCartArea.module';
import CartInfo from '@components/layout/cart/CartInfo.module';
import styles from '../../components/layout/cart/Cart.module.scss';
import CartResult from '@components/layout/cart/CartResult';
import { getDiscountDetails } from '@shared/api/commerce-tools/getDiscountDetails';
import { getDiscountPercentage } from '@shared/utlis/calculatePercentage';

export const CartPage = () => {
  const [data, setData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  useEffect(() => {
    const fetchDiscount = async () => {
      const promocode = localStorage.getItem('PromoCode');
      if (promocode) {
        try {
          const details = await getDiscountDetails(promocode.toUpperCase());
          setDiscountPercentage(getDiscountPercentage(details));
        } catch {
          setDiscountPercentage(0);
        }
      }
    };

    fetchDiscount();
  }, []);

  useEffect(() => {
    const initializeCart = async () => {
      setIsLoading(true);
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
        setData(null);
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
      </div>
    );

  return (
    <div className={styles.cart}>
      <CartInfo
        data={data}
        setData={setData}
        discountPercentage={discountPercentage}
      />
      <CartResult
        data={data}
        discountPercentage={discountPercentage}
        setDiscountPercentage={setDiscountPercentage}
      />
    </div>
  );
};
