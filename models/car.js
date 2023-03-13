const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Car = sequelize.define("Car", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    make: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    year: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    model: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    interior_color: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    exterior_color: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
});

module.exports = Car;
