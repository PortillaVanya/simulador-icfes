const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Pregunta = sequelize.define("Pregunta", {
    id_pregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_area: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_contexto: DataTypes.INTEGER,
    enunciado: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    opcion_a: { type: DataTypes.STRING(255), allowNull: false },
    opcion_b: { type: DataTypes.STRING(255), allowNull: false },
    opcion_c: { type: DataTypes.STRING(255), allowNull: false },
    opcion_d: { type: DataTypes.STRING(255), allowNull: false },
    respuesta_correcta: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    nivel_dificultad: {
        type: DataTypes.ENUM("FACIL", "MEDIA", "DIFICIL"),
        allowNull: false
    },
    id_explicacion: DataTypes.INTEGER,
    url_imagen: DataTypes.STRING(255)
}, {
    tableName: "preguntas",
    timestamps: false
});

module.exports = Pregunta;
