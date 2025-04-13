import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#455A64', // основний колір
    },
    secondary: {
      main: '#d32f2f', //  вторинний колір
    },
    background: {
      default: '#f4f6f8', // Основний фон
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', //  шрифт
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
