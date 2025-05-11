// appointmentRoutes.js
const express = require('express');
const { sequelize, DataTypes } = require('../config/db.config'); // Імпортуємо sequelize і DataTypes
const Appointment = require('../models/Appointment');



const router = express.Router();
// const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');


// Створення запису на прийом
router.post('/', authenticate, async (req, res) => {
  const { doctor_id, appointment_time, symptoms } = req.body;

  if (!doctor_id || !appointment_time || !symptoms) {
    return res.status(400).send({ message: 'Усі поля є обов\'язковими!' });
  }

  try {
    const parsedDate = new Date(appointment_time);
    if (isNaN(parsedDate)) {
      return res.status(400).send({ message: 'Невірний формат дати!' });
    }

    //  Щоб побачити дані перед створенням
    console.log('Дані для створення запису:', {
      doctor_id,
      patient_id: req.userId, 
      appointment_time: parsedDate,
      symptoms
    });

    const newAppointment = await Appointment.create({
      doctor_id,
      patient_id: req.userId,
      appointment_time: parsedDate,
      symptoms,
      status: 'new',
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).send(newAppointment);
  } catch (error) {
    console.error('Помилка при створенні запису:', error); // Це головне! Тут буде причина
    res.status(500).send({ message: 'Щось пішло не так!' });
  }
});


// Отримання всіх записів на прийом
router.get('/', authenticate, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patient_id: req.userId }, // Отримуємо записи лише для поточного користувача
    });
    res.json(appointments);
  } catch (error) {
    console.error("Помилка при отриманні записів:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
