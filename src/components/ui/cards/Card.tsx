import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
const alt = 'Product picture';

interface Card {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number | null;
  src: string;
  onClick?: (id: string) => void;
}

export const Card = ({
  id,
  name,
  description,
  price,
  discountedPrice,
  src,
}: Card) => {
  const productName = name.length < 30 ? name : `${name.slice(0, 30)}...`;
  const productDescription =
    description.length < 90 ? description : `${description.slice(0, 90)}...`;

  return (
    <Link
      to={`/product/${id}`}
      className={styles.container}
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
  );
};
