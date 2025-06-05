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

type InputEmailProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onEditClick?: () => void;
  isEditing?: boolean;
};

export default function InputEmail({
  value,
  onChange,
  error,
  helperText,
  label = 'Email',
  readOnly = false,
  disabled = false,
  onEditClick,
  isEditing = false,
}: Readonly<InputEmailProps>) {
  return (
    <FormControl variant="outlined" fullWidth error={error} disabled={disabled}>
      <InputLabel htmlFor="form-email">{label}</InputLabel>
      <OutlinedInput
        id="form-email"
        type="text"
        value={value}
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
