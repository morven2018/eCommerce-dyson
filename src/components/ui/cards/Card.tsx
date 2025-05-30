import styles from './Card.module.scss';
import { useNavigate } from 'react-router-dom';

interface Card {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number | null;
  src: string;
}

export const Card = ({
  id,
  name,
  description,
  price,
  discountedPrice,
  src,
}: Card) => {
  const navigate = useNavigate();
  const alt = 'Product picture';
  const productName = name.length < 30 ? name : `${name.slice(0, 30)}...`;
  const productDescription =
    description.length < 75 ? description : `${description.slice(0, 75)}...`;

  function saveIdAndShowProduct() {
    localStorage.setItem('dysonProductId', id);
    navigate('/product');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      saveIdAndShowProduct();
    }
  }

  return (
    <div
      className={styles.container}
      onClick={saveIdAndShowProduct}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
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
              {discountedPrice ? 'Initial price:' : 'Price:'} $
              {(price / 100).toFixed(2)}
            </span>
          </div>
          <span className={styles.name}>{productName}</span>
          <span className={styles.line}></span>
        </div>
        <div className={styles.description}>{productDescription}</div>
      </div>
    </div>
  );
};
