import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../themes/theme'; // Тема для MUI
import { CssBaseline, Container } from '@mui/material';
import RegisterPage from '../Pages/RegisterPage'; // Сторінка реєстрації
import HomePage from '../Pages/HomePage'; // Головна сторінка (поки що пуста)

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Routes>
            <Route path="/" element={<RegisterPage />} /> {/* Сторінка реєстрації */}
            <Route path="/home" element={<HomePage />} />  {/* Головна сторінка */}
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
