const express = require("express");
const sequelize = require("./config/database");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
sequelize.sync({ alter: true }) // або { force: true } для повного ресету
  .then(() => console.log("DB Synced"));

module.exports = app;