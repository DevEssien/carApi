const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Body = sequelize.define("Body", {
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
    type: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    doors: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    length: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    width: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    seats: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    height: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    wheel_base: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    front_track: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    rear_track: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    ground_clearance: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    cargo_capacity: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    max_cargo_capacity: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    curb_weight: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    gross_weight: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    max_payload: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
});

module.exports = Body;
