import LoginForm from '../../common/forms/LoginForm';
import styles from './Login.module.scss';

export default function Login() {
  return (
    <section className={styles.login}>
      <h2 className={styles.title}>Login</h2>
      <LoginForm></LoginForm>
    </section>
  );
}
