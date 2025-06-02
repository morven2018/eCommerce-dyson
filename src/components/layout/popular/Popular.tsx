import styles from './Popular.module.scss';
import fave1 from '@assets/images/fave1.png';
import fave2 from '@assets/images/fave2.png';
import fave3 from '@assets/images/fave3.png';
import { Link } from 'react-router-dom';

export default function Popular() {
  return (
    <section className={styles.popular}>
      <div className={styles.container}>
        <div className={styles.card}>
          <img
            src={fave1}
            alt="Dyson Purifier Big"
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <div className={styles.title}>
              <h3 className={styles.cardHeader}>Dyson Purifier Big</h3>
              <h4 className={styles.subheader}>Nickel/Prussian Blue</h4>
            </div>
            <span className={styles.line}></span>

            <p className={styles.cardText}>
              Dyson Purifier Big+Quiet Formaldehyde in Nickel and Prussian blue
              Our quietest, most powerful air purifier. Purifies large spaces up
              to 264 sq ft or projects up to 32 ft, evenly.¹ And cools you in
              warmer months.³
            </p>
            <Link
              to={'/product/a19f3f51-2def-4201-807a-4cb922aa2dd7'}
              className={styles.cardButton}
              aria-label="Buy Dyson Purifier"
            >
              {' '}
              Shop now
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <img src={fave2} alt="Dyson OnTrac" className={styles.cardImage} />
          <div className={styles.cardContent}>
            <div className={styles.title}>
              <h3 className={styles.cardHeader}>Dyson OnTrac™</h3>
              <h4 className={styles.subheader}>
                noise cancelling headphones CNC Copper
              </h4>
            </div>
            <span className={styles.line}></span>
            <p className={styles.cardText}>
              Best-in-class noise cancellation Up to 55 hours of battery life⁵
              Ergonomically certified for comfort¹ Mix and match with our 360°
              visualizer to make them yours.Additional ear cushions and outer
              caps sold separately.
            </p>
            <Link
              to={'/product/29694750-1c83-4eca-a148-91272cada8e9'}
              className={styles.cardButton}
              aria-label="Buy Dyson OnTrac"
            >
              {' '}
              Shop now
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <img src={fave3} alt="Dyson Airstrait" className={styles.cardImage} />
          <div className={styles.cardContent}>
            <div className={styles.title}>
              <h3 className={styles.cardHeader}>Dyson Airstrait</h3>
              <h4 className={styles.subheader}>Prussian Blue/Rich Copper</h4>
            </div>

            <span className={styles.line}></span>
            <p className={styles.cardText}>
              Wet to dry straightening, with air. No hot plates. No heat
              damage.⁴ Reduces time spent drying and styling by an average of
              25%.⁺ Powerful, directional airflow smooths and aligns hair.
              Achieve salon-quality results effortlessly at home.
            </p>
            <Link
              to={'/product/ced23753-8524-4996-a3fd-0c99b3eb79c9'}
              className={styles.cardButton}
              aria-label="Buy Dyson Airstrait"
            >
              {' '}
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
