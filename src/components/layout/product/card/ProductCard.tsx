import styles from './ProductCard.module.scss';
import Counter from '@components/ui/counter/Counter';
import { Variants } from '../variants/Variants';

interface VariantsData {
  iconUrl: string;
  name: string;
}

interface ProductCard {
  name: string;
  description: string;
  price: number;
  discountedPrice: number | null;
  variants: VariantsData[];
}

export default function ProductCard({
  name,
  description,
  price,
  discountedPrice,
  variants,
}: ProductCard) {
  return (
    <div className={styles.container}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.description}>{description}</div>
      <div className={styles.price}>
        Price: ${discountedPrice?.toFixed(2) ?? price.toFixed(2)}
      </div>
      {discountedPrice && (
        <div className={styles.initial}>Initial price: ${price.toFixed(2)}</div>
      )}
      <Counter price={discountedPrice ?? price} />
      <button className={styles.button}>add to cart</button>
      <Variants variants={variants} />
    </div>
  );
}
