import { PromoCodeInput } from '@components/ui/inputs/inputPromo';
import { Button, Divider } from '@mui/material';
import { CartData } from '@shared/types/types';
import styles from './Cart.module.scss';
import calculateCartTotals from '@shared/utlis/calculateTotals';
import { useState } from 'react';
import { applyPromoCode } from '@shared/api/commerce-tools/updatePromoCodeToCart';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';

interface CartResultProps {
  data?: CartData;
  setData: React.Dispatch<React.SetStateAction<CartData | null>>;
}

export default function CartResult({ data, setData }: CartResultProps) {
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyPromo = async (code: string) => {
    if (!data) return false;

    setIsLoading(true);
    try {
      const success = await applyPromoCode(data.id, data.version, code);

      if (success) {
        setAppliedPromo(code || null);

        const updatedCart = await apiGetCartById();
        if (updatedCart) {
          setData(updatedCart);
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

  if (data) {
    const [total, subTotal, saved] = calculateCartTotals(data);
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
            <li>
              <span>Promo code:</span>
              <span>{appliedPromo || 'None'}</span>
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
              onApplyPromo={handleApplyPromo}
              isLoading={isLoading}
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
