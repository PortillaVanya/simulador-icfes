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

Area.associate = (models) => {
    Area.hasMany(models.Pregunta, { foreignKey: "id_area" });
    Area.hasMany(models.Evaluacion, { foreignKey: "id_area" });
    Area.hasMany(models.PlantillaEvaluacion, { foreignKey: "id_area" });
    Area.hasMany(models.Ranking, { foreignKey: "id_area" });
};


module.exports = Area;
