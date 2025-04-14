import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4d79ff', // основний колір
    },
    secondary: {
      main: '#abdbe3', //  вторинний колір
    },
    background: {
      default: '#063970', // Основний фон
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
