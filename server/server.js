require("dotenv").config(); // Завантажуємо конфігураційний файл .env
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db.config");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// Налаштування CORS
const corsOptions = {
  origin: "http://localhost:5173", // Дозволяємо доступ лише з фронтенду
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Для парсингу JSON в запитах

// Підключення до бази даних
sequelize.authenticate()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection error:", err));

sequelize.sync({ alter: true })
  .then(() => console.log("DB Synced"));

// Роутинг
app.use("/users", userRoutes);


//  роут для записів на прийом
app.use("/appointments", appointmentRoutes);



// // роут для отримання записів на прийом
// app.get("/appointments", async (req, res) => {
//   try {
//     const appointments = await appointmentRoutes.findAll();
//     res.json(appointments);
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
