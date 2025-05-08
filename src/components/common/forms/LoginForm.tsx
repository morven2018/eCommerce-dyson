import styles from './LoginForm.module.scss';
import InputEmail from '../../ui/inputs/InputEmail';
import InputPassword from '../../ui/inputs/InputPassword';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  return (
    <form className={styles.form} noValidate autoComplete="off">
      <InputEmail></InputEmail>
      <InputPassword></InputPassword>
      <button className={`${styles.button} 'button'`}>Sign in</button>
      <p className={styles.text}>
        Forgot password. Click to reset. <a href="#">Reset Password</a>
      </p>
      <p className={styles.text}>
        Don’t have an account? <Link to={'/register'}>Register here</Link>
      </p>
    </form>
  );
}
