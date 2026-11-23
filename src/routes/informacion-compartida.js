const express = require("express");
const { autenticar, permitirRoles } = require("../middlewares/auth");

const InformacionCompartidaRepository = require("../repositories/InformacionCompartidaRepository");
const InformacionCompartidaService = require("../services/InformacionCompartidaService");
const InformacionCompartidaController = require("../controllers/InformacionCompartidaController");

module.exports = () => {
    const router = express.Router();

    const informacionCompartidaRepository = new InformacionCompartidaRepository();
    const informacionCompartidaService = new InformacionCompartidaService(informacionCompartidaRepository);
    const informacionCompartidaController = new InformacionCompartidaController(informacionCompartidaService);

    router.post("/", autenticar, permitirRoles("admin", "gestor"), informacionCompartidaController.crear.bind(informacionCompartidaController));
    router.get("/", informacionCompartidaController.obtenerTodos.bind(informacionCompartidaController));
    router.get("/:id", informacionCompartidaController.obtenerPorId.bind(informacionCompartidaController));
    router.put("/:id", autenticar, permitirRoles("admin", "gestor"), informacionCompartidaController.actualizar.bind(informacionCompartidaController));
    router.delete("/:id", autenticar, permitirRoles("admin", "gestor"), informacionCompartidaController.eliminar.bind(informacionCompartidaController));

    return router;
};
