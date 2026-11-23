const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Auditoria = sequelize.define("Auditoria", {
    id_auditoria: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario_actor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "ID del usuario de la API cuando la conexión lo establece"
    },
    usuario_bd: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    accion: {
        type: DataTypes.ENUM("INSERT", "UPDATE", "DELETE"),
        allowNull: false
    },
    tabla_afectada: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    id_registro: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    datos_anteriores: DataTypes.JSON,
    datos_nuevos: DataTypes.JSON
}, {
    tableName: "auditoria",
    timestamps: false
});

module.exports = Auditoria;
