const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const DetalleEvaluacion = sequelize.define("DetalleEvaluacion", {
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pregunta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_evaluacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tiempo_usado: DataTypes.TIME,
    respuesta_marcada: DataTypes.CHAR(1),
    es_correcta: DataTypes.BOOLEAN,
    reportes: DataTypes.STRING(255),
    historial: DataTypes.STRING(255)
}, {
    tableName: "detalle_evaluacion",
    timestamps: false
});

module.exports = DetalleEvaluacion;
