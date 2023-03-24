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
    brand: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    image_url: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    image_public_id: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    local_image_path:  {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    years: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    price: {
        type: DataTypes.INTEGER,
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
    engine_type: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    doors: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
});

module.exports = Car;
