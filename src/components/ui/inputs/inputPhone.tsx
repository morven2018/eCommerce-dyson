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

type InputPhoneProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText: string | undefined;
  disabled?: boolean;
  readOnly?: boolean;
  onEditClick?: () => void;
  isEditing?: boolean;
};

export default function InputPhone({
  value,
  onChange,
  error,
  helperText,
  readOnly = false,
  disabled = false,
  onEditClick,
  isEditing = false,
}: Readonly<InputPhoneProps>) {
  return (
    <FormControl variant="outlined" fullWidth error={error} disabled={disabled}>
      <InputLabel htmlFor="form-phone">Phone number</InputLabel>
      <OutlinedInput
        id="form-phone"
        type="tel"
        value={value ?? ''}
        onChange={onChange}
        label="Phone number"
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
}
