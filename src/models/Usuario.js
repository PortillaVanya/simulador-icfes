const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Usuario = sequelize.define("Usuario", {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "usuarios",
    timestamps: false
});

module.exports = Usuario;
