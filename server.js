require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { sequelize } = require("./src/models"); // carga TODOS los modelos y sus relaciones
const {
    crearBaseDeDatos,
    cargarDatosIniciales,
    crearObjetosSQL
} = require("./src/config/inicializarBD");

const rutasPreguntas = require("./src/routes/preguntas");
const rutasContextos = require("./src/routes/contextos");
const rutasUsuarios = require("./src/routes/usuarios");
const rutasAreas = require("./src/routes/areas");
const rutasEvaluacion = require("./src/routes/evaluacion");
const rutasImagenes = require("./src/routes/imagenes");
const rutasExplicaciones = require("./src/routes/Explicaciones");
const rutasRepaso = require("./src/routes/Repaso");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/preguntas", rutasPreguntas());
app.use("/api/contextos", rutasContextos());
app.use("/api", rutasUsuarios());
app.use("/api/areas", rutasAreas());
app.use("/api/evaluaciones", rutasEvaluacion());
app.use("/api", rutasImagenes());
app.use("/api/explicaciones", rutasExplicaciones());
app.use("/api/repaso", rutasRepaso());

async function iniciar() {
    try {
        await crearBaseDeDatos();                  // CREATE DATABASE si no existe
        await sequelize.authenticate();
        console.log("✅ Conectado a MySQL (vía Sequelize)");

        await sequelize.sync({ alter: true });     // crea las 11 tablas
        console.log("✅ Tablas sincronizadas desde los modelos");

        await cargarDatosIniciales();              // roles admin/estudiante
        await crearObjetosSQL();                   // trigger, vista, función, procedimiento
        console.log("✅ Datos iniciales y objetos SQL listos");

    } catch (error) {
        console.error("❌ Error inicializando la base de datos:", error.message);
    }

    app.listen(3000, () => {
        console.log("🚀 Servidor corriendo en http://localhost:3000");
    });
}

iniciar();