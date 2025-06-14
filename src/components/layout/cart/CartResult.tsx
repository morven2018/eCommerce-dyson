import { Divider } from '@mui/material';

export default function CartResult() {
  return (
    <div>
      <div>
        <h5>Your order summary</h5>
        <ul>
          <li>Sub total: {}</li>
        </ul>
        <ul>
          <li>Shipping: {}</li>
        </ul>
        <ul>
          <li>Tax: included</li>
        </ul>
        <ul>
          <li>Promo code: {}</li>
        </ul>
        <div>
          <div>Total: 0</div>
          <div>No items added</div>
        </div>
        <Divider orientation="horizontal" flexItem />
        <div>
          <h5>Total: {}</h5>
        </div>
      </div>
    </div>
  );
}
