import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Controller,
  Control,
  FieldError,
  Path,
  FieldValues,
} from 'react-hook-form';
import {
  DEFAULT_COUNTRIES,
  ICountry,
} from '../../../shared/constants/countries';

interface CountrySelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: FieldError;
  onChange?: (value: string) => void;
  countries?: ICountry[];
  disabled?: boolean;
}

export function CountrySelect<T extends FieldValues>({
  control,
  name,
  label,
  error,
  countries = DEFAULT_COUNTRIES,
}: Readonly<CountrySelectProps<T>>) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={`${String(name)}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            labelId={`${String(name)}-label`}
            label={label}
            value={field.value}
            onChange={field.onChange}
            error={!!error}
          >
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && (
        <Typography color="error" variant="body2">
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
}
