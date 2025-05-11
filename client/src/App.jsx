import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../themes/theme';
import { CssBaseline } from '@mui/material';
import RegisterPage from '../Pages/RegisterPage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import UserProfile from '../Pages/UserProfile';
import AppointmentPage from '../Pages/AppointmentPage';
import AppointmentDetail from '../src/components/AppointmentDetail';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/*  Редірект з кореня на /register */}
          <Route path="/" element={<Navigate to="/register" replace />} />
          
          <Route path="/register" element={<RegisterPage />} /> {/* Сторінка реєстрації */}
          <Route path="/login" element={<LoginPage />} />  {/* Сторінка входу */}
            <Route path="/home" element={<HomePage />} />  {/* Головна сторінка */}
            <Route path="/profile" element={<UserProfile />} />  {/* Профіль користувача */}
            <Route path="/appointments" element={<AppointmentPage />} />  {/* Сторінка запису на прийом */}

            <Route path="/appointments/:id" element={<AppointmentDetail />} /> {/* Сторінка деталей запису на прийом */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
