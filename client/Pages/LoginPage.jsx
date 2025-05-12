import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from '../src/axios'; // Ваш axios
import { useNavigate, useLocation } from 'react-router-dom'; // Імпортуємо useNavigate і useLocation

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Для отримання переданих даних

  // Заповнення полів пошти та пароля, якщо передано через state
  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    }
  }, [location.state]);

  // Обробка логіну
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log(response.data);
      // Збереження токену в localStorage або в контексті
      localStorage.setItem("token", response.data.token);
      // Перенаправлення після входу
      navigate('/home');
    } catch (error) {
      setError(error.response ? error.response.data.message : "Сталася помилка при вході");
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 3, bgcolor: '#fff', borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Вхід</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Увійти
        </Button>
      </form>
      <Typography variant="body3" sx={{ mt: 2 }}>
        Немає акаунту? <Button onClick={() => navigate('/register')}>Зареєструватися</Button>
      </Typography>
    </Box>
    
  );

};

export default LoginPage;
