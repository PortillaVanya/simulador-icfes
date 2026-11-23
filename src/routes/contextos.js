const express = require("express");

const ContextoRepository = require("../repositories/ContextoRepository");
const ContextoService = require("../services/ContextoService");
const ContextoController = require("../controllers/ContextoController");

module.exports = () => {
    const router = express.Router();

    const contextoRepository = new ContextoRepository();
    const contextoService = new ContextoService(contextoRepository);
    const contextoController = new ContextoController(contextoService);

    router.post("/", contextoController.crear.bind(contextoController));
    router.get("/", contextoController.obtenerTodos.bind(contextoController));
    router.get("/:id", contextoController.obtenerPorId.bind(contextoController));
    router.put("/:id", contextoController.actualizar.bind(contextoController));
    router.delete("/:id", contextoController.eliminar.bind(contextoController));

    return router;
};
