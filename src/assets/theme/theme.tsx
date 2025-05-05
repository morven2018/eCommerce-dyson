import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 900,
      xl: 1200,
    },
  },
});
