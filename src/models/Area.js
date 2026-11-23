const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Area = sequelize.define("Area", {
    id_area: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_area: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    descripcion: DataTypes.TEXT
}, {
    tableName: "areas",
    timestamps: false
});

module.exports = Area;
