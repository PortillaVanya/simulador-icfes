const { Evaluacion, DetalleEvaluacion, Pregunta, Area, PlantillaEvaluacion, sequelize } = require("../models");

class EvaluacionRepository {

    async crear(evaluacion) {
        const nueva = await Evaluacion.create({
            id_usuario: evaluacion.id_usuario,
            id_area: evaluacion.id_area,
            id_plantilla_evaluacion: evaluacion.id_plantilla_evaluacion || null,
            total_preguntas: evaluacion.total_preguntas
        });

        return await this.obtenerPorId(nueva.id_evaluacion);
    }

    async obtenerPorId(id_evaluacion) {
        return await Evaluacion.findByPk(id_evaluacion);
    }

    async obtenerPlantillaActiva(id_plantilla_evaluacion) {
        return await PlantillaEvaluacion.findOne({
            where: { id_plantilla_evaluacion, activa: true }
        });
    }

    async obtenerHistorialPorUsuario(id_usuario) {
        return await Evaluacion.findAll({
            where: { id_usuario },
            include: [{ model: Area, attributes: ["nombre_area"] }],
            order: [["fecha", "DESC"]]
        });
    }

    async actualizarPuntaje(id_evaluacion, puntaje_obtenido) {
        const [filasActualizadas] = await Evaluacion.update(
            { puntaje_obtenido },
            { where: { id_evaluacion } }
        );

        if (filasActualizadas === 0) return null;

        return await this.obtenerPorId(id_evaluacion);
    }

    // ---- detalle_evaluacion ----

    async registrarRespuesta(detalle) {
        return await DetalleEvaluacion.create({
            id_evaluacion: detalle.id_evaluacion,
            id_pregunta: detalle.id_pregunta,
            respuesta_marcada: detalle.respuesta_marcada,
            es_correcta: detalle.es_correcta,
            tiempo_usado: detalle.tiempo_usado || null
        });
    }

    async obtenerDetallePorEvaluacion(id_evaluacion) {
        return await DetalleEvaluacion.findAll({
            where: { id_evaluacion },
            include: [{
                model: Pregunta,
                attributes: ["enunciado", "respuesta_correcta"]
            }]
        });
    }

    async contarRespuestasRegistradas(id_evaluacion) {
        return await DetalleEvaluacion.count({ where: { id_evaluacion } });
    }

    async contarRespuestasCorrectas(id_evaluacion) {
        return await DetalleEvaluacion.count({
            where: { id_evaluacion, es_correcta: 1 }
        });
    }

    async yaRespondioPregunta(id_evaluacion, id_pregunta) {
        const existente = await DetalleEvaluacion.findOne({
            where: { id_evaluacion, id_pregunta }
        });

        return existente !== null;
    }

    async obtenerPreguntaPorArea(id_pregunta, id_area) {
        return await Pregunta.findOne({
            where: { id_pregunta, id_area },
            attributes: ["id_pregunta", "respuesta_correcta"]
        });
    }

    async obtenerRespuestaCorrecta(id_pregunta) {
        const pregunta = await Pregunta.findByPk(id_pregunta, {
            attributes: ["respuesta_correcta"]
        });

        return pregunta ? pregunta.respuesta_correcta : null;
    }

}

module.exports = EvaluacionRepository;
