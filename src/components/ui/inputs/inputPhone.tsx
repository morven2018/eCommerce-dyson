import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

export default function InputPhone() {
  const [phone, setPhone] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="form-phone">Phone number</InputLabel>{' '}
      <OutlinedInput
        id="form-phone"
        type="tel"
        value={phone}
        onChange={handleChange}
        label="Phone number"
      />
    </FormControl>
  );
}
