import styles from './LoginForm.module.scss';
import InputEmail from '@components/ui/inputs/InputEmail';
import InputPassword from '@components/ui/inputs/InputPassword';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { defaultSchema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userAuthorization } from '@shared/api/commerce-tools/authorization';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/auth-hooks';

export default function LoginForm() {
  const navigate = useNavigate();
  const { setIsUserUnauthorized } = useAuth();

  const form = useForm({
    resolver: yupResolver(defaultSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitForm = async (data: yup.InferType<typeof defaultSchema>) => {
    const result = await userAuthorization(data);
    if (result) {
      localStorage.setItem('authDysonToken', result.access_token);
      setIsUserUnauthorized(false);
      navigate('/');
    }
  };

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={form.handleSubmit(submitForm)}
    >
      <Controller
        control={form.control}
        name="email"
        render={({ field }) => {
          return (
            <InputEmail
              {...field}
              error={!!form.formState.errors.email}
              helperText={form.formState.errors.email?.message}
              value={form.getValues('email')}
              onChange={(e) => {
                form.setValue('email', e.target.value);
                form.trigger('email');
              }}
            />
          );
        }}
      />
      <Controller
        control={form.control}
        name="password"
        render={({ field }) => {
          return (
            <InputPassword
              {...field}
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message}
              value={form.getValues('password')}
              onChange={(e) => {
                form.setValue('password', e.target.value);
                form.trigger('password');
              }}
            />
          );
        }}
      />

      <button
        type="submit"
        className={styles.button}
        disabled={!form.formState.isValid}
      >
        Sign in
      </button>

      <p className={styles.text}>
        Forgot password. Click to reset. <a href="#">Reset Password</a>
      </p>
      <p className={styles.text}>
        Don’t have an account? <Link to={'/register'}>Register here</Link>
      </p>
    </form>
  );
}
