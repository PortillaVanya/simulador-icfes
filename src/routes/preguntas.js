const express = require("express");
const { autenticar, permitirRoles } = require("../middlewares/auth");

const PreguntaRepository = require("../repositories/PreguntaRepository");
const PreguntaService = require("../services/PreguntaService");
const PreguntaController = require("../controllers/PreguntaController");

module.exports = () => {
    const router = express.Router();

    const preguntaRepository = new PreguntaRepository();
    const preguntaService = new PreguntaService(preguntaRepository);
    const preguntaController = new PreguntaController(preguntaService);

    router.get("/simulacro/area/:idArea", preguntaController.obtenerSimulacro.bind(preguntaController));
    router.get("/area/:idArea", preguntaController.obtenerPorArea.bind(preguntaController));
    router.post("/", autenticar, permitirRoles("admin", "gestor"), preguntaController.crear.bind(preguntaController));
    router.get("/", preguntaController.obtenerTodos.bind(preguntaController));
    router.get("/:id", preguntaController.obtenerPorId.bind(preguntaController));
    router.put("/:id", autenticar, permitirRoles("admin", "gestor"), preguntaController.actualizar.bind(preguntaController));
    router.delete("/:id", autenticar, permitirRoles("admin", "gestor"), preguntaController.eliminar.bind(preguntaController));

    return router;
};
