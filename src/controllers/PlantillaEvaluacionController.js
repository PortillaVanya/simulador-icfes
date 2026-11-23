class PlantillaEvaluacionController {
    constructor(service) {
        this.service = service;
    }

    obtenerTodas = async (req, res) => {
        try {
            res.status(200).json(await this.service.obtenerTodas());
        } catch (error) {
            res.status(500).json({ mensaje: "No se pudieron obtener las evaluaciones", error: error.message });
        }
    };

    obtenerPorId = async (req, res) => {
        try {
            const evaluacion = await this.service.obtenerPorId(req.params.id);
            if (!evaluacion) return res.status(404).json({ mensaje: "Evaluación no encontrada" });
            return res.status(200).json(evaluacion);
        } catch (error) {
            return res.status(400).json({ mensaje: error.message });
        }
    };

    crear = async (req, res) => {
        try {
            const evaluacion = await this.service.crear(req.body, req.usuario.id_usuario);
            return res.status(201).json({ mensaje: "Plantilla de evaluación creada", evaluacion });
        } catch (error) {
            return res.status(400).json({ mensaje: error.message });
        }
    };

    actualizar = async (req, res) => {
        try {
            const evaluacion = await this.service.actualizar(req.params.id, req.body);
            if (!evaluacion) return res.status(404).json({ mensaje: "Evaluación no encontrada" });
            return res.status(200).json({ mensaje: "Plantilla de evaluación actualizada", evaluacion });
        } catch (error) {
            return res.status(400).json({ mensaje: error.message });
        }
    };

    eliminar = async (req, res) => {
        try {
            const eliminado = await this.service.eliminar(req.params.id);
            if (!eliminado) return res.status(404).json({ mensaje: "Evaluación no encontrada" });
            return res.status(200).json({ mensaje: "Plantilla de evaluación eliminada" });
        } catch (error) {
            return res.status(400).json({ mensaje: error.message });
        }
    };
}

module.exports = PlantillaEvaluacionController;
