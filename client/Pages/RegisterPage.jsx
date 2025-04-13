import { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Хук для перенаправлення

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Для перенаправлення на іншу сторінку

  const handleRegister = () => {
    // Логіка реєстрації (наприклад, через API)

    // Якщо реєстрація успішна, перенаправляємо на головну сторінку
    navigate('/home');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Реєстрація
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister} // Відправка форми реєстрації
      >
        Зареєструватися
      </Button>
    </div>
  );
}

export default RegisterPage;
