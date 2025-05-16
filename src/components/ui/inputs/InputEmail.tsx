import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

type InputEmailProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText: string | undefined;
};

export default function InputEmail({
  value,
  onChange,
  error,
  helperText,
}: Readonly<InputEmailProps>) {
  return (
    <FormControl variant="outlined" fullWidth error={error}>
      <InputLabel htmlFor="form-email">Email</InputLabel>
      <OutlinedInput
        id="form-email"
        type="email"
        value={value ?? ''}
        onChange={onChange}
        label="Email"
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
