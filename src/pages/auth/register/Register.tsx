import Footer from '../../../components/layout/footer/Footer';

import styles from './Register.module.scss';
import { RegisterForm } from '../../../components/common/forms/register-form/RegisterForm';
import { JSX } from 'react';

export const RegisterPage = (): JSX.Element => {
  return (
    <>
      <h2 className={styles.pageHeader}>Register</h2>
      <RegisterForm></RegisterForm>
      <Footer></Footer>
    </>
  );
};
