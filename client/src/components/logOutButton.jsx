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
    <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mt: 2 }}>
      Вийти
    </Button>
  );
};

export default LogOutButton;
