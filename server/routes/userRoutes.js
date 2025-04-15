// const express = require("express");
// const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const router = express.Router();
// const authenticate = require('../middleware/authenticate');

// // Логін користувача
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });

//     if (!user) return res.status(400).json({ message: "Невірний email або пароль" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Невірний email або пароль" });

//     const token = jwt.sign({ id: user.id }, "secret-key", { expiresIn: "1d" });
//     res.json({ token });
//   } catch (error) {
//     console.error("Помилка при вході:", error);
//     res.status(500).json({ message: "Внутрішня помилка сервера" });
//   }
// });

// // Отримання всіх користувачів
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Не вдалося отримати користувачів!" });
//   }
// });
// // Реєстрація нового користувача
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Перевірка чи користувач існує
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Користувач з таким email вже існує" });
//     }

//     // Хешування пароля
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Створення нового користувача
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     // Викидаємо пароль перед поверненням
//     const { password: _, ...userData } = newUser.toJSON();
//     res.status(201).json({
//       message: "Користувача створено успішно",
//       user: userData,
//     });
//   } catch (error) {
//     console.error("Помилка при створенні користувача:", error);
//     res.status(500).send("Помилка сервера під час створення користувача");
//   }
// });
// // Отримання користувача за ID
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(404).json({ message: "Користувача не знайдено" });
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Помилка сервера" });
//   }
// });

// // Отримання авторизованого користувача
// router.get("/me", authenticate, async (req, res) => {
//   try {
//     console.log("User ID from token:", req.userId); // Оновлення: Логування ID користувача
//     const user = await User.findByPk(req.userId, {
//       attributes: ["id", "name", "email"],
//     });

//     if (!user) {
//       console.log("User not found"); // Оновлення: Логування, якщо користувач не знайдений
//       return res.status(404).json({ message: "Користувача не знайдено" });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error("Помилка при отриманні користувача:", err);
//     res.status(500).json({ message: "Внутрішня помилка сервера" });
//   }
// });

// module.exports = router;
const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const authenticate = require("../middleware/authenticate");

// -------------------- Логін --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "Невірний email або пароль" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Невірний email або пароль" });

    const token = jwt.sign({ id: user.id }, "secret-key", { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    console.error("Помилка при вході:", error);
    res.status(500).json({ message: "Внутрішня помилка сервера" });
  }
});

// -------------------- Реєстрація --------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Користувач з таким email вже існує" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const { password: _, ...userData } = newUser.toJSON();
    res.status(201).json({
      message: "Користувача створено успішно",
      user: userData,
    });
  } catch (error) {
    console.error("Помилка при створенні користувача:", error);
    res.status(500).send("Помилка сервера під час створення користувача");
  }
});

// -------------------- Отримання всіх користувачів --------------------
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Не вдалося отримати користувачів!" });
  }
});

// -------------------- Отримання користувача за ID або 'me' --------------------
router.get("/:id", authenticate, async (req, res) => {
  try {
    let user;

    if (req.params.id === "me") {
      user = await User.findByPk(req.userId, {
        attributes: ["id", "name", "email"],
      });
    } else {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Невірний формат ID" });
      }
      user = await User.findByPk(id, {
        attributes: ["id", "name", "email"],
      });
    }

    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

module.exports = router;
