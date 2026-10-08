const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Ranking = sequelize.define("Ranking", {
    id_ranking: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_area: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mejor_puntaje: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    total_intentos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ultima_actuacion: DataTypes.DATE
}, {
    tableName: "ranking",
    timestamps: false
});

module.exports = Ranking;
