import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import styles from './input.module.scss';

type InputPhoneProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onEditClick?: () => void;
  isEditing?: boolean;
};

export default function InputPhone({
  value,
  onChange,
  label = 'Phone number',
  error,
  helperText,
  readOnly = false,
  disabled = false,
  onEditClick,
  isEditing = false,
}: Readonly<InputPhoneProps>) {
  return (
    <FormControl variant="outlined" fullWidth error={error} disabled={disabled}>
      <InputLabel htmlFor="form-phone">{label}</InputLabel>
      <OutlinedInput
        id="form-phone"
        type="tel"
        value={value ?? ''}
        onChange={onChange}
        label={label}
        readOnly={readOnly}
        className={styles.input}
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
}
