import styles from './ProductCard.module.scss';
import Counter from '@components/ui/counter/Counter';
import { Variants } from '../variants/Variants';
import { apiGetCartById } from '@shared/api/commerce-tools/apiGetCartById';
import { useState, useEffect } from 'react';
import { openDialog } from '@services/DialogService';
import { apiAddProductToCart } from '@shared/api/commerce-tools/apiAddProductToCart';
import { getCartIdFromLS } from '@shared/api/local-storage/getCartIdFromLS';
import { apiCreateNewCart } from '@shared/api/commerce-tools/apiCreateNewCart';
import { apiDeleteProductFromCart } from '@shared/api/commerce-tools/apiDeleteProductFromCart';
import { useCart } from '@shared/context/cart/useCart';
import { handleCatchError } from '@components/ui/error/catchError';

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
  const [quantity, setQuantity] = useState(1);
  const { setCart } = useCart();

  useEffect(() => {
    const checkIfInCart = async () => {
      try {
        const cartId = getCartIdFromLS();
        if (!cartId) return;

        const cart = await apiGetCartById();
        if (!cart?.lineItems) return;

        const isInCart = cart.lineItems.some((item) => item.productId === id);
        setIsProductInCart(isInCart);
        if (isInCart) {
          cart.lineItems.forEach((item) => {
            if (item.productId === id) {
              setQuantity(item.quantity);
            }
          });
        }
      } catch (error) {
        handleCatchError(error, 'Error get cart data');
      }
    };

    checkIfInCart();
  }, [id]);

  const handleAddOrRemoveProduct = async () => {
    try {
      if (isProductInCart && id) {
        const updatedCart = await apiGetCartById();

        const lineItem = updatedCart?.lineItems?.find(
          (item) => item.productId === id
        );

        if (!lineItem?.id) {
          openDialog('Product not found in cart', true);
          return;
        }

        await apiDeleteProductFromCart(lineItem.id, quantity);

        const response = await apiGetCartById();
        setCart(response);

        setQuantity(1);
        setIsProductInCart(false);
      } else if (id) {
        const cartId = getCartIdFromLS();

        if (!cartId) {
          const createCartData = await apiCreateNewCart();
          const newCartId = createCartData?.id;

          if (newCartId) {
            localStorage.setItem('cartIdDyson', newCartId);
          }
        }

        await apiAddProductToCart(id, quantity);

        const response = await apiGetCartById();
        setCart(response);

        setIsProductInCart(true);
      }
    } catch (error) {
      handleCatchError(error, 'Error adding/removing product');
    }
  };

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
      <Counter
        price={discountedPrice ?? price}
        amount={quantity}
        disabled={isProductInCart}
        onChange={(newQuantity) => setQuantity(newQuantity)}
      />
      <button className={styles.button} onClick={handleAddOrRemoveProduct}>
        {isProductInCart ? 'remove from cart' : 'add to cart'}
      </button>
      <Variants variants={variants} />
    </div>
  );
}
