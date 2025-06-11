import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
import { getCartIdFromLS } from '@shared/api/local-storage/getCartIdFromLS';
import { useState } from 'react';
import { apiCreateNewCart } from '@shared/api/commerce-tools/apiCreateNewCart';
import { apiAddProductToCart } from '@shared/api/commerce-tools/apiAddProductToCart';

interface Card {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number | null;
  src: string;
  isInCart: boolean;
}

export const Card = ({
  id,
  name,
  description,
  price,
  discountedPrice,
  src,
  isInCart,
}: Card) => {
  const [inCart, setInCart] = useState(isInCart);
  const [loading, setLoading] = useState(false);

  const alt = 'Product picture';
  const maxProductNameLength = 30;
  const maxProductDescriptionLength = 75;
  const productName =
    name.length < maxProductNameLength
      ? name
      : `${name.slice(0, maxProductNameLength)}...`;

  const productDescription =
    description.length < maxProductDescriptionLength
      ? description
      : `${description.slice(0, maxProductDescriptionLength)}...`;

  const addToCart = async () => {
    setLoading(true);

    const cartId = getCartIdFromLS();

    if (cartId === null) {
      const createCartData = await apiCreateNewCart();
      const id = createCartData?.id;
      if (id) {
        localStorage.setItem('cartIdDyson', id);
      }
    }

    apiAddProductToCart(id);

    setLoading(false);
    setInCart(true);
  };

  return (
    <div className={styles.container}>
      <Link
        to={`/product/${id}`}
        className={styles.linkContainer}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault();
            e.currentTarget.click();
          }
        }}
      >
        <img src={src} alt={alt} className={styles.cardImage} />
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoWrapper}>
            <div className={styles.priceContainer}>
              {discountedPrice && (
                <span className={styles.discountedPrice}>
                  Price: ${(discountedPrice / 100).toFixed(2)}
                </span>
              )}
              <span
                className={`${styles.price} ${discountedPrice ? styles.strikethrough : ''}`}
              >
                {discountedPrice ? 'Initial price' : 'Price'} $
                {(price / 100).toFixed(2)}
              </span>
            </div>
            <span className={styles.name}>{productName}</span>
            <span className={styles.line}></span>
          </div>
          <div className={styles.description}>{productDescription}</div>
        </div>
      </Link>
      <button
        onClick={addToCart}
        disabled={inCart || loading}
        className={styles.button}
      >
        {loading ? 'Loading...' : inCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};
