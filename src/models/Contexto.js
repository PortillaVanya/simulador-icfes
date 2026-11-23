const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Contexto = sequelize.define("Contexto", {
    id_contexto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: DataTypes.STRING(150),
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url_imagen: DataTypes.STRING(255)
}, {
    tableName: "contextos",
    timestamps: false
});

module.exports = Contexto;
