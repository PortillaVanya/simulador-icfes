const express = require("express");
const { autenticar, permitirRoles, propietarioOAdmin } = require("../middlewares/auth");

const RepasoRepository = require("../repositories/RepasoRepository");
const RepasoService = require("../services/RepasoService");
const RepasoController = require("../controllers/RepasoController");

module.exports = () => {
    const router = express.Router();

    const repasoRepository = new RepasoRepository();
    const repasoService = new RepasoService(repasoRepository);
    const repasoController = new RepasoController(repasoService);

    router.post("/", autenticar, permitirRoles("estudiante", "admin"), repasoController.agregar);
    router.get("/usuario/:idUsuario", autenticar, propietarioOAdmin("idUsuario"), repasoController.obtenerPorUsuario);
    router.delete("/:id", autenticar, permitirRoles("estudiante", "admin"), repasoController.eliminar);

    return router;
};
