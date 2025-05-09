import styles from './LoginForm.module.scss';
import InputEmail from '../../ui/inputs/InputEmail';
import InputPassword from '../../ui/inputs/InputPassword';
import { Link } from 'react-router-dom';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from 'react-hook-form';
import { loginValidation, passwordValidation } from './validation';

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { handleSubmit, control } = useForm<Inputs>({ mode: 'onChange' });
  const { errors } = useFormState({ control });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="email"
        rules={loginValidation}
        render={({ field }) => {
          return (
            <InputEmail
              {...field}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="password"
        rules={passwordValidation}
        render={({ field }) => {
          return (
            <InputPassword
              {...field}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          );
        }}
      />

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
