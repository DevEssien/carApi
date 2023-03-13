const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Engine = sequelize.define("Engine", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    make_model_trim_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    engine_type: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    fuel_type: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    cylinders: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    size: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    horsepower_hp: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    horsepower_rpm: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    torque_ft_lbs: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    torque_rpm: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    valves: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    valve_timing: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    cam_type: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    drive_type: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    transmission: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
});

module.exports = Engine;
