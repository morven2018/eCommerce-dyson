import { IconButton } from '@mui/material';
import icon from '../../../assets/icons/reset.svg';
import { CartData } from '@shared/types/types';
import formatPrice from '@shared/utlis/price-formatter';
import { apiDeleteProductFromCart } from '@shared/api/commerce-tools/apiDeleteProductFromCart';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';
import { useState } from 'react';
import { openDialog } from '@services/DialogService';
import CartProductCard from '@components/ui/cards/CartProductCard';

interface CartInfoProps {
  data: CartData;
  setData: React.Dispatch<React.SetStateAction<CartData | null>>;
}

export default function CartInfo({ data, setData }: CartInfoProps) {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (!data.lineItems.length) return;

    setIsResetting(true);
    try {
      for (const item of data.lineItems) {
        await apiDeleteProductFromCart(item.id, item.quantity);
      }

      const updatedCart = await apiGetCartById();
      setData(updatedCart);
    } catch {
      openDialog('Error reset cart', true);
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await apiDeleteProductFromCart(itemId);
      const updatedCart = await apiGetCartById();
      setData(updatedCart);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const items = data.lineItems.reduce((sum, item) => (sum += item.quantity), 0);
  const total = formatPrice(data.totalPrice);
  return (
    <div>
      <div>
        <h4>Cart</h4>
        <div>
          <div>Total: {total}</div>
          <div>{`${items} items`}</div>
          <IconButton onClick={handleReset} disabled={isResetting}>
            <img src={icon} alt="Reset Cart" />
          </IconButton>
        </div>
        <ul>
          {data.lineItems.map((item) => (
            <CartProductCard
              data={item}
              setData={setData}
              key={item.id}
              onDelete={handleDeleteItem}
            />
          ))}
        </ul>
        <div style={{ display: 'none' }}>{JSON.stringify(data)}</div>
      </div>
    </div>
  );
}
