const { PlantillaEvaluacion, Area, Pregunta } = require("../models");

class PlantillaEvaluacionRepository {
    async obtenerTodas() {
        return PlantillaEvaluacion.findAll({
            include: [{ model: Area, attributes: ["nombre_area"] }],
            order: [["fecha_creacion", "DESC"]]
        });
    }

    async obtenerPorId(id) {
        return PlantillaEvaluacion.findByPk(id, {
            include: [{ model: Area, attributes: ["nombre_area"] }]
        });
    }

    async contarPreguntasPorArea(id_area) {
        return Pregunta.count({ where: { id_area } });
    }

    async crear(datos) {
        const nueva = await PlantillaEvaluacion.create(datos);
        return this.obtenerPorId(nueva.id_plantilla_evaluacion);
    }

    async actualizar(id, datos) {
        const [filas] = await PlantillaEvaluacion.update(datos, {
            where: { id_plantilla_evaluacion: id }
        });
        if (filas === 0) return null;
        return this.obtenerPorId(id);
    }

    async eliminar(id) {
        const filas = await PlantillaEvaluacion.destroy({
            where: { id_plantilla_evaluacion: id }
        });
        return filas > 0;
    }
}

module.exports = PlantillaEvaluacionRepository;
