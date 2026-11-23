const express = require("express");
const { autenticar, permitirRoles } = require("../middlewares/auth");

const ExplicacionRepository = require("../repositories/ExplicacionRepository");
const ExplicacionService = require("../services/ExplicacionService");
const ExplicacionController = require("../controllers/ExplicacionController");

module.exports = () => {
    const router = express.Router();

    const explicacionRepository = new ExplicacionRepository();
    const explicacionService = new ExplicacionService(explicacionRepository);
    const explicacionController = new ExplicacionController(explicacionService);

    router.post("/", autenticar, permitirRoles("admin", "gestor"), explicacionController.crear);
    router.get("/:id", explicacionController.obtenerPorId);
    router.put("/:id", autenticar, permitirRoles("admin", "gestor"), explicacionController.actualizar);

    return router;
};
