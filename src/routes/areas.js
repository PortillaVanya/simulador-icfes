const express = require("express");
const { autenticar, permitirRoles } = require("../middlewares/auth");

const AreaRepository = require("../repositories/AreaRepository");
const AreaService = require("../services/AreaService");
const AreaController = require("../controllers/AreaController");

module.exports = () => {
    const router = express.Router();

    const areaRepository = new AreaRepository();
    const areaService = new AreaService(areaRepository);
    const areaController = new AreaController(areaService);

    router.get("/", areaController.obtenerTodas);
    router.get("/:id/estadisticas", areaController.obtenerEstadisticas);
    router.get("/:id", areaController.obtenerPorId);
    router.post("/", autenticar, permitirRoles("admin", "gestor"), areaController.crear);
    router.put("/:id", autenticar, permitirRoles("admin", "gestor"), areaController.actualizar);
    router.delete("/:id", autenticar, permitirRoles("admin", "gestor"), areaController.eliminar);

    return router;
};
