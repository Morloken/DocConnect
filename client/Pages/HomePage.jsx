import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Fade,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "../src/axios.jsx";
import LogOutButton from "../src/components/logOutButton.jsx";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Помилка при отриманні даних користувача", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)",
  }}
>

      {/* Hero Section + User Info */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#1976d2",
          color: "#fff",
          px: { xs: "5vw", md: "5vw" },
          py: "4vh",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 0 },
        }}
      >
        {/* Text Block */}
        <Box sx={{ flex: 1 }}>
          <Fade in timeout={1000}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                mb: "1vh",
              }}
            >
              DocConnect
            </Typography>
          </Fade>
          <Typography
            variant="h6"
            sx={{ fontSize: "clamp(1rem, 1.5vw, 1.5rem)", mb: "4vh" }}
          >
            Онлайн-запис, консультації, історія хвороб і ще більше можливостей у
            декілька кліків
          </Typography>
          <Button
            onClick={() => navigate("/appointments")}
            variant="contained"
            size="large"
            startIcon={<ScheduleIcon />}
            sx={{
              px: "3vw",
              py: "1vh",
              fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
              borderRadius: "1.5rem",
            }}
          >
            Записатись на прийом
          </Button>
        </Box>

        {/* User Info Card */}
        <Box sx={{ flex: 1, ml: { md: 6 }, width: "100%" }}>
          <Card sx={{ p: "2vh", borderRadius: "1.5rem", bgcolor: "#ffffffdd" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
              >
                Привіт, {user?.name || "користувачу"}!
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {user && (
                <>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ width: 30, height: 30 }}>
                      {user.name[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" color="text.primary">
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                    <LogOutButton setUser={setUser} />
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    startIcon={<AccountCircleIcon />}
                    onClick={() => navigate("/profile")}
                    color="primary"
                  >
                    Профіль
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Main Content Section */}
      <Box sx={{ flexGrow: 1, px: { xs: "5vw", md: "8vw" }, py: "5vh" }}>
        {/* Додатковий контент сайту */}
        <Grid container spacing={3}>
          <Grid item xs={20} md={3}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Наші Послуги
              </Typography>
              <Typography variant="body1">
                Ми надаємо широкий спектр медичних послуг для вашого здоров'я.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Консультації
              </Typography>
              <Typography variant="body1">
                Отримайте консультації від провідних фахівців.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Історія Хвороб
              </Typography>
              <Typography variant="body1">
                Зберігайте та переглядайте вашу історію хвороб онлайн.
              </Typography>
            </Paper>
          </Grid>
          {/* Additional Site Content */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Партнери
              </Typography>
              <Typography variant="body1">
                Ми співпрацюємо з провідними медичними установами.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Контакти
              </Typography>
              <Typography variant="body1">
                Зв'яжіться з нами для отримання додаткової інформації.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Відгуки
              </Typography>
              <Typography variant="body1">
                Прочитайте відгуки наших клієнтів та поділіться своїми враженнями.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {/* My Appointments Section */}
<Box sx={{ px: { xs: "5vw", md: "8vw" }, py: "5vh" }}>
  <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
    Мої записи
  </Typography>
  <Grid container spacing={3}>
    {[1, 2].map((item) => (
      <Grid item xs={12} md={6} key={item}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Прийом у терапевта</Typography>
          <Typography variant="body2" color="text.secondary">
            Дата: 20 травня 2025, 14:00
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Лікар: Іваненко Ольга Сергіївна
          </Typography>
          <Button
            variant="text"
            size="small"
            sx={{ mt: 1 }}
            onClick={() => navigate("/appointments")}
          >
            Детальніше
          </Button>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>

{/* Recommended Doctors Section */}
<Box sx={{ px: { xs: "5vw", md: "8vw" }, py: "5vh", bgcolor: "#e3f2fd" }}>
  <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
    Рекомендовані лікарі
  </Typography>
  <Grid container spacing={3}>
    {[1, 2, 3].map((doc) => (
      <Grid item xs={12} md={4} key={doc}>
        <Card sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 56, height: 56 }}>ДК</Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Дорошенко Катерина
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Кардіолог, клініка "МедЛайф"
              </Typography>
            </Box>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, borderRadius: "1.5rem" }}
            onClick={() => navigate("/appointments")}
          >
            Записатись
          </Button>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

{/* Quick Actions Section */}
<Box sx={{ px: { xs: "5vw", md: "8vw" }, py: "5vh" }}>
  <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
    Швидкі дії
  </Typography>
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Новий запис
        </Typography>
        <Button
          onClick={() => navigate("/appointments")}
          variant="outlined"
          fullWidth
        >
          Обрати лікаря
        </Button>
      </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Медична карта
        </Typography>
        <Button
          onClick={() => navigate("/medical-records")}
          variant="outlined"
          fullWidth
        >
          Переглянути
        </Button>
      </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Повідомлення
        </Typography>
        <Button
          onClick={() => navigate("/notifications")}
          variant="outlined"
          fullWidth
        >
          Перевірити
        </Button>
      </Paper>
    </Grid>
  </Grid>
</Box>







      {/* Additional Content Section */}
      <Box
        sx={{
          px: { xs: "5vw", md: "8vw" },
          py: "5vh",
          bgcolor: "#e3f2fd",
          borderRadius: "1.5rem",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Додаткові можливості
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Переглянути записи
              </Typography>
              <Button
                onClick={() => navigate("/appointments")}
                variant="outlined"
                fullWidth
              >
                Переглянути
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Переглянути записи
              </Typography>
              <Button
                onClick={() => navigate("/appointments")}
                variant="outlined"
                fullWidth
              >
                Переглянути
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Переглянути записи
              </Typography>
              <Button
                onClick={() => navigate("/appointments")}
                variant="outlined"
                fullWidth
              >
                Переглянути
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: "3vh",
          px: "auto",
          bgcolor: "#1976d2",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          DocConnect © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2">
          Розроблено з турботою про ваше здоров'я
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;


