import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bigContainer}>
        <div className={styles.container}>
          <h4 className={styles.title}>Catalog</h4>
          <Link to={'/catalog/vacuums'} className={styles.link}>
            Vacuums & floor cleaners
          </Link>
          <Link to={'/catalog/heater'} className={styles.link}>
            Air purifiers & heaters
          </Link>
          <Link to={'/catalog/headphones'}className={styles.link}>
            Headphones
          </Link>
          <Link to={'/catalog/hair-care'} className={styles.link}>
            Hair beauty{' '}
          </Link>
          <Link to={'/catalog/lighting'} className={styles.link}>
            Lighting
          </Link>
        </div>
        <div className={styles.contactsContainer}>
          <h4 className={styles.contactsTitle}>See also</h4>
          <Link to={'/about'} className={styles.link}>
            About us
          </Link>
          <div className={styles.teamContainer}>
            <h4 className={styles.teamTitle}>Connect with our team</h4>
            <div className={styles.teamMember}>
              <a
                href="https://github.com/morven2018"
                rel="noreferrer"
                target="_blank"
                className={styles.link}
              >
                <svg
                  className={styles.githubIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span className={styles.name}>Alena Pudina</span>
              </a>
              <span className={styles.jobTitle}>Team Lead</span>
            </div>
            <div className={styles.teamMember}>
              <a
                href="https://github.com/Ihar-Batura"
                rel="noreferrer"
                target="_blank"
                className={styles.link}
              >
                <svg
                  className={styles.githubIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span className={styles.name}>Igor Batura</span>
              </a>
              <span className={styles.jobTitle}>Frontend Dev</span>
            </div>
            <div className={styles.teamMember}>
              <a
                href="https://github.com/yuliafire"
                rel="noreferrer"
                target="_blank"
                className={styles.link}
              >
                <svg
                  className={styles.githubIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span className={styles.name}>Yulia Podgurskaia</span>
              </a>
              <span className={styles.jobTitle}>Frontend Dev</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <p>This is a non-commercial project built for educational purposes.</p>
        <p>© RS School 2025</p>
      </div>
    </footer>
  );
}
