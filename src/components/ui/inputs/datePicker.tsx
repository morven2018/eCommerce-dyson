import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { FormControl, FormHelperText } from '@mui/material';

type InputDateProps = {
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
};

export default function InputDate({
  value = null,
  onChange = () => {},
  onBlur = () => {},
  error = false,
  helperText = '',
  label = 'Date of birth',
  required = false,
}: InputDateProps) {
  return (
    <FormControl fullWidth error={error} required={required}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          onClose={onBlur}
          slotProps={{
            textField: {
              fullWidth: true,
              error: error,
              required,
              onBlur: onBlur,
            },
          }}
        />
      </LocalizationProvider>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
