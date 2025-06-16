import schoolLogo from '../../../assets/images/logo.png';
import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <div className="rsschool">
      <h3 className={styles.title}> Our Collaboration</h3>
      <p className={styles.collab}>
      Before each sprint, our team defined and assigned core tasks to ensure clear responsibilities. We used a Telegram group chat for real-time communication, enabling rapid troubleshooting of issues. For project management, we maintained a Trello board, providing a clear, visual overview of tasks (e.g., ‘To Do,’ ‘In Progress,’ ‘Done’) for efficient progress tracking. To enhance code quality and collaboration, we conducted code reviews for all pull requests.
      </p>
      <hr className={styles.divider} />
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
