import dayjs from 'dayjs';
import * as yup from 'yup';

const zipCodeRegexes: { [key: string]: RegExp } = {
  gb: /^([A-Z]{1,2}\d[A-Z0-9]? ?[0-9][A-Z]{2})$/,
  de: /^(\d{5})$/,
  fr: /^(\d{5})$/,
  it: /^(\d{5})$/,
  es: /^(\d{5})$/,
  nl: /^(\d{4} ?[A-Z]{2})$/,
  be: /^(\d{4})$/,
  ch: /^(\d{4})$/,
  at: /^(\d{4})$/,
  pt: /^(\d{4}-\d{3})$/,
  se: /^(\d{3} ?\d{2})$/,
  no: /^(\d{4})$/,
  fi: /^(\d{5})$/,
  dk: /^(\d{4})$/,
  ie: /^[AC-FHKNPRTVWXY]\d{2}[0-9AC-FHKNPRTVWXY]{4}$/,
};

export const emailValidationSchema = yup
  .string()
  .required('This field is mandatory')
  .test(
    'no-spaces',
    'Email must not have leading/trailing spaces',
    (value) => !value || !/(^\s)|(\s$)/.test(value)
  )
  .test(
    'contains-at-and-dot',
    '@ must separate local part and domain',
    (value) => !value || value.includes('@')
  )
  .test(
    'not-only-domain',
    'Email must not contain only domain name',
    (value) => !value || !/^@+/.test(value)
  )
  .matches(
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/,
    'Email must be in format test@email.email'
  );

export const passwordValidationSchema = yup
  .string()
  .required('This field is mandatory')
  .min(8, 'Password must be at least 8 characters')
  .matches(/\d/, 'Password must contain at least 1 digit')
  .matches(/[A-Z]/, 'Password must have 1 uppercase letter')
  .matches(/[a-z]/, 'Password must have 1 lowercase letter')
  .matches(/^[a-zA-Z0-9]+$/, 'Password must only contain letters and digits');

export const phoneValidationSchema = yup
  .string()
  .required('This field is mandatory')
  .test(
    'phone-format',
    'Phone must be in correct format: (e.g. +4917612345678)',
    (value) =>
      /^\+\s?[\d\s()+-]{8,15}$/.test(value) &&
      !/[^\d\s()+-]/.test(value.substring(1))
  );

export const textValidationSchema = yup
  .string()
  .required('This field is mandatory')
  .min(3, 'Field must be at least 3-characters')
  .test(
    'not-only-spaces',
    'Field must be at least 3-characters, no spaces',
    (value) => !/^\s+$/.test(value ?? '')
  )
  .test(
    'no-special-chars',
    'Field must not contain special characters',
    (value) => /^[a-zA-Z а-яА-Я]+$/.test(value ?? '')
  );

export const textValidationSchema2 = yup
  .string()
  .required('This field is mandatory')
  .min(3, 'Field must be at least 3-characters')
  .test(
    'not-only-spaces',
    'Field must be at least 3-characters, no spaces',
    (value) => !/^\s+$/.test(value ?? '')
  );

export const birthValidationSchema = yup
  .date()
  .required('This field is mandatory')
  .max(dayjs().subtract(18, 'year').toDate(), 'Age must be over 18')
  .typeError('Please enter a valid date');

export const zipCodeValidationSchema = yup
  .string()
  .required('This field is mandatory')
  .test('correct-zip', 'Invalid postal code', (value) =>
    Object.keys(zipCodeRegexes).some((code) => zipCodeRegexes[code].test(value))
  );

export type EmailFormData = {
  email: string;
  password: string;
};
