// server.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db.config");
const User = require("./models/userModel");
const bcrypt = require("bcrypt"); // Імпортуємо bcrypt для хешування паролів
require("dotenv").config();

const app = express();

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || origin === "http://localhost:5173") {
//       callback(null, true); // Allow requests from the frontend
//     } else {
//       callback(new Error("Not allowed by CORS")); // Block other origins
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, // Allow cookies and credentials
//   exposedHeaders: ["Set-Cookie"],
//   maxAge: 3600,
// };

// // Use CORS globally
// app.use(cors(corsOptions));
// ==== CORS FIX ====
const corsOptions = {
  origin: "http://localhost:5173", //  Дозволити тільки фронтенд
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions)); //  ДО ВСІХ РОУТІВ
// ===================

// Middleware для парсингу JSON
app.use(express.json());

// Перевірка підключення до бази даних
sequelize.authenticate()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection error:", err));

// Синхронізація таблиць
sequelize.sync({ alter: true })
  .then(() => console.log("DB Synced"));

// Маршрут для створення нового користувача
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Перевірка, чи користувач уже існує
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Користувач з таким email вже існує" });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Зберігаємо хешований пароль
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Повертаємо відповідь з новим користувачем (без паролю)
    const { password: _, ...userData } = newUser.toJSON(); // Викидаємо пароль
    res.status(201).json({
      message: "Користувача створено успішно",
      user: userData,
    });
  } catch (error) {
    console.error("Помилка при створенні користувача:", error);
    res.status(500).send("Помилка сервера під час створення користувача");
  }
});

// Маршрут для отримання користувача за ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Користувача не знайдено" });
    res.json(user); // повертає і services
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  
});

module.exports = app;
