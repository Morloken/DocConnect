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
        bgcolor: "#f0f4f8",
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

      {/* Резервний простір для контенту, якщо знадобиться */}
      <Box sx={{ flexGrow: 1, px: { xs: "5vw", md: "8vw" }, py: "5vh" }}>
        {/* Можна додати додаткові компоненти/блоки у майбутньому */}
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
