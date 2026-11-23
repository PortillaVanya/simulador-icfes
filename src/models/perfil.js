const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Perfil = sequelize.define("Perfil", {
    id_perfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen: DataTypes.STRING(255),
    avatar: DataTypes.STRING(255)
}, {
    tableName: "perfil",
    timestamps: false
});

module.exports = Perfil;
