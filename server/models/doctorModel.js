// models/doctorModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.сonfig");


const Doctor = sequelize.define("Doctor", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  specialty: { type: DataTypes.STRING, allowNull: false },
  hospital: { type: DataTypes.STRING, allowNull: true },
  licensenumber: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Doctor;
