import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogOutButton = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Ви дійсно хочете вийти?")) {
      localStorage.removeItem('token'); // видаляємо токен
      setUser(null); // очищуємо користувача з state
      navigate('/register');
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2, px: '2vw', py: '1vh', fontSize: 'clamp(0.4rem, 0.8vw, 0.8rem)', borderRadius: '0.8rem' }}>
      Вийти
    </Button>
  );
};

export default LogOutButton;
