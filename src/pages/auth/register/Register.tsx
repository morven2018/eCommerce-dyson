import Footer from '../../../components/layout/footer/Footer';

import styles from './Register.module.scss';
import { RegisterForm } from '../../../components/common/forms/register-form/RegisterForm';
import { JSX } from 'react';
import Help from '../../../components/layout/help/Help';

export const RegisterPage = (): JSX.Element => {
  return (
    <>
      <h2 className={styles.pageHeader}>Register</h2>
      <RegisterForm />
      <Help />
      <Footer></Footer>
    </>
  );
};
