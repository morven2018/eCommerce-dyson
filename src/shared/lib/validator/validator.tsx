import dayjs from 'dayjs';
import * as yup from 'yup';

const zipCodeRegexes: { [key: string]: RegExp } = {
  gb: /^([A-Z]{1,2}\d[A-Z0-9]? ?\d[A-Z]{2})$/,
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

const examples: Record<string, string> = {
  gb: 'e.g., SW1A 1AA or EC1A 1BB',
  de: 'e.g., 10115',
  fr: 'e.g., 75001',
  it: 'e.g., 00100',
  es: 'e.g., 28001',
  nl: 'e.g., 1234 AB',
  be: 'e.g., 1000',
  ch: 'e.g., 8001',
  at: 'e.g., 1010',
  pt: 'e.g., 1000-001',
  se: 'e.g., 123 45',
  no: 'e.g., 0021',
  fi: 'e.g., 00100',
  dk: 'e.g., 1000',
  ie: 'e.g., A65 F4E2',
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
  .test(
    'domain-min-length',
    'Domain must be at least 2 characters long',
    (value) => {
      if (!value) return true;
      const parts = value.split('@');
      if (parts.length < 2) return true;
      const domainParts = parts[1].split('.');
      return domainParts[0].length >= 2;
    }
  )
  .matches(
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/,
    'Email must be in format test@email.email'
  );

export const passwordValidationSchema = yup
  .string()
  .required('This field is mandatory')
  .matches(/\d/, 'Password must contain at least 1 digit')
  .matches(/[A-Z]/, 'Password must have 1 uppercase letter')
  .matches(/[a-z]/, 'Password must have 1 lowercase letter')
  .matches(
    /[!@#$%^&*]/,
    'Password must contain at least one special character (e.g., !@#$%^&*)'
  )
  .matches(
    /^[a-zA-Z0-9!@#$%^&*]+$/,
    'Password must only contain letters, digits and special characters (!@#$%^&*)'
  )
  .min(8, 'Password must be at least 8 characters');

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
  .trim()
  .required('This field is mandatory')
  .min(1, 'Field must be at least 1-character')
  .test(
    'not-only-spaces',
    'Field must be at least 1-character, no spaces',
    (value) => !/^\s+$/.test(value ?? '')
  )
  .test(
    'no-digit',
    'Field must not contain numbers',
    (value) => !/\d/.test(value ?? '')
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
  .min(dayjs().subtract(100, 'year').toDate(), 'Age must be less than 100')
  .typeError('Please enter a valid date');

export const zipCodeValidationSchema = yup
  .string()
  .required('This field is mandatory')
  .test('country-selected', 'Select country before', function () {
    const country = this.parent.country;
    return !!country;
  })
  .test('correct-zip', function (value) {
    const country = this.parent.country;
    if (!country) {
      return this.createError({
        message: 'Select country before',
      });
    }

    const regex = zipCodeRegexes[country];
    if (!regex) return true;

    if (!regex.test(value)) {
      const example = examples[country] || '';
      return this.createError({
        message: `Invalid postal code. The postal code should be like ${example}`,
      });
    }
    return true;
  });

export type EmailFormData = {
  email: string;
  password: string;
};
