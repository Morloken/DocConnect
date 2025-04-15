import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from '../src/axios'; // Ваш axios
import { useNavigate } from 'react-router-dom'; // Імпортуємо useNavigate

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Використовуємо useNavigate для редиректу

  // Обробка реєстрації
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      // Перенаправлення на сторінку входу з передачею email та password
      navigate('/login', { state: { email, password } });
    } catch (error) {
      setError(error.response ? error.response.data.message : "Сталася помилка при реєстрації");
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 3, bgcolor: '#fff', borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Реєстрація</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <form onSubmit={handleRegister}>
        <TextField
          label="Ім'я"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
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
          Зареєструватися
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Уже маєте акаунт? <a href="/login">Увійти</a>
        </Typography>
      </form>
    </Box>
  );
};

export default RegisterPage;
