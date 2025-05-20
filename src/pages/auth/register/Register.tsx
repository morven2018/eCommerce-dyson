import styles from './Register.module.scss';
import { RegisterForm } from '@components/common/forms/register-form/RegisterForm';
import { JSX } from 'react';
import Help from '@components/layout/help/Help';

export const RegisterPage = (): JSX.Element => {
  return (
    <>
      <section className={styles.registerBlock}>
        <h2 className={styles.pageHeader}>Registration Form</h2>
        <h4 className={styles.subheader}>Please fill in the form below</h4>
        <RegisterForm />
      </section>
      <Help />
    </>
  );
};
