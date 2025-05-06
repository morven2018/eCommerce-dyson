import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bigContainer}>
        <div className={styles.container}>
          <h4 className={styles.title}>Catalog</h4>
          <Link to={'/'} className={styles.link}>
            Vacuums & floor cleaners
          </Link>
          <Link to={'/'} className={styles.link}>
            Hair beauty{' '}
          </Link>
          <Link to={'/'} className={styles.link}>
            Air purifiers & heaters
          </Link>
          <Link to={'/'} className={styles.link}>
            Headphones
          </Link>
          <Link to={'/'} className={styles.link}>
            Lighting
          </Link>
        </div>
        <div className={styles.container}>
          <h4 className={styles.title}>See also</h4>
          <Link to={'/'} className={styles.link}>
            About us
          </Link>
          <h4 className={styles.title}>Our contacts</h4>
          <a
            href="https://github.com/morven2018"
            rel="noreferrer"
            target="_blank"
            className={styles.link}
          >
            Team Lead: Alena
          </a>
          <a
            href="https://github.com/morven2018"
            rel="noreferrer"
            target="_blank"
            className={styles.link}
          >
            Frontend Developer: Igor
          </a>
          <a
            href="https://github.com/morven2018"
            rel="noreferrer"
            target="_blank"
            className={styles.link}
          >
            Frontend Developer: Yulia
          </a>
        </div>
      </div>
      <div className={styles.description}>
        © RS School 2025, This is a non-commercial educational project built
        for learning purposes.
      </div>
    </footer>
  );
}
