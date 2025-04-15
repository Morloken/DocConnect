import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../themes/theme'; // Тема для MUI
import { CssBaseline, Container } from '@mui/material';
import RegisterPage from '../Pages/RegisterPage'; // Сторінка реєстрації
import HomePage from '../Pages/HomePage'; // Головна сторінка
import LoginPage from '../Pages/LoginPage'; 
import UserProfile from '../Pages/UserProfile';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
          <Routes>
            <Route path="/register" element={<RegisterPage />} /> {/* Сторінка реєстрації */}
          <Route path="/login" element={<LoginPage />} />  {/* Сторінка входу */}
            <Route path="/home" element={<HomePage />} />  {/* Головна сторінка */}
            <Route path="/profile" element={<UserProfile />} />  
          </Routes>
        
      </ThemeProvider>
    </Router>
  );
}

export default App;
