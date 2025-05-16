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

interface Country {
  code: string;
  name: string;
}

interface CountrySelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: FieldError;
  countries?: Country[];
}

const DEFAULT_COUNTRIES: Country[] = [
  { code: 'gb', name: 'United Kingdom' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'it', name: 'Italy' },
  { code: 'es', name: 'Spain' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'be', name: 'Belgium' },
  { code: 'ch', name: 'Switzerland' },
  { code: 'at', name: 'Austria' },
  { code: 'pt', name: 'Portugal' },
  { code: 'se', name: 'Sweden' },
  { code: 'no', name: 'Norway' },
  { code: 'fi', name: 'Finland' },
  { code: 'dk', name: 'Denmark' },
  { code: 'ie', name: 'Ireland' },
];

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
