import { Container, styled } from '@mui/material';

export const CustomContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    maxWidth: 1200,
    padding: 0,
  },
}));
