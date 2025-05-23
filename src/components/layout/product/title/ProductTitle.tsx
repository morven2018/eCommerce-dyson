import styles from './ProductTitle.module.scss';

export default function ProductTitle() {
  const productName = 'Full Product name';
  const productPrice = '200$';
  return (
    <div className={styles.titleContainer}>
      <h2 className={styles.name}>{productName}</h2>
      <h2 className={styles.price}>{productPrice}</h2>
    </div>
  );
}
