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
    id_plantilla_evaluacion: {
        type: DataTypes.INTEGER,
        allowNull: true
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

Evaluacion.associate = (models) => {
    Evaluacion.belongsTo(models.Usuario, { foreignKey: "id_usuario", onDelete: "CASCADE" });
    Evaluacion.belongsTo(models.Area, { foreignKey: "id_area" });
    Evaluacion.belongsTo(models.PlantillaEvaluacion, {
        foreignKey: "id_plantilla_evaluacion",
        onDelete: "SET NULL"
    });
    Evaluacion.hasMany(models.DetalleEvaluacion, { foreignKey: "id_evaluacion", onDelete: "CASCADE" });
};


module.exports = Evaluacion;
