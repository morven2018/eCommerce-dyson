import styles from './Benefits.module.scss';

const benefits = [
  {
    imgClass: styles.benefitImg1,
    text: '2-Year Limited Warranty on All Products',
  },
  {
    imgClass: styles.benefitImg2,
    text: 'Free Shipping on Every Order',
  },
  {
    imgClass: styles.benefitImg3,
    text: '30-Day Money-Back Guarantee',
  },
];

export default function Benefits() {
  return (
    <div className={styles.benefitsContainer}>
      <h2 className={styles.benefitsTitle}>Buy from Dyson</h2>
      <h3 className={styles.benefitsSubtitle}>Benefits</h3>
      <div className={styles.infoContainer}>
        {benefits.map((benefit, index) => (
          <div key={`${benefit}${index}`} className={styles.benefitWrapper}>
          <div key={`${benefit}${index}`} className={styles.benefit}>
            <div className={`${styles.benefitImg} ${benefit.imgClass}`}></div>
            <div className={styles.benefitText}>{benefit.text}</div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}
