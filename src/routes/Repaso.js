const express = require("express");

const RepasoRepository = require("../repositories/RepasoRepository");
const RepasoService = require("../services/RepasoService");
const RepasoController = require("../controllers/RepasoController");

module.exports = () => {
    const router = express.Router();

    const repasoRepository = new RepasoRepository();
    const repasoService = new RepasoService(repasoRepository);
    const repasoController = new RepasoController(repasoService);

    router.post("/", repasoController.agregar);
    router.get("/usuario/:idUsuario", repasoController.obtenerPorUsuario);
    router.delete("/:id", repasoController.eliminar);

    return router;
};
