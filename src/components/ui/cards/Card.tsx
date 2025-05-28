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
    description.length < 60 ? description : `${description.slice(0, 60)}...`;

  function saveIdAndShowProduct() {
    localStorage.setItem('dysonProductId', id);
    navigate('/product');
  }

  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.cardImage} />
      <div className={styles.cardInfo}>
        <div className={styles.price}>${(price / 100).toFixed(2)}</div>
        {discountedPrice && (
          <div className={styles.discount}>
            Discount: -{Math.round(((price - discountedPrice) / price) * 100)}%
          </div>
        )}
        <h3 className={styles.name}>{productName}</h3>
        <div className={styles.description}>{productDescription}</div>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.button}
            onClick={() => saveIdAndShowProduct()}
          >
            Read more
          </button>
          <button className={styles.button}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};
