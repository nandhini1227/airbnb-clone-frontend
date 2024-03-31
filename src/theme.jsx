import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff385c',
    },
    secondary: {
      main: '#00a699',
    },
    error: {
      main: '#ff5a5f',
    },
   
  },
  typography: {
    fontFamily: [
      'Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
    ].join(','),
  },
});

export default theme;
