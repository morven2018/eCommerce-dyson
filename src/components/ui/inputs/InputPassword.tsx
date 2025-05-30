import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import styles from './input.module.scss';

type InputPasswordProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | undefined;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onEditClick?: () => void;
  isEditing?: boolean;
};

export default function InputPassword({
  value,
  onChange,
  error,
  helperText,
  label = 'Password',
  readOnly = false,
  disabled = false,
  onEditClick,
  isEditing = false,
}: Readonly<InputPasswordProps>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" fullWidth error={error} disabled={disabled}>
      <InputLabel htmlFor="form-password">{label}</InputLabel>
      <OutlinedInput
        id="form-password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        label={label}
        readOnly={readOnly && !isEditing}
        className={styles.input}
        endAdornment={
          <InputAdornment position="end">
            {
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }

            {onEditClick && (readOnly || isEditing) && (
              <IconButton
                aria-label="toggle edit"
                onClick={onEditClick}
                edge="end"
              >
                {isEditing ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            )}
          </InputAdornment>
        }
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
