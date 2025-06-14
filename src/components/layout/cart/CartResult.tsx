import { PromoCodeInput } from '@components/ui/inputs/inputPromo';
import { Button, Divider } from '@mui/material';
import { CartData } from '@shared/types/types';
import styles from './Cart.module.scss';
import calculateCartTotals from '@shared/utlis/calculateTotals';

interface CartResultProps {
  data?: CartData;
}

export default function CartResult({ data }: CartResultProps) {
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
              <span> Shipping:</span> <span>{'$0.00'}</span>
            </li>

            <li>
              <span> Tax:</span> <span>included</span>
            </li>

            <li>
              <span> Promo code:</span> <span>{}</span>
            </li>
          </ul>

          <Divider orientation="horizontal" flexItem />
          <div className={styles.results}>
            <h5>
              <span>Total:</span> {total}
            </h5>
            <div className={styles.saved}>
              <span>You saved</span> {saved}
            </div>
            <PromoCodeInput />
          </div>
        </div>
        <Button className={styles.button}>check out</Button>
      </div>
    );
  }
}
