export const loginValidation = {
  required: 'Email is required.',
  validate: (value: string) => {
    if (/^\s|\s$/.test(value)) {
      return 'Email address must not contain leading or trailing whitespace.';
    }
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/.test(value)) {
      return 'Enter a valid email address';
    }

    return true;
  },
};

export const passwordValidation = {
  required: 'Password is required.',
  validate: (value: string) => {
    if (value !== value.trim()) {
      return 'Password must not contain leading or trailing whitespace.';
    }
    if (!/[A-Z]{1}/.test(value)) {
      return 'Must contain at least one uppercase letter (A-Z).';
    }
    if (!/[a-z]{1}/.test(value)) {
      return 'Must contain at least one lowercase letter (a-z).';
    }
    if (!/[0-9]{1}/.test(value)) {
      return 'Must contain at least one digit (0-9).';
    }
    if (!/[!@#$%^&*]{1}/.test(value)) {
      return 'Must contain at least one special character (e.g., !@#$%^&*).';
    }

    if (value.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    return true;
  },
};
