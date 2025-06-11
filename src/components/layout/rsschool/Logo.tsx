import schoolLogo from '../../../assets/images/logo.png';
import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <div className="rsschool">
      <p className={styles.project}>
        This project was developed as the final assignment of the Frontend,
        JavaScript (Stage 2) course.
      </p>
      <p className={styles.collab}>
        Team roles were assigned in Trello, and communication was handled through frequent Google Meet video calls and ongoing Telegram chats.
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
