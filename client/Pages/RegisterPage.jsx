import { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");  // Додаємо ім'я користувача
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      alert("Всі поля повинні бути заповнені.");
      return;
    }

    try {
      // Закоментуємо реальний виклик API
      // const response = await fetch("http://localhost:5000/users", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: name,
      //     email: email,
      //     password: password,
      //   }),
      //   credentials: "include", // Додаємо цю опцію для роботи з куками або сесією
      // });

      // Просто переходимо на домашню сторінку без реєстрації
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("Сталася помилка при реєстрації. Перевірте консоль для деталей.");
    }
  };

  return (
    <div>
      <Typography variant="h4">Реєстрація</Typography>
      <TextField
        label="Ім'я"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Пароль"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        Зареєструватися
      </Button>
    </div>
  );
}

export default RegisterPage;
