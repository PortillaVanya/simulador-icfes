const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Evaluacion = sequelize.define("Evaluacion", {
    id_evaluacion: {
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
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    puntaje_obtenido: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    total_preguntas: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "evaluacion",
    timestamps: false
});

module.exports = Evaluacion;
