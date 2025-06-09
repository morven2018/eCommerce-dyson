import styles from './Card.module.scss';
import { Link } from 'react-router-dom';

interface Card {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number | null;
  src: string;
}

const handleAddToCart = (e: React.MouseEvent) => {
  e.stopPropagation();
  console.log('add product to cart');
  console.log(e.target);
  if (e.target instanceof HTMLButtonElement) {
    e.target.classList.add('added');
  }
};

export const Card = ({
  id,
  name,
  description,
  price,
  discountedPrice,
  src,
}: Card) => {
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
      <button className={styles.button} onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
};
