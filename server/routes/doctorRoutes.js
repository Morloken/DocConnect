const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const authenticate = require("../middleware/authenticate");


// const axios = require("axios");
// const bcrypt = require("bcrypt");   


// Маршрут для реєстрації лікаря
router.post("/register", async (req, res) => {
  const { name, email, specialty, hospital, licensenumber } = req.body;

  if (!name || !email || !specialty || !hospital || !licensenumber) {
    return res.status(400).json({ message: "Всі поля лікаря є обов’язковими" });
  }

  try {
    console.log("Отримано лікаря:", { specialty, hospital, licensenumber });

    const doctor = await Doctor.create({
      name,
      email,
      specialty,
      hospital,
      licensenumber,
    });

    res.status(201).json({ message: "Профіль лікаря створено", doctor });
  } catch (error) {
    console.error("Помилка при створенні лікаря:", error);
    res.status(500).json({ message: "Не вдалося додати лікаря" });
  }
});

module.exports = router;
