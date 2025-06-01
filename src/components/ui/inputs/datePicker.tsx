import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import styles from './input.module.scss';

type InputDateProps = {
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
  onBlur?: () => void;
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
  onBlur = () => {},
  error = false,
  helperText = '',
  label = 'Date of birth',
  required = false,
  disabled = false,
  onEditClick,
  isEditing = false,
}: Readonly<InputDateProps>) {
  return (
    <FormControl
      fullWidth
      error={error}
      required={required}
      disabled={disabled}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          onClose={onBlur}
          readOnly={onEditClick ? !isEditing : false}
          enableAccessibleFieldDOMStructure={false}
          className={styles.input}
          disabled={disabled}
          slots={{
            textField: (params) => (
              <TextField
                {...params}
                fullWidth
                error={error}
                required={required}
                onBlur={onBlur}
                InputProps={{
                  ...params.InputProps,
                  readOnly: onEditClick ? !isEditing : false,
                  endAdornment: (
                    <Stack direction="row" spacing={1}>
                      {(!onEditClick || isEditing) &&
                        params.InputProps?.endAdornment}
                      {onEditClick && (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={isEditing ? 'Save date' : 'Edit date'}
                            onClick={onEditClick}
                            edge="end"
                            disabled={disabled}
                            sx={{ ml: 1 }}
                          >
                            {isEditing ? <SaveIcon /> : <EditIcon />}
                          </IconButton>
                        </InputAdornment>
                      )}
                    </Stack>
                  ),
                }}
              />
            ),
          }}
          slotProps={{
            actionBar: {
              actions: isEditing ? ['clear', 'today'] : [],
            },
            field: {
              clearable: false,
            },
            inputAdornment: {
              position: 'end',
            },
          }}
        />
      </LocalizationProvider>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
