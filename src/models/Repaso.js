const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Repaso = sequelize.define("Repaso", {
    id_repaso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pregunta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_agregado: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    prioridad: DataTypes.STRING(50),
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "repaso",
    timestamps: false
});

module.exports = Repaso;
