import Footer from '../../components/layout/footer/Footer';
import { Link } from 'react-router-dom';

import styles from './notFound.module.scss';
import { Button } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.content}>
          <h2 className={styles.pageHeader}>
            Oops! This page
            <br /> doesn’t exist.
          </h2>
          <div className={styles.buttonWrapper}>
            <Button className={styles.button}>home</Button>
            <Button className={styles.button}>back</Button>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
