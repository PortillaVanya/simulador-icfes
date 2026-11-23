const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Explicacion = sequelize.define("Explicacion", {
    id_explicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    texto_explicacion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagen_url: DataTypes.STRING(255)
}, {
    tableName: "explicaciones",
    timestamps: false
});

Explicacion.associate = (models) => {
    Explicacion.hasOne(models.Pregunta, { foreignKey: "id_explicacion", onDelete: "SET NULL" });
};


module.exports = Explicacion;
