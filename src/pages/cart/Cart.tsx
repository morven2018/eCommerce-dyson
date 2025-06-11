import { useState, useEffect } from 'react';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';
import { CartData } from '@shared/types/types';
import { openDialog } from '@services/DialogService';
import VoidCartArea from '@components/layout/cart/VoidCartArea.module';
import CartInfo from '@components/layout/cart/CartInfo.module';

export const CartPage = () => {
  const [data, setData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  if (isLoading) return <div>Loading cart data...</div>;

  if (!data || data.lineItems.length === 0)
    return (
      <div>
        <VoidCartArea />
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  return (
    <div>
      <CartInfo data={data} setData={setData} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
