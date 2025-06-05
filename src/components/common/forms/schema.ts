import {
  emailValidationSchema,
  passwordValidationSchema,
} from '@shared/lib/validator/validator';
import * as yup from 'yup';

export const defaultSchema = yup.object({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});
