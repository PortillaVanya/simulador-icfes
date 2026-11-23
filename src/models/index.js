const sequelize = require("../config/sequelize");

// Registro central de modelos. Las relaciones se declaran dentro de cada modelo.
const models = {
    Rol: require("./rol"),
    Usuario: require("./Usuario"),
    Perfil: require("./perfil"),
    Area: require("./Area"),
    InformacionCompartida: require("./InformacionCompartida"),
    Explicacion: require("./Explicacion"),
    Pregunta: require("./Pregunta"),
    Repaso: require("./Repaso"),
    // La plantilla se registra antes del intento porque Evaluacion lleva su clave foránea.
    PlantillaEvaluacion: require("./PlantillaEvaluacion"),
    Evaluacion: require("./Evaluacion"),
    DetalleEvaluacion: require("./DetalleEvaluacion"),
    Ranking: require("./Ranking"),
    Auditoria: require("./Auditoria")
};

// Sequelize debe conocer primero todos los modelos para poder conectar sus relaciones.
for (const modelo of Object.values(models)) {
    if (typeof modelo.associate === "function") {
        modelo.associate(models);
    }
}

module.exports = { sequelize, ...models };
