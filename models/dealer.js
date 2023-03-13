const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Dealer = sequelize.define("Dealer", {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Dealer;
