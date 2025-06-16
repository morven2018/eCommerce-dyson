import { PromoCodeInput } from '@components/ui/inputs/inputPromo';
import { Button, Divider, IconButton } from '@mui/material';
import { CartData } from '@shared/types/types';
import styles from './Cart.module.scss';
import calculateCartTotals from '@shared/utlis/calculateTotals';
import { useState, useEffect } from 'react';
import { applyPromoCode } from '@shared/api/commerce-tools/applyPromoCodeToCart';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';
import icon from '../../../assets/icons/reset.svg';
import { removePromoCode } from '@shared/api/commerce-tools/resetPromocode';
import { openDialog } from '@services/DialogService';
import { useCart } from '@shared/context/cart/useCart';
import { getDiscountDetails } from '@shared/api/commerce-tools/getDiscountDetails';
import { getDiscountPercentage } from '@shared/utlis/calculatePercentage';
import { overAmount } from '@shared/constants/promocode';

interface CartResultProps {
  data: CartData;
  onCartUpdate?: (cart: CartData) => void;
  discountPercentage: number;
  setDiscountPercentage: (value: number) => void;
}

export default function CartResult({
  data,
  onCartUpdate,
  discountPercentage,
  setDiscountPercentage,
}: Readonly<CartResultProps>) {
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [promoInputValue, setPromoInputValue] = useState('');
  const { setCart } = useCart();

  useEffect(() => {
    const storedPromo = localStorage.getItem('PromoCode');
    if (storedPromo && data) {
      setAppliedPromo(storedPromo);
      setPromoInputValue(storedPromo);
    }
  }, [data]);

  const handleApplyPromo = async (code: string): Promise<boolean> => {
    if (!data || !code.trim()) return false;

    const normalizedCode = code.toUpperCase();
    if (appliedPromo === normalizedCode) return true;

    setIsLoading(true);
    try {
      const minAmount = overAmount[normalizedCode as keyof typeof overAmount];
      if (minAmount && data.totalPrice.centAmount < minAmount) {
        openDialog(
          `Minimum order amount for this promo is $${minAmount / 100}`
        );
        return false;
      }

      const result = await applyPromoCode(data.id, normalizedCode);
      if (!result) {
        throw new Error('Failed to apply promo code');
      }

      let discountValue = 0;
      try {
        const discountDetails = await getDiscountDetails(normalizedCode);
        discountValue = getDiscountPercentage(discountDetails);
      } catch {
        openDialog('Failed to get discount');
      }

      setAppliedPromo(normalizedCode);
      setPromoInputValue(normalizedCode);
      localStorage.setItem('PromoCode', normalizedCode);
      setCart(result.updatedCart ?? null);
      if (result.updatedCart) onCartUpdate?.(result.updatedCart);
      setDiscountPercentage(discountValue);

      return true;
    } catch (error) {
      openDialog(
        error instanceof Error ? error.message : 'Failed to apply promo'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPromo = async () => {
    if (!data || !appliedPromo) return;

    setIsLoading(true);
    try {
      await removePromoCode();
      setAppliedPromo(null);
      setPromoInputValue('');
      localStorage.removeItem('PromoCode');

      const updatedCart = await apiGetCartById();
      if (updatedCart) {
        setCart(updatedCart);
        onCartUpdate?.(updatedCart);
        setDiscountPercentage(0);
      }
    } catch {
      openDialog('Failed to remove promo', true);
    } finally {
      setIsLoading(false);
    }
  };

  if (data) {
    const [total, subTotal, saved] = calculateCartTotals(
      data,
      discountPercentage
    );
    return (
      <div className={styles.cartResult}>
        <div>
          <h5>Your order summary</h5>
          <ul>
            <li>
              <span>Sub total:</span> <span>{subTotal}</span>
            </li>
            <li>
              <span>Shipping:</span> <span>{'$0.00'}</span>
            </li>
            <li>
              <span>Tax:</span> <span>included</span>
            </li>
            <li className={styles.promoRow}>
              <span>Promo code:</span>
              <span>
                {appliedPromo ?? 'None'}
                {appliedPromo && (
                  <IconButton
                    onClick={handleResetPromo}
                    disabled={isLoading}
                    size="small"
                    className={styles.resetPromo}
                  >
                    <img
                      src={icon}
                      alt="Reset Promo"
                      className={styles.resetPromo}
                    />
                  </IconButton>
                )}
              </span>
            </li>
          </ul>

          <Divider orientation="horizontal" flexItem />
          <div className={styles.results}>
            <h5>
              <span>Total:</span> {total}
            </h5>
            {saved !== '$0.00' && (
              <div className={styles.saved}>
                <span>You saved</span> {saved}
              </div>
            )}
            <PromoCodeInput
              cartTotal={data.totalPrice.centAmount}
              onApply={handleApplyPromo}
              isLoading={isLoading}
              value={promoInputValue}
              isApplied={!!appliedPromo}
              onReset={() => setPromoInputValue('')}
              disabled={isLoading}
            />
          </div>
        </div>
        <Button className={styles.button} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Check out'}
        </Button>
      </div>
    );
  }
  return null;
}
