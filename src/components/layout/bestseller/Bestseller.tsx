import styles from './Bestseller.module.scss';

export default function Bestseller() {
  const handleShopNow = () => {
    window.location.href = 'https://www.dyson.com/vacuum-cleaners/v8-absolute';
  };

  return (
    <section className={styles.bestseller}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Bestseller</h2>
          <div className={styles.subtitle}>Dyson V8 Absolute vacuum</div>
          <p className={styles.paragraph}>
            The Dyson V8 Absolute effortlessly tackles pet hair and debris with
            its advanced detangling technology, ensuring a deep clean on carpets
            and hard floors alike. Its lightweight design and up to 40 minutes
            of fade-free suction make it ideal for quick, versatile cleaning
            throughout your home.
          </p>
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={handleShopNow}
          aria-label="Shop now for Dyson V8 Absolute vacuum"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}
