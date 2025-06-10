import schoolLogo from '../../../assets/images/logo.png';
import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <div className="rsschool">
      <p className={styles.project}>
        This project was developed as the final assignment of the Frontend,
        JavaScript (Stage 2) course.
      </p>

      <a
        className={styles.schoolLogo}
        href="https://rs.school/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className={styles.logoImage}
          src={schoolLogo}
          alt="Rsschool Logo"
        />
      </a>
    </div>
  );
}
