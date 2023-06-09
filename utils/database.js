require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cars", process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DIALECT,
    host: process.env.DB_HOST,
    port: "3306",
});

module.exports = sequelize;

//mysql host: 127.0.0.1
