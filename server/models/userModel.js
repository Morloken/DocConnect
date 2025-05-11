
const {  DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Імпортуємо налаштування підключення до БД

// Описуємо модель User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  services: {
    type: DataTypes.ARRAY(DataTypes.STRING), // масив рядків
    allowNull: true, // дозволяємо null, якщо послуги не вказані
  },
}, {
  tableName: 'Users', // Вказуємо, що це таблиця Users
  timestamps: true,   // Включаємо createdAt та updatedAt
}

);


// Експортуємо модель для подальшого використання
module.exports = User;
