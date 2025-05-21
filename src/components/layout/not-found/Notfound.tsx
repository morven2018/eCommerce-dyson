import { useNavigate } from 'react-router-dom';
import styles from './notFound.module.scss';
import { Button } from '@mui/material';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h2 className={styles.pageHeader}>
          Oops! This page
          <br /> doesn’t exist.
        </h2>
        <div className={styles.buttonWrapper}>
          <Button className={styles.button} onClick={handleGoHome}>
            home
          </Button>
          <Button className={styles.button} onClick={handleGoBack}>
            back
          </Button>
        </div>
      </div>
    </main>
  );
};
