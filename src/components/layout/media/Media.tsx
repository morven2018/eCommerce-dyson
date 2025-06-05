import styles from './Media.module.scss';

export default function Media() {
  return (
    <section className={styles.media}>
      <h2 className={styles.title}>Follow us on social media</h2>
      <div className={styles.subtitle}>
        For the latest product updates and innovations!
      </div>
      <div className={styles.container}>
        <a
          href="https://x.com/dyson"
          rel="noreferrer"
          target="_blank"
          className={`${styles.link} ${styles.linkX}`}
        >
          <span className={`${styles.icon} ${styles.iconX}`}></span>
        </a>
        <a
          href="https://www.instagram.com/dysonusa/"
          rel="noreferrer"
          target="_blank"
          className={styles.link}
        >
          <span className={`${styles.icon} ${styles.iconI}`}></span>
        </a>
        <a
          href="https://www.youtube.com/dyson"
          rel="noreferrer"
          target="_blank"
          className={styles.link}
        >
          <span className={`${styles.icon} ${styles.iconY}`}></span>
        </a>
        <a
          href="https://www.tiktok.com/@dyson_usa"
          rel="noreferrer"
          target="_blank"
          className={styles.link}
        >
          <span className={`${styles.icon} ${styles.iconT}`}></span>
        </a>
      </div>
    </section>
  );
}
