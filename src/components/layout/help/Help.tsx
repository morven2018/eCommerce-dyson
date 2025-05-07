import styles from './Help.module.scss';

export default function Help() {
  return (
    <section className={styles.media}>
      <div className={styles.container}>
        <h2 className={styles.title}>Help Center</h2>
        <div className={styles.wrapper}>
          <p className={styles.paragraph}>
            Welcome to Dyson's Support Center! We're here to assist with your
            queries, troubleshooting, and product care. Explore our resources or
            contact us for personalized help with your Dyson products.
          </p>
          <div className={styles.linksContainer}>
            <span className={styles.linkText}>Contact us</span>
            <a
              href="mailto:help@dyson.com"
              className={styles.link}
              aria-label="Send email to help@dyson.com"
            >
              help@dyson.com
            </a>
            <span className={styles.linkText}>Call us</span>
            <a
              href="tel:+1-800-555-1234"
              className={styles.link}
              aria-label="Call support at +1-800-555-1234"
            >
              +1-800-555-1234
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
