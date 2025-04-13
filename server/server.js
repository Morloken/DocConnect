
const express = require("express");
const sequelize = require("./config/db.config");
const User = require("./models/userModel"); // Імпортуємо модель User
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Перевірка підключення до бази даних
sequelize.authenticate()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection error:", err));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Створення таблиць (якщо потрібно, не синхронізуємо автоматично)
sequelize.sync({ alter: true }) // або { force: true } для повного ресету
  .then(() => console.log("DB Synced"));

// Приклад маршруту для отримання користувачів

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving users');
  }
});
// Приклад маршруту для створення користувача
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});




module.exports = app;
