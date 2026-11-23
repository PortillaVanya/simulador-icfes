const express = require("express");
const { Evaluacion } = require("../models");
const { autenticar, permitirRoles, propietarioOAdmin } = require("../middlewares/auth");

const EvaluacionRepository = require("../repositories/EvaluacionRepository");
const EvaluacionService = require("../services/EvaluacionService");
const EvaluacionController = require("../controllers/EvaluacionController");
const PlantillaEvaluacionRepository = require("../repositories/PlantillaEvaluacionRepository");
const PlantillaEvaluacionService = require("../services/PlantillaEvaluacionService");
const PlantillaEvaluacionController = require("../controllers/PlantillaEvaluacionController");

module.exports = () => {
    const router = express.Router();

    const evaluacionRepository = new EvaluacionRepository();
    const evaluacionService = new EvaluacionService(evaluacionRepository);
    const evaluacionController = new EvaluacionController(evaluacionService);

    const plantillaRepository = new PlantillaEvaluacionRepository();
    const plantillaService = new PlantillaEvaluacionService(plantillaRepository);
    const plantillaController = new PlantillaEvaluacionController(plantillaService);

    // Plantillas: los usuarios pueden consultarlas; admin/gestor pueden administrarlas.
    router.get("/plantillas", plantillaController.obtenerTodas);
    router.get("/plantillas/:id", plantillaController.obtenerPorId);
    router.post("/plantillas", autenticar, permitirRoles("admin", "gestor"), plantillaController.crear);
    router.put("/plantillas/:id", autenticar, permitirRoles("admin", "gestor"), plantillaController.actualizar);
    router.delete("/plantillas/:id", autenticar, permitirRoles("admin", "gestor"), plantillaController.eliminar);

    // Un estudiante puede iniciar intentos desde una plantilla o con parámetros propios.
    router.post("/plantillas/:id/iniciar", autenticar, permitirRoles("estudiante"), evaluacionController.iniciarDesdePlantilla);
    router.post("/", autenticar, permitirRoles("estudiante"), evaluacionController.iniciar);

    const verificarPropietarioEvaluacion = async (req, res, next) => {
        try {
            const evaluacion = await Evaluacion.findByPk(req.params.id);
            if (!evaluacion) {
                return res.status(404).json({ error: "Evaluación no encontrada" });
            }
            if (req.usuario.rol !== "admin" && Number(evaluacion.id_usuario) !== Number(req.usuario.id_usuario)) {
                return res.status(403).json({ mensaje: "Solo puedes acceder a tus propias evaluaciones." });
            }
            req.evaluacion = evaluacion;
            return next();
        } catch (error) {
            return res.status(500).json({ mensaje: "No se pudo verificar la evaluación." });
        }
    };

    router.get("/usuario/:idUsuario/historial", autenticar, propietarioOAdmin("idUsuario"), evaluacionController.obtenerHistorial);
    router.get("/:id", autenticar, verificarPropietarioEvaluacion, evaluacionController.obtenerPorId);
    router.post("/:id/respuestas", autenticar, verificarPropietarioEvaluacion, evaluacionController.registrarRespuesta);
    router.put("/:id/finalizar", autenticar, verificarPropietarioEvaluacion, evaluacionController.finalizar);

    return router;
};
