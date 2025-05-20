import * as yup from 'yup';

const messages = {
  email: {
    thereWhitespace:
      'Email address must not contain leading or trailing whitespace',
    invalidFormat:
      "Email address must contain an '@' symbol separating local part and domain name",
    notHaveDomain: `Email address must contain a domain name (e.g., example.com)`,
  },
  password: {
    minLength: 'Password should be at least 8 characters long',
    thereWhitespace:
      'Password address must not contain leading or trailing whitespace',
    needUpperCase: 'Password must contain at least one uppercase letter (A-Z)',
    needLowerCase: 'Password must contain at least one lowercase letter (a-z)',
    needNumber: 'Password must contain at least one digit (0-9)',
    needSpecialCharacter:
      'Password must contain at least one special character (e.g., !@#$%^&*)',
  },
};

export const defaultSchema = yup.object({
  email: yup
    .string()
    .required()
    .test('email trim', messages.email.thereWhitespace, (value) => {
      return value === value?.trim();
    })
    .matches(/^[a-zA-Z0-9_.+-]+@/, messages.email.invalidFormat)
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\./, messages.email.notHaveDomain)
    .email(),

  password: yup
    .string()
    .required('Password is a required field')
    .min(8, messages.password.minLength)
    .test('password trim', messages.password.thereWhitespace, (value) => {
      return value === value?.trim();
    })
    .matches(/[A-Z]{1}/, messages.password.needUpperCase)
    .matches(/[a-z]{1}/, messages.password.needLowerCase)
    .matches(/[0-9]{1}/, messages.password.needNumber)
    .matches(/[!@#$%^&*]{1}/, messages.password.needSpecialCharacter),
});
