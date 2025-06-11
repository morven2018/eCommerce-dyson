import styles from './ProductCard.module.scss';
import Counter from '@components/ui/counter/Counter';
import { Variants } from '../variants/Variants';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';
import { useState, useEffect } from 'react';
import { openDialog } from '@services/DialogService';

interface VariantsData {
  iconUrl: string;
  name: string;
}

interface ProductCard {
  id?: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number | null;
  variants: VariantsData[];
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  discountedPrice,
  variants,
}: Readonly<ProductCard>) {
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    const checkIfInCart = async () => {
      try {
        const cart = await apiGetCartById();
        if (!cart || !cart.lineItems) return;

        const isInCart = cart.lineItems.some((item) => item.productId === id);
        setIsProductInCart(isInCart);
        console.log('isInCart', isInCart);
      } catch (error) {
        let message = 'Error get cart data';

        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === 'string') {
          message = error;
        }

        openDialog(message, true);
      }
    };

    checkIfInCart();
  }, [id]);

  return (
    <div className={styles.container}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.description}>{description}</div>
      <div className={styles.price}>
        Price: ${(discountedPrice ?? price).toFixed(2)}
      </div>
      {discountedPrice && (
        <div className={styles.initial}>Initial price: ${price.toFixed(2)}</div>
      )}
      <Counter price={discountedPrice ?? price} />
      <button className={styles.button}>
        {isProductInCart ? 'remove from cart' : 'add to cart'}
      </button>
      <Variants variants={variants} />
    </div>
  );
}
