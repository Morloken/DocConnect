const express = require("express");
const User = require("../models/userModel"); //  модель користувача
const sequelize = require("../config/db.config"); //  конфігурація бази даних
const cors = require("cors");
const router = express.Router();

// Створення користувача (POST)
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Отримання всіх користувачів (GET)
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users!" });
  }
});

module.exports = router;
