import styles from '@components/common/forms/register-form/RegisterForm.module.scss';

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export const InputText = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  name,
  fullWidth = true,
  error = false,
  helperText,
  required = false,
  disabled = false,
}: InputFieldProps) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth={fullWidth}
      error={error}
      required={required}
      disabled={disabled}
    >
      <InputLabel htmlFor={id} className={styles.label}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        className={styles.input}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

InputText.displayName = 'InputText';
