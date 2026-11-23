const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const InformacionCompartida = sequelize.define("InformacionCompartida", {
    id_informacion_compartida: {
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
    tableName: "informacion_compartida",
    timestamps: false
});

InformacionCompartida.associate = (models) => {
    InformacionCompartida.hasMany(models.Pregunta, { foreignKey: "id_informacion_compartida", onDelete: "SET NULL" });
};


module.exports = InformacionCompartida;
