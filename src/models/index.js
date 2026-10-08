const sequelize = require("../config/sequelize");

const Rol = require("./Rol");
const Usuario = require("./Usuario");
const Perfil = require("./Perfil");
const Area = require("./Area");
const Contexto = require("./Contexto");
const Explicacion = require("./Explicacion");
const Pregunta = require("./Pregunta");
const Repaso = require("./Repaso");
const Evaluacion = require("./Evaluacion");
const DetalleEvaluacion = require("./DetalleEvaluacion");
const Ranking = require("./Ranking");

// =========================================================
// RELACIONES (equivalen a las FOREIGN KEY de tu schema.sql)
// =========================================================

// rol 1 ──── N usuarios
Rol.hasMany(Usuario, { foreignKey: "id_rol" });
Usuario.belongsTo(Rol, { foreignKey: "id_rol" });

// usuarios 1 ──── 1 perfil
Usuario.hasOne(Perfil, { foreignKey: "id_usuario", onDelete: "CASCADE" });
Perfil.belongsTo(Usuario, { foreignKey: "id_usuario" });

// areas 1 ──── N preguntas
Area.hasMany(Pregunta, { foreignKey: "id_area" });
Pregunta.belongsTo(Area, { foreignKey: "id_area" });

// contextos 1 ──── N preguntas (opcional, SET NULL)
Contexto.hasMany(Pregunta, { foreignKey: "id_contexto", onDelete: "SET NULL" });
Pregunta.belongsTo(Contexto, { foreignKey: "id_contexto" });

// explicaciones 1 ──── N preguntas (opcional, SET NULL)
Explicacion.hasMany(Pregunta, { foreignKey: "id_explicacion", onDelete: "SET NULL" });
Pregunta.belongsTo(Explicacion, { foreignKey: "id_explicacion" });

// usuarios 1 ──── N repaso / preguntas 1 ──── N repaso
Usuario.hasMany(Repaso, { foreignKey: "id_usuario", onDelete: "CASCADE" });
Repaso.belongsTo(Usuario, { foreignKey: "id_usuario" });
Pregunta.hasMany(Repaso, { foreignKey: "id_pregunta", onDelete: "CASCADE" });
Repaso.belongsTo(Pregunta, { foreignKey: "id_pregunta" });

// usuarios 1 ──── N evaluacion / areas 1 ──── N evaluacion
Usuario.hasMany(Evaluacion, { foreignKey: "id_usuario", onDelete: "CASCADE" });
Evaluacion.belongsTo(Usuario, { foreignKey: "id_usuario" });
Area.hasMany(Evaluacion, { foreignKey: "id_area" });
Evaluacion.belongsTo(Area, { foreignKey: "id_area" });

// evaluacion 1 ──── N detalle_evaluacion / preguntas 1 ──── N detalle_evaluacion
Evaluacion.hasMany(DetalleEvaluacion, { foreignKey: "id_evaluacion", onDelete: "CASCADE" });
DetalleEvaluacion.belongsTo(Evaluacion, { foreignKey: "id_evaluacion" });
Pregunta.hasMany(DetalleEvaluacion, { foreignKey: "id_pregunta" });
DetalleEvaluacion.belongsTo(Pregunta, { foreignKey: "id_pregunta" });

// usuarios 1 ──── N ranking / areas 1 ──── N ranking
Usuario.hasMany(Ranking, { foreignKey: "id_usuario", onDelete: "CASCADE" });
Ranking.belongsTo(Usuario, { foreignKey: "id_usuario" });
Area.hasMany(Ranking, { foreignKey: "id_area" });
Ranking.belongsTo(Area, { foreignKey: "id_area" });

module.exports = {
    sequelize,
    Rol,
    Usuario,
    Perfil,
    Area,
    Contexto,
    Explicacion,
    Pregunta,
    Repaso,
    Evaluacion,
    DetalleEvaluacion,
    Ranking
};
