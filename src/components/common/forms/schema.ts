import * as yup from 'yup';

export const defaultSchema = yup.object({
  email: yup
    .string()
    .required()
    .test(
      'email trim',
      'Email address must not contain leading or trailing whitespace',
      (value) => {
        return value === value?.trim();
      }
    )
    .matches(
      /^[a-zA-Z0-9_.+-]+@/,
      `Email address must contain an '@' symbol separating local part and domain name`
    )
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\./,
      `Email address must contain a domain name (e.g., example.com)`
    )
    .email(),

  password: yup
    .string()
    .required('Password is a required field')
    .min(8, 'Password should be at least 8 characters long')
    .test(
      'password trim',
      'Password address must not contain leading or trailing whitespace',
      (value) => {
        return value === value?.trim();
      }
    )
    .matches(
      /[A-Z]{1}/,
      'Password must contain at least one uppercase letter (A-Z)'
    )
    .matches(
      /[a-z]{1}/,
      'Password must contain at least one lowercase letter (a-z)'
    )
    .matches(/[0-9]{1}/, 'Password must contain at least one digit (0-9)')
    .matches(
      /[!@#$%^&*]{1}/,
      'Password must contain at least one special character (e.g., !@#$%^&*)'
    ),
});
