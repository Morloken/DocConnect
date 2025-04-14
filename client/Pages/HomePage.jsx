import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Avatar, Divider, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import MedicationIcon from '@mui/icons-material/Medication';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import axios from '../src/axios.jsx'; // Ваш axios

import UserProfileCard from '../src/components/UserProfileCard.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Отримуємо дані користувача
  useEffect(() => {
    const userId = 1; // Тут потрібно вказати правильний id, якщо потрібно
    axios.get(`/users/${userId}`).then((response) => {
      setUser(response.data); // Зберігаємо дані користувача в стан
    }).catch((error) => {
      console.error("Помилка при отриманні даних користувача", error);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', bgcolor: '#f0f4f8' }}>
      {/* Hero Section */}
      <Box sx={{
        height: '40vh', width: '100%', bgcolor: '#1976d2', color: '#fff', px: '5vw', py: '4vh', textAlign: 'center',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <Fade in timeout={1000}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: 'clamp(2rem, 5vw, 3.5rem)', mb: '2vh' }}>
            DocConnect — твоє здоров'я під контролем
          </Typography>
        </Fade>
        <Typography variant="h6" sx={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', mb: '4vh' }}>
          Онлайн-запис, консультації, історія хвороб і ще більше можливостей у декілька кліків
        </Typography>
        <Button
          onClick={() => navigate('/appointments')}
          variant="contained"
          size="large"
          startIcon={<ScheduleIcon />}
          sx={{ px: '3vw', py: '1vh', fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', borderRadius: '1.5rem' }}
        >
          Записатись на прийом
        </Button>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ px: '5vw', py: '5vh', flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: '2vh', borderRadius: '2rem', height: '100%' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: '1vh' }}>
                  Профіль користувача
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Перевір дані профілю, онови інформацію та стеж за здоров’ям у зручному форматі.
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: '3vh', py: '1vh' }}
                  startIcon={<AccountCircleIcon />}
                >
                  Редагувати профіль
                </Button>

                {/* Передача даних користувача в UserProfileCard */}
                {user && (
                  <Box mt={4}>
                    <UserProfileCard user={user} />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ py: '3vh', px: 'auto', bgcolor: '#1976d2', color: 'white', textAlign: 'center' }}>
        <Typography variant="h6">DocConnect © {new Date().getFullYear()}</Typography>
        <Typography variant="body2">Розроблено з турботою про ваше здоров'я</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
