import { CartData, CartLineItem } from '@shared/types/types';
import formatPrice from '@shared/utlis/price-formatter';
import Counter from '../counter/Counter';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartProductProps {
  data: CartLineItem;
  setData?: React.Dispatch<React.SetStateAction<CartData | null>>;
  onDelete?: (itemId: string) => void;
  onQuantityChange?: (itemId: string, quantity: number) => Promise<void>;
  isDeleting?: boolean;
  isUpdating?: boolean;
}

export default function CartProductCard({
  data,
  onDelete,
  onQuantityChange,
  isDeleting = false,
  isUpdating = false,
}: CartProductProps) {
  const [quantity] = useState(1);
  const imageURL = data.variant.images[0].url;
  const imageAlt = data.variant.images[0].label;
  const productName = data.name['en-US'];
  const variant = data.variant.key;
  const price = formatPrice(data.price.value);
  const discount = data.price.discounted
    ? formatPrice(data.price.discounted.value)
    : '';
  const priceValue = data.price.discounted
    ? data.price.discounted.value.centAmount / 100
    : data.price.value.centAmount / 100;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(data.id);
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    console.log(newQuantity);
    if (onQuantityChange) {
      await onQuantityChange(data.id, newQuantity);
    }
  };

  return (
    <li>
      <img src={imageURL} alt={imageAlt || 'product image'} />
      <div>
        <h4>{productName}</h4>
        <div>{variant}</div>
        <div>{price}</div>
        {discount && <div>{discount}</div>}
        <Counter
          price={priceValue ?? price}
          amount={quantity}
          onChange={handleQuantityChange}
          disabled={isUpdating}
        />
        <IconButton
          onClick={handleDelete}
          aria-label="Delete item"
          color="error"
          disabled={isDeleting}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  );
}
