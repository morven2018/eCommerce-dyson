import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  fullWidth?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  fullWidth = true,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth={fullWidth}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        label={label}
      />
    </FormControl>
  );
};

export default InputField;
