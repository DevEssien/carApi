const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Mileage = sequelize.define("Mileage", {
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
    make_model_trim_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fuel_tank_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    combined_mpg: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    epa_city_mpg: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    epa_highway_mpg: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    range_city: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    range_highway: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Mileage;
