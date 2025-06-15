import styles from './LoginForm.module.scss';
import InputEmail from '@components/ui/inputs/InputEmail';
import InputPassword from '@components/ui/inputs/InputPassword';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { defaultSchema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userAuthorization } from '@shared/api/commerce-tools/authorization';
import { useAuth } from '@shared/context/auth-hooks';
import { mergeCartsOnLogin } from '@shared/api/commerce-tools/cart/mergeCarts';
import { getTokenFromLS } from '@shared/api/local-storage/getTokenFromLS';
import { getCartIdFromLS } from '@shared/api/local-storage/getCartIdFromLS';
import { getCurrentCustomer } from '@shared/api/commerce-tools/getUserInfo';
import { getCustomerCart } from '@shared/api/commerce-tools/cart/getCustomerCart';
import { encryptData } from '@shared/lib/password/encryption';

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
      const tokenName = 'authDysonToken';
      const oldToken = getTokenFromLS();
      localStorage.setItem(tokenName, result.access_token);
      setIsUserUnauthorized(false);

      const oldCartId = getCartIdFromLS();

      const user = await getCurrentCustomer();

      if (!user) throw new Error('Can not get user information');

      localStorage.setItem('password', encryptData(data.password));

      if (oldCartId)
        await mergeCartsOnLogin(oldToken ?? '', user?.id, oldCartId);
      else await getCustomerCart(user?.id);
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
        Forgot password? Click to reset. <a href="#">Reset Password</a>
      </p>
      <p className={styles.text}>
        Don’t have an account? <Link to={'/register'}>Register here</Link>
      </p>
    </form>
  );
}
