import { CartData, CartLineItem } from '@shared/types/types';
import formatPrice from '@shared/utlis/price-formatter';
import Counter from '../counter/Counter';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../../layout/cart/Cart.module.scss';

interface CartProductProps {
  data: CartLineItem;
  setData?: React.Dispatch<React.SetStateAction<CartData | null>>;
  onDelete?: (itemId: string) => void;
  onQuantityChange?: (itemId: string, quantity: number) => Promise<void>;
  isDeleting?: boolean;
  isUpdating?: boolean;
  usePromo: number;
}

export default function CartProductCard({
  data,
  onDelete,
  onQuantityChange,
  isDeleting = false,
  isUpdating = false,
  usePromo,
}: CartProductProps) {
  const imageURL = data.variant.images[0].url;
  const imageAlt = data.variant.images[0].label;
  const productName = data.name['en-US'];
  const variant = data.variant.key;
  const price = formatPrice(data.price.value);
  const discountedPrice = data.price.discounted?.value || data.price.value;
  const delta = (discountedPrice.centAmount * usePromo) / 10000;
  const finalDiscountedPrice = {
    ...discountedPrice,
    centAmount: Math.round(discountedPrice.centAmount - delta),
  };
  const discount =
    finalDiscountedPrice.centAmount < data.price.value.centAmount
      ? formatPrice(finalDiscountedPrice)
      : '';

  const priceValue = discount
    ? finalDiscountedPrice.centAmount / 100
    : data.price.value.centAmount / 100;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(data.id);
    }
  };
  const handleQuantityChange = async (newQuantity: number) => {
    if (onQuantityChange) {
      await onQuantityChange(data.id, newQuantity);
    }
  };

  return (
    <li className={styles.productCard}>
      <div className={styles.productInfo}>
        <img
          src={imageURL}
          alt={imageAlt || 'product image'}
          className={styles.productImage}
        />

        <div className={styles.productNameArea}>
          <h4>{productName}</h4>
          <div>{variant}</div>
        </div>
      </div>
      <div className={styles.counterWrapper}>
        <div className={styles.pricesDiscount}>
          {discount && <div>{discount}</div>}
          <div className={!discount ? styles.price : styles.oldPrice}>
            {price}
          </div>
        </div>

        <Counter
          price={priceValue ?? price}
          amount={data.quantity}
          onChange={handleQuantityChange}
          disabled={isUpdating}
        />
      </div>
      <div className={styles.deleteWrapper}>
        <IconButton
          onClick={handleDelete}
          aria-label="Delete item"
          disabled={isDeleting}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  );
}
