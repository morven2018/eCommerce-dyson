import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

export default function InputEmail() {
  const [email, setEmail] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="form-email">Email</InputLabel>
      <OutlinedInput
        id="form-email"
        type="email"
        value={email}
        onChange={handleChange}
        label="Email"
      />
    </FormControl>
  );
}
