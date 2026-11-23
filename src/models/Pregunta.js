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
    id_informacion_compartida: DataTypes.INTEGER,
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
    id_explicacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
    url_imagen: DataTypes.STRING(255)
}, {
    tableName: "preguntas",
    timestamps: false
});

Pregunta.associate = (models) => {
    Pregunta.belongsTo(models.Area, { foreignKey: "id_area" });
    Pregunta.belongsTo(models.InformacionCompartida, { foreignKey: "id_informacion_compartida", onDelete: "SET NULL" });
    Pregunta.belongsTo(models.Explicacion, { foreignKey: "id_explicacion", onDelete: "SET NULL" });
    Pregunta.hasMany(models.Repaso, { foreignKey: "id_pregunta", onDelete: "CASCADE" });
    Pregunta.hasMany(models.DetalleEvaluacion, { foreignKey: "id_pregunta" });
};


module.exports = Pregunta;
