import { Divider, IconButton } from '@mui/material';
import icon from '../../../assets/icons/reset.svg';
import { CartData } from '@shared/types/types';
import formatPrice from '@shared/utlis/price-formatter';
import { apiDeleteProductFromCart } from '@shared/api/commerce-tools/apiDeleteProductFromCart';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';
import { useState } from 'react';
import { openDialog } from '@services/DialogService';
import CartProductCard from '@components/ui/cards/CartProductCard';
import { apiUpdateCart } from '@shared/api/commerce-tools/cart/updateNumberOfItems';
import { useCart } from '@shared/context/cart-context';
import styles from './Cart.module.scss';

interface CartInfoProps {
  data: CartData;
  setData: React.Dispatch<React.SetStateAction<CartData | null>>;
}

export default function CartInfo({ data, setData }: CartInfoProps) {
  const [isResetting, setIsResetting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { setCart } = useCart();
  const [currentVersion, setCurrentVersion] = useState(data.version);

  const handleReset = async () => {
    if (!data.lineItems.length) return;

    setIsResetting(true);
    try {
      let version = currentVersion;
      for (const item of data.lineItems) {
        const result = await apiDeleteProductFromCart(
          item.id,
          item.quantity,
          version
        );
        if (result) {
          version = result;
          setCurrentVersion(version);
        }
      }

      const updatedCart = await apiGetCartById();
      setData(updatedCart);
      setCart(updatedCart);
      setCurrentVersion(updatedCart?.version ?? 1);
    } catch {
      openDialog('Error reset cart', true);
      const freshCart = await apiGetCartById();
      setCurrentVersion(freshCart?.version ?? 1);
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const result = await apiDeleteProductFromCart(itemId, 1, currentVersion);
      if (result) {
        setCurrentVersion(result);
      }
      const updatedCart = await apiGetCartById();
      setData(updatedCart);
      setCart(updatedCart);
      setCurrentVersion(updatedCart?.version ?? 1);
    } catch {
      openDialog('Failed to delete item', true);
      const freshCart = await apiGetCartById();
      setCurrentVersion(freshCart?.version ?? 1);
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    setIsUpdating(true);
    try {
      const item = data.lineItems.find((item) => item.id === itemId);
      if (!item) return;

      const quantityDifference = newQuantity - item.quantity;

      if (quantityDifference !== 0) {
        await apiUpdateCart(itemId, newQuantity);
        const updatedCart = await apiGetCartById();
        setData(updatedCart);
        setCart(updatedCart);
        setCurrentVersion(updatedCart?.version ?? 1);
      }
    } catch {
      openDialog('Failed to update cart', true);
      const freshCart = await apiGetCartById();
      setCurrentVersion(freshCart?.version ?? 1);
    } finally {
      setIsUpdating(false);
    }
  };

  const items = data.lineItems.reduce((sum, item) => (sum += item.quantity), 0);
  const total = formatPrice(data.totalPrice);
  return (
    <div className={styles.cartTable}>
      <div className={styles.cartHeader}>
        <h4>Cart</h4>
        <div className={styles.infoAndReset}>
          <div className={styles.cartHeaderInfo}>
            <div>Total: {total}</div>
            <div className={styles.items}>{`${items} items`}</div>
          </div>
          <IconButton
            onClick={handleReset}
            disabled={isResetting}
            className={styles.reset}
          >
            <img src={icon} alt="Reset Cart" />
          </IconButton>
        </div>
      </div>
      <Divider orientation="horizontal" />
      <ul>
        {data.lineItems.map((item) => (
          <CartProductCard
            data={item}
            setData={setData}
            key={item.id}
            onDelete={handleDeleteItem}
            onQuantityChange={handleQuantityChange}
            isUpdating={isUpdating}
          />
        ))}
      </ul>
      <div style={{ display: 'none' }}>{JSON.stringify(data)}</div>
    </div>
  );
}
