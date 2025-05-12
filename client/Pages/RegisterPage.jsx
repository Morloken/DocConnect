import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "../src/axios"; // Ваш axios
import { useNavigate } from "react-router-dom"; // Імпортуємо useNavigate
import { MenuItem, Alert } from "@mui/material";


const RegisterPage = () => {
  const [role, setRole] = useState(""); // patient або doctor
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");
  const [licensenumber, setLicenseNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Використовуємо useNavigate для редиректу
  

  // Обробка реєстрації
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Будь ласка, заповніть усі обов’язкові поля.");
      return;
    }

    if (role === "doctor" && (!specialty || !hospital || !licensenumber)) {
      setError("Будь ласка, заповніть всі поля для лікаря.");
      return;
    }

    try {
      // Крок 1: реєстрація у таблиці Users
      const userResponse = await axios.post(
        "http://localhost:5000/users/register",
        {
          name,
          email,
          password,
          role,
          // specialty: role === "doctor" ? specialty : undefined,
          // hospital: role === "doctor" ? hospital : undefined,
          // licensenumber: role === "doctor" ? licenseNumber : undefined,
           specialty,
          hospital,
          licensenumber,
        }
      );
      console.log(userResponse.data);

      // // Крок 2: якщо це лікар — запис у таблицю doctors
      // if (role === "doctor") {
      //   await axios.post("/doctors", {
      //     name: userResponse.data.user.name,
      //     email: userResponse.data.user.email,
      //     specialty: specialty,
      //     hospital: hospital,
      //     licensenumber: licenseNumber,
      //   }); 
      // }

      // Перенаправлення на login
      navigate("/login", { state: { email, password } });
    } catch (err) {
      setError(
        err.response?.data?.message || "Сталася помилка при реєстрації."
      );
    }
  };

  return (
  
    <Box
      sx={{
        width: "100%",
        maxWidth: 450,
        mx: "auto",
        p: 3,
        bgcolor: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Реєстрація
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleRegister}>
        <TextField
          select
          label="Роль"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="patient">Пацієнт</MenuItem>
          <MenuItem value="doctor">Лікар</MenuItem>
        </TextField>

        <TextField
          label="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        {role === "doctor" && (
          <>
            <TextField
              label="Спеціальність"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Лікарня"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Номер ліцензії"
              value={licensenumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
          </>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Зареєструватися
        </Button>

        <Typography variant="body3" sx={{ mt: 2, textAlign: "center" }}>
          Уже маєте акаунт?  <Button onClick={() => navigate('/login')}>Увійти</Button>
        </Typography>
      </form>
    </Box>
  );
};

export default RegisterPage;
