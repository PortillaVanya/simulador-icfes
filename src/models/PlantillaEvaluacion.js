const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const PlantillaEvaluacion = sequelize.define("PlantillaEvaluacion", {
    id_plantilla_evaluacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    descripcion: DataTypes.TEXT,
    id_area: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad_preguntas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    id_creador: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "plantilla_evaluacion",
    timestamps: false
});

PlantillaEvaluacion.associate = (models) => {
    PlantillaEvaluacion.belongsTo(models.Area, { foreignKey: "id_area" });
    PlantillaEvaluacion.belongsTo(models.Usuario, {
        foreignKey: "id_creador",
        as: "Creador",
        onDelete: "RESTRICT"
    });
    PlantillaEvaluacion.hasMany(models.Evaluacion, {
        foreignKey: "id_plantilla_evaluacion"
    });
};

module.exports = PlantillaEvaluacion;
