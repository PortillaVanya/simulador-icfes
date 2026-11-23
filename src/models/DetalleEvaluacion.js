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
    es_correcta: DataTypes.BOOLEAN
}, {
    tableName: "detalle_evaluacion",
    timestamps: false,
    indexes: [
        { unique: true, fields: ["id_evaluacion", "id_pregunta"] }
    ]
});

DetalleEvaluacion.associate = (models) => {
    DetalleEvaluacion.belongsTo(models.Evaluacion, { foreignKey: "id_evaluacion", onDelete: "CASCADE" });
    DetalleEvaluacion.belongsTo(models.Pregunta, { foreignKey: "id_pregunta" });
};


module.exports = DetalleEvaluacion;
