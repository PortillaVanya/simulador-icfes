const { Pregunta, Area, Contexto, Explicacion, sequelize } = require("../models");

const INCLUDES_COMPLETOS = [
    { model: Area, attributes: ["nombre_area"] },
    { model: Contexto, attributes: ["titulo", "contenido"] },
    { model: Explicacion, attributes: ["texto_explicacion", "imagen_url"] }
];

class PreguntaRepository {

    async obtenerAleatoriasPorArea(idArea, cantidad) {
        // OJO: a propósito NO incluye respuesta_correcta.
        // Es para que el estudiante reciba el simulacro, no la respuesta.
        return await Pregunta.findAll({
            where: { id_area: idArea },
            attributes: [
                "id_pregunta", "id_area", "id_contexto", "enunciado",
                "opcion_a", "opcion_b", "opcion_c", "opcion_d",
                "nivel_dificultad", "url_imagen"
            ],
            order: sequelize.random(),
            limit: cantidad
        });
    }

    async crear(pregunta) {
        return await Pregunta.create({
            id_area: pregunta.id_area,
            id_contexto: pregunta.id_contexto || null,
            enunciado: pregunta.enunciado,
            opcion_a: pregunta.opcion_a,
            opcion_b: pregunta.opcion_b,
            opcion_c: pregunta.opcion_c,
            opcion_d: pregunta.opcion_d,
            respuesta_correcta: pregunta.respuesta_correcta,
            nivel_dificultad: pregunta.nivel_dificultad,
            id_explicacion: pregunta.id_explicacion || null,
            url_imagen: pregunta.url_imagen || null
        });
    }

    async obtenerTodas() {
        return await Pregunta.findAll({ include: INCLUDES_COMPLETOS });
    }

    async obtenerPorArea(id_area) {
        return await Pregunta.findAll({
            where: { id_area },
            include: INCLUDES_COMPLETOS
        });
    }

    async obtenerPorId(id_pregunta) {
        return await Pregunta.findByPk(id_pregunta, { include: INCLUDES_COMPLETOS });
    }

    async actualizar(id_pregunta, datos) {
        const [filasActualizadas] = await Pregunta.update(datos, {
            where: { id_pregunta }
        });

        if (filasActualizadas === 0) return null;

        return await this.obtenerPorId(id_pregunta);
    }

    async eliminar(id_pregunta) {
        const filasEliminadas = await Pregunta.destroy({ where: { id_pregunta } });
        return filasEliminadas > 0;
    }

}

module.exports = PreguntaRepository;
