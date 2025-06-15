import { PromoCodeInput } from '@components/ui/inputs/inputPromo';
import { Button, Divider, IconButton } from '@mui/material';
import { CartData } from '@shared/types/types';
import styles from './Cart.module.scss';
import calculateCartTotals from '@shared/utlis/calculateTotals';
import { useState, useEffect } from 'react';
import { applyPromoCode } from '@shared/api/commerce-tools/applyPromoCodeToCart';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';
import { useCart } from '@shared/context/cart-context';
import icon from '../../../assets/icons/reset.svg';
import { removePromoCode } from '@shared/api/commerce-tools/resetPromocode';

interface CartResultProps {
  data?: CartData;
  onCartUpdate?: (cart: CartData) => void;
  discountPercentage: number;
}

export default function CartResult({
  data,
  onCartUpdate,
  discountPercentage,
}: CartResultProps) {
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
    if (!data) return false;

    setIsLoading(true);
    try {
      const success = await applyPromoCode(data.id, code.toUpperCase());

      if (success) {
        setAppliedPromo(code);
        setPromoInputValue(code);
        localStorage.setItem('PromoCode', code);

        const updatedCart = await apiGetCartById();
        if (updatedCart) {
          setCart(updatedCart);
          onCartUpdate?.(updatedCart);
        }
      }
      return success;
    } catch (error) {
      console.error('Failed to apply promo:', error);
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
      }
    } catch (error) {
      console.error('Failed to remove promo:', error);
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
                {appliedPromo || 'None'}
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
