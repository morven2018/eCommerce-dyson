import styles from './ProductTitle.module.scss';

interface ProductTitle {
  readonly name: string;
  readonly price: number;
}

export default function ProductTitle({ name, price }: ProductTitle) {
  return (
    <div className={styles.titleContainer}>
      <h2 className={styles.name}>{name}</h2>
      <h2 className={styles.price}>{price}$</h2>
    </div>
  );
}
