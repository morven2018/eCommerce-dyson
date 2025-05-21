import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

type InputPhoneProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText: string | undefined;
};

export default function InputPhone({
  value,
  onChange,
  error,
  helperText,
}: Readonly<InputPhoneProps>) {
  return (
    <FormControl variant="outlined" fullWidth error={error}>
      <InputLabel htmlFor="form-phone">Phone number</InputLabel>
      <OutlinedInput
        id="form-phone"
        type="phone"
        value={value ?? ''}
        onChange={onChange}
        label="Phone number"
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
