import React, { useState, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import {
  FormControl,
  FormHelperText,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import styles from './input.module.scss';

type InputDateProps = {
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onEditClick?: () => void;
  isEditing?: boolean;
};

export default function InputDate({
  value = null,
  onChange = () => {},
  error = false,
  helperText = '',
  label = 'Date of birth',
  required = false,
  disabled = false,
  readOnly = false,
  onEditClick,
  isEditing = false,
}: Readonly<InputDateProps>) {
  dayjs.locale('en');
  const [internalValue, setInternalValue] = useState(
    value?.format('YYYY-MM-DD') ?? ''
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange(newValue ? dayjs(newValue) : null);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onEditClick?.();
  };

  return (
    <FormControl
      error={error}
      required={required}
      disabled={disabled}
      fullWidth
      className={styles.inputWrapper}
    >
      <TextField
        label={label}
        type="date"
        value={internalValue}
        onChange={handleChange}
        inputRef={inputRef}
        disabled={disabled || (readOnly && !isEditing)}
        inputProps={{
          lang: 'en',
        }}
        InputProps={{
          readOnly: readOnly && !isEditing,
          sx: {
            '& input::-webkit-calendar-picker-indicator': {
              position: 'absolute',
              right: `${onEditClick && (readOnly || isEditing) ? 48 : 10}px`,
              zIndex: 1,
              '& svg': {
                fontSize: '36px',
              },
            },
            paddingRight: '96px',
            '& .MuiInputAdornment-root': {
              '& button': {
                '& svg': {
                  fontSize: '1,5rem',
                },
              },
            },
          },
          endAdornment: (
            <InputAdornment position="end">
              {onEditClick && (readOnly || isEditing) && (
                <IconButton
                  onClick={handleEditClick}
                  disabled={disabled}
                  edge="end"
                  size="small"
                  className={styles.icon}
                >
                  {isEditing ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
