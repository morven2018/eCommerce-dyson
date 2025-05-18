import styles from './Strengths.module.scss';
import strength1 from '../../../assets/images/strength1.jpeg';
import strength2 from '../../../assets/images/strength2.jpeg';
import strength3 from '../../../assets/images/strength3.jpeg';
import strength4 from '../../../assets/images/strength4.jpeg';

export default function Strengths() {
  return (
    <section className={styles.strengths}>
      <div className={styles.wrapper}>
        <h2 className={styles.sectionTitle}>WHY choose us?</h2>
        <div className={styles.container}>
          <div className={styles.card} data-testid="strength-card">
            <img
              src={strength1}
              alt="Scientist in a lab"
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardHeader}>Innovative Technology</h3>
              <span className={styles.line}></span>
              <p className={styles.cardText} data-testid="card-text">
                Dyson products feature cutting-edge technology like cyclonic
                suction and bladeless fans, delivering superior performance and
                efficiency for vacuums, hair tools, and air purifiers. Their
                patented digital motors spin at incredible speeds for unmatched
                power while remaining energy-efficient.
              </p>
            </div>
          </div>
          <div className={styles.card} data-testid="strength-card">
            <div className={styles.cardContent}>
              <h3 className={styles.cardHeader}>Powerful Performance</h3>
              <span className={styles.line}></span>
              <p className={styles.cardText} data-testid="card-text">
                Dyson vacuums offer exceptional suction power, effectively
                removing dirt, pet hair, and allergens, ensuring a deep clean on
                various surfaces with lasting results. Their innovative design
                and advanced filtration system make them a top choice for both
                homes and offices.
              </p>
            </div>
            <img
              src={strength2}
              alt="Dyson vacuum cleaner"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.card} data-testid="strength-card">
            <img
              src={strength3}
              alt="Dyson Headphones"
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardHeader}>Ergonomic Design</h3>
              <span className={styles.line}></span>
              <p className={styles.cardText} data-testid="card-text">
                Dyson products are crafted for comfort and ease, with
                lightweight builds and balanced handles that reduce strain
                during use. Thoughtful details like swivel steering and cordless
                freedom enhance maneuverability in tight spaces. Dyson’s
                ergonomic designs make daily tasks effortless and efficient.
              </p>
            </div>
          </div>
          <div className={styles.card} data-testid="strength-card">
            <div className={styles.cardContent}>
              <h3 className={styles.cardHeader}>Durability and Longevity</h3>
              <span className={styles.line}></span>
              <p className={styles.cardText} data-testid="card-text">
                The Dyson hair dryer features advanced airflow technology and
                energy-efficient designs, utilizing recycled materials to
                minimize environmental impact while delivering exceptional
                drying and styling performance with durability and
                sustainability in mind.
              </p>
            </div>
            <img
              src={strength4}
              alt="Dyson Hair Cair product"
              className={styles.cardImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
