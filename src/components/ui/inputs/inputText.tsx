import styles from '@components/common/forms/register-form/RegisterForm.module.scss';
import React from 'react';

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  IconButton,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
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
  readOnly?: boolean;
  onEditClick?: () => void;
  isEditing?: boolean;
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
  readOnly = false,
  onEditClick,
  isEditing = false,
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
        readOnly={readOnly}
        endAdornment={
          readOnly || isEditing ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle edit"
                onClick={onEditClick}
                edge="end"
              >
                {isEditing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

InputText.displayName = 'InputText';
